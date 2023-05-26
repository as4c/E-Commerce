from django.db import models
from api.user.models import CustomUser
from api.product.models import Product
# Create your models here.


class Order(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    product_names = models.CharField(max_length=500)
    total_products = models.CharField(max_length=500,default= 0)  # type: ignore
    transaction_id = models.CharField(max_length=500,default= 0)  # type: ignore
    total_amount = models.CharField(max_length=500,default= 0)  # type: ignore
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now =True)


    