from rest_framework import viewsets
from .serializers import CategorySerializers
from .models import Category
from api.permissions import CustomPermission
from rest_framework.permissions import IsAuthenticated
from api.renderer import UserRenderer
class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]
    queryset = Category.objects.all().order_by('name')
    serializer_class  = CategorySerializers