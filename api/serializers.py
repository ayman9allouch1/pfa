from rest_framework import serializers
from core.models import MedicalImage, Annotation, Report
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class AnnotationSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Annotation
        fields = ['id', 'medical_image', 'annotation_type', 'coordinates', 
                 'created_by', 'created_at', 'label', 'confidence_score']
        read_only_fields = ['created_by', 'created_at']

class ReportSerializer(serializers.ModelSerializer):
    generated_by = UserSerializer(read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'medical_image', 'content', 'generated_at', 
                 'last_updated', 'generated_by', 'approved']
        read_only_fields = ['generated_by', 'generated_at', 'last_updated']

class MedicalImageSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    annotations = AnnotationSerializer(many=True, read_only=True)
    reports = ReportSerializer(many=True, read_only=True)

    class Meta:
        model = MedicalImage
        fields = ['id', 'title', 'image', 'image_type', 'uploaded_by', 
                 'uploaded_at', 'processed', 'deblurred_image', 
                 'annotations', 'reports']
        read_only_fields = ['uploaded_by', 'uploaded_at', 'processed', 
                           'deblurred_image']
