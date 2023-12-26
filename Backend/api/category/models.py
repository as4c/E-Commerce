from django.db import models
from api.models import BaseModel
# Create your models here.
class Category(BaseModel):
    name = models.CharField(max_length=50)
    description=models.CharField(max_length=250)

    def __str__(self):
        return self.name
