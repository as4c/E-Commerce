from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.conf import settings
from api.renderer import UserRenderer
from .serializers import PaymentByUserSerializer
from .models import PaymentByUser
from .razorpay import RazorpayClient
import razorpay
import json
from api.order.models import Order
PUBLIC_KEY = settings.PUBLIC_KEY
SECRET_KEY = settings.SECRET_KEY

razor_client = RazorpayClient()
class ProcessOrderPaymentView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes  = [UserRenderer]

    def post(self, request):
        data = request.data
        # print(data)
        order = []
        try:
            order = Order.objects.get(uid=data['order'])
        except Order.DoesNotExist:
            response = {
                "status_code": status.HTTP_404_NOT_FOUND,
                "message": f"Order with ID {data['order']} not found."
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        # print(order)
        amount = order.total_effective_amount
        print(amount)
        serializer = PaymentByUserSerializer(data={
            'order': order.uid,  
            'amount_paid': amount,
            'payment_mode': order.payment_mode,
            'payment_status': 'P',
            'transaction_id': "",
            'razorpay_signature': "",
            'razorpay_order_id': "",
            'razorpay_payment_id': ""
        })

        if serializer.is_valid():
            payment_res = razor_client.Initiate_payment(amount)
            # print(payment_res)
            
            serializer.validated_data['transaction_id'] = payment_res['id']
            serializer.validated_data['razorpay_order_id'] = payment_res['id']
            serializer.save()
            response = {
                "status_code": status.HTTP_201_CREATED,
                "message": "order created",
                "data": serializer.data
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        


class CompletePaymentView(APIView):

    def post(self, request):

        serializer = PaymentByUserSerializer(data=request.data)

        if serializer.is_valid():
            razor_client.verify_payment(
                razorpay_payment_id = serializer.validated_data.get("payment_id"),
                razorpay_order_id = serializer.validated_data.get("order_id"),
                razorpay_signature = serializer.validated_data.get("signature")
            )
            serializer.save()
            response = {
                "status_code": status.HTTP_201_CREATED,
                "message": "transaction created"
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

