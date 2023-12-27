# views.py
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Rating, Review
from .serializers import RatingSerializer, ReviewSerializer
from rest_framework.decorators import api_view

api_view(['GET',])
def getRating(request, product_uid):

    rating = []
    try:
        rating = Rating.objects.filter(product = product_uid)
    except Rating.DoesNotExist:
        response = {
            "status_code": status.HTTP_404_NOT_FOUND,
            "message": f" Rating with product ID {product_uid} not found."
        }
        return Response(response, status=status.HTTP_404_NOT_FOUND)

    total = rating.all().count()
    avg_stars = 0
    if total == 0:
            avg_stars = 0  # No ratings yet
    else:
        total_stars = sum([rating.star for rating in rating.all()])
        avg_stars = total_stars/total
    return JsonResponse({"stars":avg_stars})
    

            
class RatingAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, rating_id):
        try:
            rating = Rating.objects.get(uid=rating_id)
            serializer = RatingSerializer(rating)
            return Response(serializer.data)
        except Rating.DoesNotExist:
            return Response({'message': 'Rating not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, rating_id):
        try:
            rating = Rating.objects.get(uid=rating_id, user=request.user)
            serializer = RatingSerializer(rating, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Rating.DoesNotExist:
            return Response({'message': 'Rating not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, rating_id):
        try:
            rating = Rating.objects.get(uid=rating_id, user=request.user)
            rating.delete()
            return Response({'message': 'Rating deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Rating.DoesNotExist:
            return Response({'message': 'Rating not found'}, status=status.HTTP_404_NOT_FOUND)

api_view(['GET',])
def getReviews(request, product_uid):
     
    reviews = []
    try:
        reviews = Review.objects.filter(product = product_uid)
    except Review.DoesNotExist:
        response = {
            "status_code": status.HTTP_404_NOT_FOUND,
            "message": f"reviews with ID {product_uid} not found."
        }
        return Response(response, status=status.HTTP_404_NOT_FOUND)

 
    serializer = ReviewSerializer(data = reviews)

    if serializer.is_valid():
        return JsonResponse(serializer.data, safe=False)
    
    return JsonResponse({"message":"something went wrong!"})
class ReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, review_id):
        try:
            review = Review.objects.get(uid=review_id)
            serializer = ReviewSerializer(review)
            return Response(serializer.data)
        except Review.DoesNotExist:
            return Response({'message': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, review_id):
        try:
            review = Review.objects.get(uid=review_id, user=request.user)
            serializer = ReviewSerializer(review, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Review.DoesNotExist:
            return Response({'message': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, review_id):
        try:
            review = Review.objects.get(uid=review_id, user=request.user)
            review.delete()
            return Response({'message': 'Review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            return Response({'message': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
