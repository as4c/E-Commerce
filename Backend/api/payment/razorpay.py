from .import client
from rest_framework.serializers import ValidationError
from rest_framework import status


class RazorpayClient:

    def Initiate_payment(self, amount):
        data = {
            "amount": int(amount) * 100,
            "currency": "INR",
            "payment_capture": "1"
        }
        try:
            order = client.order.create(data=data)
            return order
        except Exception as e:
            raise ValidationError(
                {
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "message": e
                }
            )
    
    def verify_payment(self, razorpay_order_id, razorpay_payment_id, razorpay_signature):
        try:
            verify_signature = client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })
            return verify_signature
        except Exception as e:
            raise ValidationError(
                {
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "message": e
                }
            )
            