import razorpay
from django.conf import settings


client = razorpay.Client(auth=(
    settings.PUBLIC_KEY,
    settings.SECRET_KEY
    )
)