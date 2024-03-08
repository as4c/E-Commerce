from django.db import models
from api.models import BaseModel
from api.product.models import Product
from api.accounts.models import CustomUser
# Create your models here.

class ProductStockNotification(BaseModel):
    product = models.OneToOneField(Product, on_delete = models.CASCADE)
    users = models.ManyToManyField(CustomUser)

