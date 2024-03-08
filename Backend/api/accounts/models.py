
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from api.models import BaseModel
from .manager import UserManager

class CustomUser(AbstractBaseUser, BaseModel):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    REGISTRATION_CHOICES = [
        ('email', 'Email'),
        ('google', 'Google'),
    ]

    first_name          = models.CharField(max_length=50,default="Anony")
    last_name           = models.CharField(max_length = 50, default = "Mous")
    email               = models.EmailField(max_length=255,unique=True, verbose_name = 'Email')
    phone               = models.CharField(max_length=13,blank=True,null=True, unique = True)
    username            = models.CharField(max_length=255, unique=True)
    profile_pic         = models.URLField(null = True, blank = True)
    gender              = models.CharField(max_length=1,choices = GENDER_CHOICES, null = True, blank = True)
    is_active           = models.BooleanField(default=True)
    is_admin            = models.BooleanField(default=False)
    is_staff            = models.BooleanField(default = False)
    is_superuser        = models.BooleanField(default = False)
    verified            = models.BooleanField(default = False)
    verification_token  = models.CharField(max_length = 100, default = 0)
    is_vendor           = models.BooleanField(default = False)
    is_delivery_boy     = models.BooleanField(default = False)
    registration_method = models.CharField(
        max_length=10,
        choices=REGISTRATION_CHOICES,
        default='email'
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
 

    objects = UserManager()
      
        
    def __str__(self):
        return self.username
    
  
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
    

    # def save(self, *args, **kwargs):
    # # Check if a new profile_pic has been uploaded
    #     if self.profile_pic and 'http' not in self.profile_pic:
    #         # Process and save the uploaded image here
    #         processed_image_url = self.process_and_save_image()

    #         # Update the profile_pic with the processed image URL
    #         self.profile_pic = processed_image_url
    #         super().save(*args, **kwargs)
    #     else:
    #         self.profile_pic =  f"https://asset.cloudinary.com/deyj67ued/67f7a2d51646777c6d75069006f16cd3"
    #         super().save(*args, **kwargs)
        

    # def process_and_save_image(self):
    #     if settings.DEBUG:          
    #         return self.save_image_to_media_folder()
    #     else:
    #         return self.upload_to_cloudinary()
    #         # return self.save_image_to_s3()

    # def save_image_to_media_folder(self):
    #     if not self.profile_pic:
    #         return f'https://asset.cloudinary.com/deyj67ued/67f7a2d51646777c6d75069006f16cd3'

    #     print(self.profile_pic)
    #     # Check the type of profile_pic
    #     if isinstance(self.profile_pic, InMemoryUploadedFile):
    #         # Get the file extension from the uploaded profile picture URL
    #         # file_extension = self.profile_pic.name.split('.')[-1]
    #         # Generate a unique filename for the uploaded profile picture
    #         unique_filename = f"Bewra/profile_pics/{self.username}_profile_{self.profile_pic}"

    #         # Save the uploaded profile picture to the media folder
    #         custom_profile_pic_path = default_storage.save(unique_filename, ContentFile(''))
    #         print(custom_profile_pic_path)
    #         # Return the URL of the saved custom profile picture
    #         return default_storage.url(custom_profile_pic_path)
    #     else:
    #         # If it's not an InMemoryUploadedFile, return the existing URL
    #         return self.profile_pic


    # def upload_to_cloudinary(self):
    #     # logic here
    #     print(self.profile_pic)
    #     if not self.profile_pic:
    #         return 'https://asset.cloudinary.com/deyj67ued/67f7a2d51646777c6d75069006f16cd3'

    #     # Check the type of profile_pic
    #     if isinstance(self.profile_pic, InMemoryUploadedFile):
    #         # Upload the image to Cloudinary
    #         upload_response = upload(self.profile_pic, folder="Bewra/profile_pics", overwrite=True)

    #         # Return the URL of the uploaded image on Cloudinary
    #         return upload_response['secure_url']
    #     else:
    #         # If it's not an InMemoryUploadedFile, return the existing URL
    #         return self.profile_pic        

    # def save_image_to_s3(self):
    #     return 'https://your-s3-bucket-url.com'
        

class Address(BaseModel):
    ADDRESS_CHOICES = [
        ('H', 'Home'),
        ('C', 'Current'),
        ('O', 'Other')
    ]
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE, null = True, blank = True)
    type = models.CharField(max_length = 1, choices = ADDRESS_CHOICES, default = 'C')
    address1 = models.CharField(max_length = 100) # house no. / building name / village  
    landmark = models.CharField(max_length = 100)
    city = models.CharField(max_length = 100)
    state = models.CharField(max_length=100)
    zipcode = models.IntegerField()
    country = models.CharField(max_length = 100)
 