from django.db import models
from api.models import BaseModel
from api.accounts.models import CustomUser
from api.product.models import Product
from api.accounts.models import Address

class Order(BaseModel):

    ORDER_STATUS = [
        ('A', 'Accepted'),
        ('P', 'Pending'),
        ('F', 'Failed'),
        ('C', 'Cancel'),
        ('R', 'Return'),
        ('D', 'Delivered')
    ]

    PAYMENT_MODE = [
        ('COD', 'Cash On Delivery'),
        ('ONL', 'Online'),

    ]

    PAYMENT_STATUS =   [
        ('S', 'Success'),
        ('F', 'Failed'),
        ('P', 'Pending')    
    ]

    customer                  =   models.ForeignKey(CustomUser, on_delete = models.SET_NULL, null=True, blank=True)
    customer_address          =   models.ForeignKey(Address, on_delete = models.PROTECT , null=True, blank=True)
    products                  =   models.ManyToManyField(Product, blank = True, related_name = 'ordered_items')
    total_items               =   models.IntegerField(default = 1) 
    total_actual_amount       =   models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00) 
    total_effective_amount    =   models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00) 
    total_discount_amount     =   models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00) 
    total_discount_percentage =   models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00)
    order_status              =   models.CharField(max_length = 1, choices = ORDER_STATUS, default = 'P')
    payment_mode              =   models.CharField(max_length = 3, choices = PAYMENT_MODE)
    payment_status            =   models.CharField(max_length = 1, choices = PAYMENT_STATUS, default='P')
    transaction_id            =   models.CharField(max_length = 100, default = '003jkdkkdkdk')


    def __str__(self) -> str:
        return f"{self.customer.username} ordered at {self.created_at}"
    
    class Meta:
        ordering = ['-updated_at']

    