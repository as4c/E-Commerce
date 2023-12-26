from django.db import models
from api.models import BaseModel
from api.accounts.models import CustomUser
from api.product.models import Product
# Create your models here.

class UserWishList(BaseModel):

    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    def __str__(self):
        return f"{self.product.product_name} added to wishlist"
    
    class Meta:
        ordering = ['-updated_at']


