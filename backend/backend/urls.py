from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from employee.views import EmployeeViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r"employees", EmployeeViewSet, basename="employee")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]

# serve uploaded files in dev
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
