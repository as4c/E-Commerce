from django.db import models
from api.models import BaseModel
from api.accounts.models import CustomUser
from .utils import generate_boy_id
# Create your models here.

class DeliveryBoy(BaseModel):
    user = models.OneToOneField(CustomUser, on_delete = models.SET_NULL, null = True, blank = True)
    delivery_boy_id = models.CharField(max_length = 10, blank = True)
    alternate_phone = models.CharField(max_length  = 13)
    dl_number = models.CharField(max_length = 16)
    aadhar_number = models.CharField(max_length = 16)
    bank_account = models.CharField(max_length = 15)
    bank_ifsc_code = models.CharField(max_length = 15)
    area = models.CharField(max_length = 255)
    daily_delivered = models.IntegerField(default = 0)
    total_delivered = models.IntegerField(default = 0)
    banned = models.BooleanField(default = False)
    total_payment = models.IntegerField(default = 0)
    def save(self, *args, **kwargs):
            if not self.delivery_boy_id:
                self.delivery_boy_id = generate_boy_id()
            super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username
        