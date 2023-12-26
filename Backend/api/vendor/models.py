from django.db import models
from api.models import BaseModel
from api.accounts.models import CustomUser
from .utils import generate_shop_id


class VendorUser(BaseModel):
    owner = models.OneToOneField(CustomUser, on_delete = models.SET_NULL, null = True, blank = True)
    vendor_id = models.CharField(max_length = 10, blank = True)
    shop_name = models.CharField(max_length = 255)
    gst_number = models.CharField(max_length = 20)
    aadhar_number = models.CharField(max_length = 16)
    bank_account = models.CharField(max_length = 15)
    bank_ifsc_code = models.CharField(max_length = 15)
    banned = models.BooleanField(default = False)
    total_product = models.IntegerField(default = 0)
    total_sales = models.IntegerField(default = 0)
    total_payment = models.IntegerField(default = 0)
    alternate_phone = models.CharField(max_length  = 13)
    address1 = models.CharField(max_length = 100) # house no. / building name / village  
    landmark = models.CharField(max_length = 100)
    city = models.CharField(max_length = 100)
    state = models.CharField(max_length = 100)
    zipcode = models.IntegerField()
    country = models.CharField(max_length = 100)
    
    def save(self, *args, **kwargs):
        if not self.vendor_id:
            self.vendor_id = generate_shop_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.shop_name
    