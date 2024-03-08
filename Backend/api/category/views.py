from rest_framework import viewsets
from .serializers import CategorySerializers
from .models import Category
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.renderer import UserRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .permissions import ReadOnly
from rest_framework.decorators import permission_classes, api_view, authentication_classes




@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny]) 
def get_category(request):
    if request.method == 'GET':
        cat_instance =  Category.objects.all().order_by('name')
        serializer = CategorySerializers(cat_instance, many=True)  # Pass many=True for queryset
        return Response({"msg": "success", "data": serializer.data}, status=status.HTTP_200_OK)
    else:
        return Response({"msg": "Method not allowed"}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def create_category(request):
    if request.method == 'POST':
        serializer = CategorySerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Category created successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"msg": "Failed to create category", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"msg": "Method not allowed"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated]) 
def update_category(request, uid):
    if request.method == 'PATCH':
        category_instance = Category.objects.get(uid = uid)
        serializer = CategorySerializers(category_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Category updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({"msg": "Failed to update category", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({"msg": "Method not allowed"}, status=status.HTTP_401_UNAUTHORIZED)


