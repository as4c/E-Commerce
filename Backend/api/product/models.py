from django.db import models
from api.category.models import Category
from api.models import BaseModel
from api.vendor.models import VendorUser
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from ckeditor.fields import RichTextField

class Product(BaseModel):
    seller                  =   models.ForeignKey(VendorUser, on_delete = models.CASCADE)
    product_name            =   models.CharField(max_length = 50,blank = True, null = True)
    product_description     =   RichTextField()
    category                =   models.ForeignKey(Category, on_delete = models.SET_NULL, blank=True, null=True)
    actual_price            =   models.IntegerField(default = 0)
    effective_price         =   models.IntegerField(default = 0)
    discount                =   models.IntegerField(default = 0)
    stock                   =   models.IntegerField(default = 100)
    is_available            =   models.BooleanField(default = True, blank = True)
    image                   =   models.ImageField(upload_to="product_images/",blank=True,null=True)
    brand_name              =   models.CharField(max_length = 50, default = "unknown")
    volume                  =   models.CharField(max_length = 10, default = "1")
    expiry_date             =   models.DateTimeField(null = True, blank = True)


    
    class Meta:
        ordering              = ['-updated_at']

    def __str__(self):
        return self.product_name
    
    def calculate_effective_price(self):
        if self.discount == 0:
            return self.actual_price
        else:
            return int((self.actual_price - (self.actual_price * (self.discount / 100)))*1)
     
    def save(self, *args, **kwargs):
        self.effective_price = self.calculate_effective_price()
        super().save(*args, **kwargs)


class ProductImage(BaseModel):
    
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    image = models.URLField(null = True, blank = True)

    def save(self, *args, **kwargs):
    # Check if a new profile_pic has been uploaded
        if self.image and 'http' not in self.image:
            # Process and save the uploaded image here
            processed_image = self.process_and_save_image()

            # Update the profile_pic with the processed image URL
            self.image = processed_image
            super().save(*args, **kwargs)
        else:
            self.image =  f"https://res.cloudinary.com/deyj67ued/image/upload/v1709889339/media/Bewra/product_images/default_y4rzfq.jpg"
            super().save(*args, **kwargs)
        

    def process_and_save_image(self):
        if settings.DEBUG:          
            return self.save_image_to_media_folder()
        else:
            return self.save_image_to_s3()

    def save_image_to_media_folder(self):
        if not self.image:
            return f'https://res.cloudinary.com/deyj67ued/image/upload/v1709889339/media/Bewra/product_images/default_y4rzfq.jpg'

        # Check the type of profile_pic
        if isinstance(self.image, InMemoryUploadedFile):
            # Get the file extension from the uploaded profile picture URL
            file_extension = self.image.name.split('.')[-1]

            # Generate a unique filename for the uploaded profile picture
            unique_filename = f"product_images/{self.product.product_name}_product.{file_extension}"

            # Save the uploaded profile picture to the media folder
            custom_product_image_path = default_storage.save(unique_filename, ContentFile(''))

            # Return the URL of the saved custom profile picture
            return default_storage.url(custom_product_image_path)
        else:
            # If it's not an InMemoryUploadedFile, return the existing URL
            return self.image

        

    def save_image_to_s3(self):
        # Placeholder logic for saving to S3 or other cloud storage
        # In production, you can use a storage service like AWS S3
        # Replace this with your actual logic for saving to S3 or other cloud storage
        return 'https://your-s3-bucket-url.com'
        

