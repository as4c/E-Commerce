from django.urls import path,include
from . import views

urlpatterns = [
    path('list/',views.product_list, name = 'product-listing'),
    path('add/', views.ProductCreateView.as_view(), name = 'product-create'),
    path('actions/<str:pk>/', views.ProductDetailView.as_view(), name = 'product-action'),

    path('images/add/', views.ProductImageView.as_view(), name = 'product-image'),
    path('get-images/', views.get_product_image, name = 'get-image'),
    path('images/actions/<str:pk>/', views.ProductImageDetailView.as_view(), name = 'product-image-actions'),
]
