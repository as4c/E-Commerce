from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.conf import settings
from api.renderer import UserRenderer
from .serializers import PaymentByUserSerializer, PaymentOfBuyFromCartSerializer
from .models import PaymentByUser
from .razorpay import RazorpayClient
from api.order.models import Order
from django.utils import timezone
from api.cart.models import UserCart
from .utils import delete_cart_items, send_orders_notification, send_orders_notification_from_cart



PUBLIC_KEY = settings.PUBLIC_KEY
SECRET_KEY = settings.SECRET_KEY
FRONTEND_URL = settings.BASE_FRONTEND_URL

razor_client = RazorpayClient()
class ProcessOrderPaymentView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes  = [UserRenderer]

    def post(self, request):
        data = request.data   
        serializer = PaymentByUserSerializer(data={
            'order': data['order'],  
            'amount_paid': data['amount'],
            'transaction_id': "",
            'razorpay_signature': "",
            'razorpay_order_id': "",
            'razorpay_payment_id': "",
            'created_at': timezone.now(),
            'updated_at': timezone.now()
        })

        if serializer.is_valid():
            payment_res = razor_client.Initiate_payment(serializer.validated_data.get('amount_paid'))

            serializer.validated_data['transaction_id'] = payment_res['id']
            serializer.validated_data['razorpay_order_id'] = payment_res['id']
            serializer.save()
            response = {
                "success" : True,
                "status_code": status.HTTP_201_CREATED,
                "message": "order created",
                "data": serializer.data
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                "success" : False,
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        


class CompletePaymentView(APIView):

    def post(self, request):
        data = request.data
        user = request.user
        serializer = PaymentByUserSerializer(data={
            'order': data['order'],  
            'amount_paid': data['amount'],
            'transaction_id': data['paymentID'],
            'razorpay_signature': data['signature'],
            'razorpay_order_id': data['orderID'],
            'razorpay_payment_id': data['paymentID'],
            'created_at': timezone.now(),
            'updated_at': timezone.now()
        })
       
        order_ob = Order.objects.get(uid = data['order'])
       
        if serializer.is_valid():
            payment_verify =  razor_client.verify_payment(
                razorpay_payment_id = serializer.validated_data.get("razorpay_payment_id"),
                razorpay_order_id = serializer.validated_data.get("razorpay_order_id"),
                razorpay_signature = serializer.validated_data.get("razorpay_signature")
            )
            if payment_verify == True:
                order_ob.payment_status = 'S'
                order_ob.transaction_id = serializer.validated_data.get("razorpay_payment_id")
                order_ob.save()
                serializer.save()
                response = {
                    "success" : True, 
                    "status_code": status.HTTP_201_CREATED,
                    "message": "transaction created",
                    "data" : serializer.data
                }
                delete_cart_items(user)
                send_orders_notification(order_ob, True, f"{FRONTEND_URL}/user/orders/{order_ob.uid}/")
                return Response(response, status=status.HTTP_201_CREATED)
            else :
                response = {
                    "success" : False,
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "message": "bad request",
                    "error": serializer.errors
                }
                order_ob.payment_status = 'F'
                order_ob.transaction_id = serializer.validated_data.get("razorpay_payment_id")
                order_ob.save()
                send_orders_notification(order_ob, False, f"{FRONTEND_URL}/user/orders/{order.uid}/")
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            response = {
                "success" : False,
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": serializer.errors
            }
            order_ob.payment_status = 'F'
            order_ob.save()
            send_orders_notification(order_ob, False, f"{FRONTEND_URL}/user/orders/")
            return Response(response, status=status.HTTP_400_BAD_REQUEST)




class ProcessOrderPaymentForCartView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes  = [UserRenderer]

    def post(self, request):
        data = request.data

        serializer = PaymentOfBuyFromCartSerializer(data={
            'orders': data['orders'],  
            'amount_paid': data['amount'],
            'transaction_id': "",
            'razorpay_signature': "",
            'razorpay_order_id': "",
            'razorpay_payment_id': "",
            'created_at': timezone.now(),
            'updated_at': timezone.now()
        })

        if serializer.is_valid():
            payment_res = razor_client.Initiate_payment(serializer.validated_data.get('amount_paid'))

            serializer.validated_data['transaction_id'] = payment_res['id']
            serializer.validated_data['razorpay_order_id'] = payment_res['id']
            serializer.save()
            response = {
                "success" : True,
                "status_code": status.HTTP_201_CREATED,
                "message": "order created",
                "data": serializer.data
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                "success" : False,
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        


class CompletePaymentForCartView(APIView):

    def post(self, request):
        data = request.data
        user = request.user 
        serializer = PaymentByUserSerializer(data={
            'orders': data['orders'],  
            'amount_paid': data['amount'],
            'transaction_id': data['paymentID'],
            'razorpay_signature': data['signature'],
            'razorpay_order_id': data['orderID'],
            'razorpay_payment_id': data['paymentID'],
            'created_at': timezone.now(),
            'updated_at': timezone.now()
        })
       
        if serializer.is_valid():
            payment_verify =  razor_client.verify_payment(
                razorpay_payment_id = serializer.validated_data.get("razorpay_payment_id"),
                razorpay_order_id = serializer.validated_data.get("razorpay_order_id"),
                razorpay_signature = serializer.validated_data.get("razorpay_signature")
            )
            if payment_verify == True:
                for order_id in data['orders']:
                    order_ob = Order.objects.get(uid = order_id)
                    order_ob.payment_status = 'S'
                    order_ob.transaction_id = serializer.validated_data.get("razorpay_payment_id")
                    order_ob.save()
                serializer.save()
                response = {
                    "success" : True, 
                    "status_code": status.HTTP_201_CREATED,
                    "message": "transaction created",
                    "data" : serializer.data
                }
                delete_cart_items(user)
                send_orders_notification_from_cart(user, True, f"{FRONTEND_URL}/user/orders/")
                return Response(response, status=status.HTTP_201_CREATED)
            else :
                for order_id in data["orders"]:
                    order_ob = Order.objects.get(uid = order_id)
                    order_ob.payment_status = 'F'
                    order_ob.save()
                response = {
                    "success" : False,
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "message": "bad request",
                    "error": serializer.errors
                }
                send_orders_notification_from_cart(user, False, f"{FRONTEND_URL}/user/orders/")
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            response = {
                "success" : False,
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": serializer.errors
            }
            for order_id in data["orders"]:
                order_ob = Order.objects.get(uid = order_id)
                order_ob.payment_status = 'F'
                order_ob.save()
            send_orders_notification_from_cart(user, False, f"{FRONTEND_URL}/user/orders/")
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

