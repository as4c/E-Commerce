from rest_framework.permissions import BasePermission

class CustomPermission(BasePermission):
    """
    Custom permission to only allow vendor owners or admins to modify vendor data.
    """

    def has_object_permission(self, request, view, obj):
        return request.user == obj.owner or request.user.is_vendor


