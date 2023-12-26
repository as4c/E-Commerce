from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from api.renderer import UserRenderer
from .models import UserCart
from .serializers import UserCartSerializer
from django.db.models import F

class UserCartView(APIView):

    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def get(self, request, *args, **kwargs):
        user = request.user
        cart_item = UserCart.objects.filter(user = user)
        if cart_item.exists():
            serializer = UserCartSerializer(cart_item, many=True)
            return Response(serializer.data)
        return Response({"message": "Cart is empty"}, status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        # Check if the product id exists in database
        try:
            product_id = data['product']
        except KeyError:
            return Response({'error': 'No product provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the same product with the same user already exists in the cart
        existing_cart_item = UserCart.objects.filter(user=user, product=product_id).first()

        if existing_cart_item:
            # If the product already exists, increment the quantity
            existing_cart_item.quantity += 1
            existing_cart_item.save()
            serializer = UserCartSerializer(existing_cart_item)
            return Response({'msg': 'Product quantity incremented in the cart', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            # If the product does not exist, create a new cart item
            serializer = UserCartSerializer(data={'user': user.uid, 'product': product_id, 'quantity': 1})
            
            if serializer.is_valid():
                serializer.save()
                return Response({'msg': 'Product added to the cart', 'data': serializer.data}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def remove_cart_items(request):
    data = request.data
    user = request.user
    # Check if the product id exists in the database
    try:
        product_id = data['product']
    except KeyError:
        return Response({'error': 'Product ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the same product with the same user already exists in the cart
    existing_cart_item = UserCart.objects.filter(user=user, product=product_id).first()

    if existing_cart_item:
        # If the product already exists, decrement the quantity
        if existing_cart_item.quantity > 1:
            existing_cart_item.quantity -= 1
            existing_cart_item.save()
            serializer = UserCartSerializer(existing_cart_item)
            return Response({'msg': 'Product quantity decremented in the cart', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            existing_cart_item.delete()
            return Response({'msg': 'Product removed from the cart.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Product not found in the cart.'}, status=status.HTTP_404_NOT_FOUND)
