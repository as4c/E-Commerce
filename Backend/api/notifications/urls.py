from django.urls import path
from . import views
urlpatterns = [
    path('me/', views.ProductInStockView.as_view(), name = 'product-in-stock')
]