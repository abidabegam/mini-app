from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    # resume is optional on update – keep old file if not sent
    resume = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Employee
        fields = ["id", "name", "email", "resume"]

    # Keep old resume if client didn't send resume field at all
    def update(self, instance, validated_data):
        # Only change resume if it's explicitly present in incoming data
        if "resume" in self.initial_data:
            instance.resume = validated_data.get("resume", None)
        instance.name = validated_data.get("name", instance.name)
        instance.email = validated_data.get("email", instance.email)
        instance.save()
        return instance
