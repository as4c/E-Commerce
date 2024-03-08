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
from django.db.models import Q
from api.pagination import CustomPageNumberPagination
from api.notifications.views import NotifyUserProductInStock

class FilterProductsView(APIView):
    def get(self, request):
        # Get filter parameters from query parameters
        effective_price_sort = request.query_params.get('effective_price', None)
        price_range_filter = request.query_params.get('price_range', None)
        date_sort = request.query_params.get('date', None)

        # Start with all products
        queryset = Product.objects.all()

        # Apply filters based on query parameters
        if effective_price_sort == 'lth':
            queryset = queryset.order_by('effective_price')
        elif effective_price_sort == 'htl':
            queryset = queryset.order_by('-effective_price')
       
        if price_range_filter:
            # '500t1000': {'effective_price__gte': 500, 'effective_price__lte': 1000} # custom value
            price_range_filters = {
                '100t500': {'effective_price__lte': 500},
                '500t1000': {'effective_price__lte': 1000},
                '1000t1500': {'effective_price__lte': 1500},
                '1500t2000': {'effective_price__lte': 2000},
                '2000t3000': {'effective_price__lte': 3000},
                '3000t4000': {'effective_price__lte': 4000},
                '4000t5000': {'effective_price__lte': 5000},
                '>5000': {'effective_price__gte': 5000},
            }
            queryset = queryset.filter(**price_range_filters.get(price_range_filter, {}))

        if date_sort == 'na':
            queryset = queryset.order_by('-updated_at')
        elif date_sort == 'op':
            queryset = queryset.order_by('updated_at')

        serializer = ProductSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_product(request):
    query = request.GET.get('q')
    if query:
        results = Product.objects.filter(
            Q(product_name__icontains=query) |
            Q(category__name__icontains=query)
        )
        paginator = CustomPageNumberPagination()
        paginated_results = paginator.paginate_queryset(results, request)
        serializer = ProductSerializer(paginated_results, many=True)
        return paginator.get_paginated_response(serializer.data)
    else:
        return Response([], status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly]) 
def product_list(request):
    products = Product.objects.all()
    paginator = CustomPageNumberPagination()
    paginated_products = paginator.paginate_queryset(products, request)
    serializer = ProductSerializer(paginated_products, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly]) 
def get_product(request, uid):
    products = Product.objects.get(uid = uid)
    serializer = ProductSerializer(products)
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
                seller.total_product += 1
                seller.save()
                return Response({"msg":"success","data" : serializer.data}, status=status.HTTP_201_CREATED)
            else:
                raise ValidationError(detail=serializer.errors)
        except ValidationError as ve:
            return Response({"error": ve.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle other exceptions if needed
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated, CustomPermission]
    renderer_classes = [UserRenderer]

    def get_object(self, uid):
        try:
            return Product.objects.get(pk=uid)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        product = self.get_object(uid)
        serializer = ProductSerializer(product)
        return Response({"msg":"success", "data": serializer.data})

    def put(self, request, uid, format=None):
        product = self.get_object(uid)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            NotifyUserProductInStock(product.uid)
            serializer.save()
            return Response({"msg":"success", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, uid, format=None):
        product = self.get_object(uid)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            NotifyUserProductInStock(product.uid)
            serializer.save()
            return Response({"msg":"success", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        product = self.get_object(uid)
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
