from django.db import models
from api.models import BaseModel
from api.accounts.models import CustomUser
from api.product.models import Product
# Create your models here.

class Rating(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    star = models.IntegerField(default = 0)
    description = models.CharField(max_length = 255, null = True, blank = True)

    def __str__(self) -> str:
        return f"{self.star} rated {self.product.product_name}"
    
    

class Review(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    user_product_file = models.FileField(upload_to='review_files/', null=True, blank=True)
    description = models.CharField(max_length = 255, null = True, blank = True)

    def __str__(self) -> str:
        return f"{self.user.username} gives review on {self.product.product_name}"