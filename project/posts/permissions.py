from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    Custom permission to allow only admins to edit posts.
    """
    def has_permission(self, request, view):
        # Allow all users to view posts (GET request is safe)
        if request.method in SAFE_METHODS:
            return True
        # Only admins can create, update, or delete
        return request.user and request.user.is_staff