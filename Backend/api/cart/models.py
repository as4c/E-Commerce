from django.db import models
from api.models import BaseModel
from api.accounts.models import CustomUser
from api.product.models import Product
# Create your models here.

class UserCart(BaseModel):

    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    quantity = models.PositiveIntegerField(default = 0)

    def __str__(self):
        return f"{self.user.username} added {self.quantity} of {self.product.product_name}"
    
    class Meta:
        ordering = ['-created_at']


