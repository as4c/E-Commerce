from django.urls import path, include
from . import views
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class CustomGoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter



urlpatterns = [
    path('signup/', views.UserRegistrationView.as_view(),name='signup'),
    path('signin/', views.UserLoginView.as_view(),name='signin'),
    path('logout/', views.signout, name = 'logout'),
    path('profile/', views.UserProfileView.as_view(), name = 'profile'),
    path('change-password/', views.UserChangePasswordView.as_view(), name='change-password'),
    path('send-reset-password-email/', views.SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', views.UserPasswordResetView.as_view(), name='reset-password'),
    path('verify/<str:uid>/<str:token>/', views.verify_account, name='verify-account'),
    path('delete/', views.delete_user_account, name = 'account-delete'),
    path('addresses/', views.AddressView.as_view(), name='address_list'),
    path('addresses/<str:address_uid>/', views.AddressView.as_view(), name='address_detail'),

    path('social/', include('dj_rest_auth.urls')),  # Authentication URLs
    path('auth/social/', include('allauth.socialaccount.urls')),  # Social authentication URLs
    path('signup/social/', include('dj_rest_auth.registration.urls')),  # Registration URLs
    path('signin/google/', CustomGoogleLoginView.as_view(), name='google_login'),
]
