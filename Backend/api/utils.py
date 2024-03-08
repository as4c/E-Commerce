from .accounts.models import CustomUser
from django.core.mail import EmailMessage
import os
from rest_framework_simplejwt.tokens import RefreshToken
import json
from django.core.serializers.json import DjangoJSONEncoder
from uuid import UUID
from django.core.files.uploadedfile import InMemoryUploadedFile
from cloudinary.uploader import upload
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile



def save_image_to_media_folder(image):
    if not image:
        return f'https://asset.cloudinary.com/deyj67ued/67f7a2d51646777c6d75069006f16cd3'

    if isinstance(image, InMemoryUploadedFile):
        unique_filename = f"profile_pics/profile_{image}"
        custom_profile_pic_path = default_storage.save(unique_filename, ContentFile(''))
        return default_storage.url(custom_profile_pic_path)
    else:
        return image

def upload_to_cloudinary(image):
    if not image:
        return 'https://asset.cloudinary.com/deyj67ued/67f7a2d51646777c6d75069006f16cd3'

    if isinstance(image, InMemoryUploadedFile):
        upload_response = upload(image, folder="Bewra/profile_pics", overwrite=True)
        return upload_response['secure_url']
    else:
        return image
    
def get_login_tokens(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

def generate_username(first_name, last_name, phone_number):
  """
  Generates a username of length 12 using user information.

  Args:
    first_name: User's first name.
    last_name: User's last name.
    phone_number: User's phone number without dashes or spaces.

  Returns:
    A string representing the generated username.

  Raises:
    ValueError: If any input is empty or phone number is not numeric.
  """

  if not first_name or not last_name or not phone_number:
    raise ValueError("All input fields must be non-empty.")

  
  # Generate username components
  instance = CustomUser.objects.get(phone = phone_number)
  first_name_part = instance.first_name[:4]
  last_name_part = instance.last_name[:4]
  phone_part = instance.phone_number[:4]

  # Combine components with separators
  username = f"{first_name_part}_{last_name_part}_{phone_part}"

  # Ensure username length is exactly 12
  if len(username) > 12:
    username = username[:12]

  return username




class Util:
  @staticmethod
  def send_email(data):
    email = EmailMessage(
      subject=data['subject'],
      body=data['body'],
      from_email=os.environ.get('EMAIL_FROM'),
      to=[data['to_email']]
    )
    email.send()




class UUIDEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return str(obj)
        return super().default(obj)
