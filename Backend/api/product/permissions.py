from rest_framework.permissions import BasePermission

class CustomPermission(BasePermission):
    """
    Custom permission to only allow vendor can add or modify product data.
    """

    def has_object_permission(self, request, view, obj):
        print(obj)
        return request.user.is_vendor and request.user == obj.seller

