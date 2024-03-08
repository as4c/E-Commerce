from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import ProductStockNotification
from .serializers import ProductStockNotificationSerializer
from api.product.models import Product
from api.accounts.models import CustomUser

class ProductInStockView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        payload = request.data   # product_id
        user = request.user
        
        product = get_object_or_404(Product, uid=payload.get('product_id'))

        try:
            existing_product = ProductStockNotification.objects.get(product__uid=product.uid)
            existing_product.users.add(user)
            return Response({'message': 'Product added to notify me list.'}, status=status.HTTP_200_OK)
        except ProductStockNotification.DoesNotExist:
            users = []
            users.append(user.uid)
            data = {
                'product': product.uid,
                'users' : users
            }
            notify_serializer = ProductStockNotificationSerializer(data=data)
            if notify_serializer.is_valid():
                notify_serializer.save()
                return Response({'message': 'Product added to notify me list.'}, status=status.HTTP_201_CREATED)
            else:
                return Response(notify_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error at product in stock...", str(e))
            return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)

def NotifyUserProductInStock(product_id):
    try:
        lists = ProductStockNotification.objects.get(product__uid=product_id)
        users = lists.users.all()
        send_notification(users)
        lists.delete()
    except ProductStockNotification.DoesNotExist:
        print('notify me list not found')

def send_notification(users):
    for user in users:
        print(f'notification sends to {user.username} product in stocks.')
