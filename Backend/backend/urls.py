
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from api.views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('api.urls')),
    path('',include('api.urls')),
]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
