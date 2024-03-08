from django.db import models
from api.models import BaseModel
from api.accounts.models import CustomUser
from api.product.models import Product
from api.accounts.models import Address
from api.deliveryboy.models import DeliveryBoy



class Order(BaseModel):

    ORDER_STATUS = [
        ('A', 'Placed'),
        ('B', 'Confirmed'),
        ('P', 'Packed'),
        ('O', 'On the way'),
        ('F', 'Failed'),
        ('C', 'Cancel'),
        ('R', 'Return'),
        ('D', 'Delivered'),
    ]

    PAYMENT_MODE = [
        ('COD', 'Cash On Delivery'),
        ('ONL', 'Online'),

    ]

    PAYMENT_STATUS =   [
        ('S', 'Success'),
        ('F', 'Failed'),
        ('P', 'Pending'),
        ('R', 'Refunded') 
    ]

    TIME_CHOICES = [
        ('15MN', '15 Minute'),
        ('30MN', '30 Minute'),
        ('45MN', '45 Minute'),
        ('1H', '1 Hours'),
        ('3H', '3 Hours'),
        ('6H', '6 Hours'),
        ('9H', '9 Hours'),
        ('12H', '12 Hours'),
        ('1d', '1 Day'),
        ('7d', '7 Day'),
        ('1M', '1 Month'),
    ]

    ORDER_TYPE = [
        ('I', 'Individuals'),
        ('G', 'Groups'),
        ('O', 'Others')
    ]
    
    customer                  =   models.ForeignKey(CustomUser, on_delete = models.SET_NULL, null=True, blank=True)
    customer_address          =   models.ForeignKey(Address, on_delete = models.PROTECT , null=True, blank=True)
    product                   =   models.ForeignKey(Product, on_delete = models.SET_NULL, null = True, related_name = 'ordered_items')
    delivery_boy              =   models.ForeignKey(DeliveryBoy, on_delete = models.SET_NULL, null = True, blank = True)
    quantity                  =   models.IntegerField(default = 1) 
    total_actual_amount       =   models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00)  # ignore
    total_effective_amount    =   models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00)  
    total_discount_amount     =   models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00) 
    total_discount_percentage =   models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00)
    order_status              =   models.CharField(max_length = 1, choices = ORDER_STATUS, default = 'P')
    payment_mode              =   models.CharField(max_length = 3, choices = PAYMENT_MODE)
    payment_status            =   models.CharField(max_length = 1, choices = PAYMENT_STATUS, default='P')
    transaction_id            =   models.CharField(max_length = 100, default = '003jkdkkdkdk')
    expected_delivery_time    =   models.CharField(max_length = 4, choices = TIME_CHOICES, default = '1H')
    order_type                =   models.CharField(max_length = 1, choices = ORDER_TYPE, default = 'O')

    def __str__(self):
        return f"{self.customer.username} ordered at {self.created_at}" 
    
    class Meta:
        ordering = ['-created_at']

    
