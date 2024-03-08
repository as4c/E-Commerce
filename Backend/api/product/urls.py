from django.urls import path,include
from . import views

urlpatterns = [
    path('list/',views.product_list, name = 'product-listing'),
    path('get/<str:uid>', views.get_product, name = 'get-product'),
    path('add/', views.ProductCreateView.as_view(), name = 'product-create'),
    path('actions/<str:uid>/', views.ProductDetailView.as_view(), name = 'product-action'),
    path('images/add/', views.ProductImageView.as_view(), name = 'product-image'),
    path('get-images/', views.get_product_image, name = 'get-image'),
    path('images/actions/<str:pk>/', views.ProductImageDetailView.as_view(), name = 'product-image-actions'),
    path('search-product/', views.search_product, name = 'search - product'),
    path('filter-products/', views.FilterProductsView.as_view(), name='filter-products'),
]
