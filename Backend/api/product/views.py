from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
from .models import (Product, ProductImage)
from .serializers import (ProductSerializer, ProductImageSerializer)
from .permissions import CustomPermission
from  api.renderer import UserRenderer
from api.vendor.models import VendorUser


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly]) 
def product_list(request):
    
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


class ProductCreateView(APIView):
    permission_classes = [IsAuthenticated, CustomPermission]
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        user = request.user
        seller = get_object_or_404(VendorUser, owner=user)
        
        try:
            data = request.data
            data['seller'] = seller.uid
            serializer = ProductSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response({"msg":"success","data" : serializer.data}, status=status.HTTP_201_CREATED)
            else:
                # If validation fails, raise a custom exception
                raise ValidationError(detail=serializer.errors)
        except ValidationError as ve:
            return Response({"error": ve.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle other exceptions if needed
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated, CustomPermission]
    renderer_classes = [UserRenderer]

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerializer(product)
        return Response({"msg":"success", "data": serializer.data})

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"success", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"success", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        product = self.get_object(pk)
        product.delete()
        return Response({"msg":"success"}, status=status.HTTP_204_NO_CONTENT)





@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly]) 
def get_product_image(request, pk):
    try:
        product_image = get_object_or_404(ProductImage, product=pk)
        serializer = ProductImageSerializer(product_image)
        return Response({"msg":"success", "data": serializer.data})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductImageView(APIView):
    permission_classes = [IsAuthenticated, CustomPermission]
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        try:
            serializer = ProductImageSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({"msg":"success", "data": serializer.data}, status=status.HTTP_201_CREATED)
            else:
                raise ValidationError(detail=serializer.errors)
        except ValidationError as ve:
            return Response({"error": ve.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, format=None):
        try:
            product_images = ProductImage.objects.all()
            serializer = ProductImageSerializer(product_images, many=True)
            return Response({"msg":"success", "data": serializer.data})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductImageDetailView(APIView):
    permission_classes = [IsAuthenticated, CustomPermission]
    renderer_classes = [UserRenderer]

    def get_object(self, pk):
        return get_object_or_404(ProductImage, product=pk)

    def retrieve(self, request, pk, format=None):
        try:
            product_image = self.get_object(pk)
            serializer = ProductImageSerializer(product_image)
            return Response({"msg":"success", "data": serializer.data})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk, format=None):
        try:
            product_image = self.get_object(pk)
            previous_image = product_image.image

            serializer = ProductImageSerializer(product_image, data=request.data)

            if serializer.is_valid():
                serializer.save()

                # Delete previous image if it exists
                if previous_image and 'http' not in previous_image:
                    # Assuming previous_image is a file path in the media folder
                    default_storage.delete(previous_image)

                return Response({"msg": "success", "data": serializer.data})
            else:
                raise ValidationError(detail=serializer.errors)
        except ValidationError as ve:
            return Response({"error": ve.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def delete(self, request, pk, format=None):
        try:
            product_image = self.get_object(pk)
            product_image.delete()
            return Response({"msg":"success"} ,status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
