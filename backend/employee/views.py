from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all().order_by("id")
    serializer_class = EmployeeSerializer
    # Allow PUT/PATCH with multipart so resume can be uploaded/replaced
    parser_classes = (MultiPartParser, FormParser)
