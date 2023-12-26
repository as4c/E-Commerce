from rest_framework.permissions import BasePermission

class CustomPermission(BasePermission):
    """
    Custom permission to only allow vendor owners or admins to modify vendor data.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user is an admin or the owner of the vendor
        return request.user == obj.user or request.user.is_delivery_boy

