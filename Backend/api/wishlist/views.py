from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from api.renderer import UserRenderer
from .models import UserWishList
from .serializers import UserWishlistSerializer, WishlistGetSerializer
from django.db.models import F

class UserWishlistView(APIView):

    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def get(self, request):
        user = request.user
        wishlist_item = UserWishList.objects.filter(user = user)
        if wishlist_item.exists():
            serializer = WishlistGetSerializer(wishlist_item, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({"message": "Wishlist is empty."}, status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        data = request.data
        user = request.user
        # Check if the product id exists in database
        try:
            product_id = data['product']
        except KeyError:
            return Response({'error': 'No product provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the same product with the same user already exists in the cart
        existing_wishlist_item = UserWishList.objects.filter(user=user, product=product_id).first()

        if existing_wishlist_item is not None:
            
            return Response({'msg': 'Product already available in your wishlist.'}, status=status.HTTP_200_OK)
        else:
            # If the product does not exist, create a new cart item
            serializer = UserWishlistSerializer(data={'user': user.uid, 'product': product_id})
            
            if serializer.is_valid():
                serializer.save()
                return Response({'msg': 'Product added to the your wishlist.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



    def delete(self, request):
        item = request.data['data']
        # Remove an item from the cart
        wishlist_item = UserWishList.objects.filter(uid = item)
        if wishlist_item.exists():
            wishlist_item.delete()
            return Response({"msg":"Items removed from the wishlist."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"msg":"Items not found."}, status=status.HTTP_404_NOT_FOUND)
