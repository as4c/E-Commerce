from django.db import models
from api.models import BaseModel
from api.order.models import Order


class PaymentByUser(BaseModel):
 

    PAYMENT_STATUS =   [
        ('S', 'Success'),
        ('F', 'Failed'),
        ('P', 'Pending')    
    ]

    PAYMENT_MODE = [
        ('COD', 'Cash On Delivery'),
        ('ONL', 'Online'),

    ]


    order                   =   models.ForeignKey(Order, on_delete = models.SET_NULL, null = True)
    amount_paid             =   models.DecimalField(max_digits=10, decimal_places=2)
    payment_mode            =   models.CharField(max_length = 3, choices = PAYMENT_MODE)
    payment_status          =   models.CharField(max_length = 1, choices = PAYMENT_STATUS)
    transaction_id          =   models.CharField(max_length = 100, null = True, blank = True)
    razorpay_signature      =   models.CharField(max_length=255, null=True, blank=True)
    razorpay_order_id       =   models.CharField(max_length = 100,  null = True, blank = True)
    razorpay_payment_id     =   models.CharField(max_length = 100,  null = True, blank = True)

    def __str__(self) -> str:
        return f"{self.order.total_effective_amount} paid by {self.order.customer} for the order {self.order.uid}"
   