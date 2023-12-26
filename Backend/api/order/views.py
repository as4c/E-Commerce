
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.renderer import UserRenderer
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from . models import Order
from api.accounts.models import Address
from api.product.models import Product
from decimal import Decimal



UserModel = get_user_model()

class OrderGetAndCreateView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def get(self, request, *args, **kwargs):
        user = request.user
        order_obj = Order.objects.filter(customer = user)
        if order_obj is not None:
            serializer = OrderSerializer(order_obj)
            return Response({'msg':'Order data recieved!' ,'data':serializer.data}, status = status.HTTP_200_OK)
        else:
            return Response({"msg":"You haven't purchased any items yet. Purchase Now!"}, status = status.HTTP_404_NOT_FOUND)


    def post(self, request, format=None):
        data = request.data
        customer = request.user
        serializer = OrderSerializer(data=data)

        if serializer.is_valid():
            order = serializer.save(customer=customer)

            # Retrieve product IDs from the request data
            product_ids = data.get('products', [])

            # Initialize variables for calculations
            total_items = len(product_ids)
            total_actual_amount = Decimal(0.00)
            total_effective_amount = Decimal(0.00)
            products = []
            # Retrieve products and calculate amounts
            for product_id in product_ids:
                try:
                    product = Product.objects.get(uid = product_id)
                    products.append(product)
                    total_actual_amount += product.actual_price
                    total_effective_amount += product.effective_price
                except Product.DoesNotExist:
                    return Response({'message': f'Product with ID {product_id} not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Calculate other amounts
            total_discount_amount = total_actual_amount - total_effective_amount
            total_discount_percentage = (total_discount_amount / total_actual_amount) * 100 if total_actual_amount != 0 else 0.00

            # Set the calculated values to the order instance
            order.total_items = total_items
            order.total_actual_amount = total_actual_amount
            order.total_effective_amount = total_effective_amount
            order.total_discount_amount = total_discount_amount
            order.total_discount_percentage = total_discount_percentage
            # order.save()
            if order.payment_mode == 'ONL':
                order.order_status = 'A'
                order.transaction_id = ""
                order.save()
                serialized_order = {
                    'uid': str(order.uid),
                    'customer': str(order.customer.uid),
                    'customer_address': str(order.customer_address.uid) if order.customer_address else None,
                    'total_items': order.total_items,
                    'total_actual_amount': str(order.total_actual_amount),
                    'total_effective_amount': str(order.total_effective_amount),
                    'total_discount_amount': str(order.total_discount_amount),
                    'total_discount_percentage': int(order.total_discount_percentage),
                    'order_status': order.order_status,
                    'payment_mode': order.payment_mode,
                    'payment_status': order.payment_status,
                    'transaction_id': order.transaction_id,
                    'products': str(products)
                }
                # serializer = OrderSerializer(serialized_order)
                return Response({'message': 'Order created successfully! Please make the payment.', 'data':serialized_order}, status=status.HTTP_201_CREATED)
            else:
                order.payment_mode = 'COD'
                order.order_status = 'A'
                order.transaction_id = ""
                order.save()
                serialized_order = {
                    'uid': str(order.uid),
                    'customer': str(order.customer.uid),
                    'customer_address': str(order.customer_address.uid) if order.customer_address else None,
                    'total_items': order.total_items,
                    'total_actual_amount': str(order.total_actual_amount),
                    'total_effective_amount': str(order.total_effective_amount),
                    'total_discount_amount': str(order.total_discount_amount),
                    'total_discount_percentage': int(order.total_discount_percentage),
                    'order_status': order.order_status,
                    'payment_mode': order.payment_mode,
                    'payment_status': order.payment_status,
                    'transaction_id': order.transaction_id,
                    'products': str(products)
                }
                # serializer = OrderSerializer(order)
                return Response({'message': 'Order created successfully!', 'data' : serialized_order}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


