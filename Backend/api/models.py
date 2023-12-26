from django.db import models
from uuid import uuid4
# Create your models here.

class BaseModel(models.Model):
    
    uid = models.UUIDField(default = uuid4, editable = False, primary_key = True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True