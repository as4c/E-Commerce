from django.urls import path
from . import views
urlpatterns = [
    path('', views.UserWishlistView.as_view(), name = 'user-wishlist'),
]