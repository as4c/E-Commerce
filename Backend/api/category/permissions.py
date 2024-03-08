from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthenticatedOrReadOnlyForCategory(BasePermission):
    """
    Custom permission to allow read-only access to authenticated users
    and full access only for non-GET requests.
    """

    def has_permission(self, request, view):
        # Allow read-only access for GET requests
        if request.method in SAFE_METHODS:
            return True

        # Require authentication for other methods (e.g., POST, PUT, DELETE)
        return request.user and request.user.is_authenticated


class IsAuthenticatedForCategoryCreation(BasePermission):
    """
    Custom permission to require authentication only for category creation (POST requests).
    """

    def has_permission(self, request, view):
        # Require authentication only for POST requests
        return request.method == 'POST' and request.user and request.user.is_authenticated

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS