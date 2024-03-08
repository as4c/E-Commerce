from django.urls import path,include
from . import views
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'', views.CategoryViewSet)
# urlpatterns = router.urls
urlpatterns = [
    path('get/', views.get_category, name= 'get-category'),
    path('create/', views.create_category, name= 'create-actions'),
    path('update/',views.update_category, name= 'update-actions'),
]
