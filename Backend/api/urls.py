from django.urls import path,include
from rest_framework.authtoken import views
from .views import *
urlpatterns = [
    path('',home,name='api.home'),
    path('api-token-auth/',views.obtain_auth_token,name='api_token_auth'),
    path('accounts/',include('api.accounts.urls')),
    path('accounts/vendor/',include('api.vendor.urls')),
    path('accounts/delivery-boy/',include('api.deliveryboy.urls')),
    path('category/',include('api.category.urls')),
    path('product/',include('api.product.urls')),
    path('users/cart/', include('api.cart.urls')),
    path('users/wishlist/', include('api.wishlist.urls')),
    path('order/',include('api.order.urls')),
    path('payment/',include('api.payment.urls')),
    path('', include('api.reaction.urls'))
]
