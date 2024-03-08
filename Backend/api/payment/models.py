from django.db import models
from api.models import BaseModel
from api.order.models import Order


class PaymentByUser(BaseModel):

    order                   =   models.ForeignKey(Order, on_delete = models.SET_NULL, null = True)
    amount_paid             =   models.DecimalField(max_digits = 10, decimal_places = 2)
    transaction_id          =   models.CharField(max_length = 100, null = True, blank = True)
    razorpay_signature      =   models.CharField(max_length = 255, null = True, blank = True)
    razorpay_order_id       =   models.CharField(max_length = 100,  null = True, blank = True)
    razorpay_payment_id     =   models.CharField(max_length = 100,  null = True, blank = True)

    def __str__(self) -> str:
        return f"{self.amount_paid} paid by {self.order.customer} for the order {self.order.uid}"
   
class PaymentOfBuyFromCart(BaseModel):

    orders                  =   models.ManyToManyField(Order)
    amount_paid             =   models.DecimalField(max_digits = 10, decimal_places = 2)
    transaction_id          =   models.CharField(max_length = 100, null = True, blank = True)
    razorpay_signature      =   models.CharField(max_length = 255, null = True, blank = True)
    razorpay_order_id       =   models.CharField(max_length = 100,  null = True, blank = True)
    razorpay_payment_id     =   models.CharField(max_length = 100,  null = True, blank = True)
