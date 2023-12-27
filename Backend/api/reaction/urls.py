from django.urls import path
from . import views
urlpatterns = [
    path('product/rating/<str:product_uid>/', views.getRating, name = 'get-ratings'),
    path('product/rating/', views.RatingAPIView.as_view(), name = 'rating-view'),
    path('product/reviews/<str:product_uid>/', views.getReviews, name = 'get-reviews'),
    path('product/reviews/', views.ReviewAPIView.as_view(), name = 'review-views')
]