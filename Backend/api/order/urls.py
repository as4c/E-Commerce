from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.OrderGetAndCreateView.as_view(), name = 'order-create-get'),
    # path('add/<str:id>/<str:token>/',views.add,name='order')
]
