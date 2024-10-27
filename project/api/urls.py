from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.static import static
from django.conf import settings
from .views import MyView, ProfileView

urlpatterns = [
        path('myview/', MyView.as_view(), name="MyPostView"),
        path('profile/', ProfileView.as_view(), name="ProfileView"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
