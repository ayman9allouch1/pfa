from django.db import models
from django.contrib.auth.models import User

class MedicalImage(models.Model):
    IMAGE_TYPES = [
        ('mammogram', 'Mammogram'),
        ('mri', 'MRI'),
        ('ultrasound', 'Ultrasound'),
    ]

    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='medical_images/')
    image_type = models.CharField(max_length=20, choices=IMAGE_TYPES)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)
    deblurred_image = models.ImageField(upload_to='deblurred_images/', null=True, blank=True)

    def __str__(self):
        return self.title

class Annotation(models.Model):
    ANNOTATION_TYPES = [
        ('box', 'Bounding Box'),
        ('polygon', 'Polygon'),
        ('segment', 'Segmentation'),
    ]

    medical_image = models.ForeignKey(MedicalImage, on_delete=models.CASCADE, related_name='annotations')
    annotation_type = models.CharField(max_length=20, choices=ANNOTATION_TYPES)
    coordinates = models.JSONField(help_text='Coordinates for the annotation')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    label = models.CharField(max_length=100)
    confidence_score = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f'{self.label} - {self.medical_image.title}'

class Report(models.Model):
    medical_image = models.ForeignKey(MedicalImage, on_delete=models.CASCADE, related_name='reports')
    content = models.TextField()
    generated_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    generated_by = models.ForeignKey(User, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f'Report for {self.medical_image.title}'

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('doctor', 'Doctor'),
        ('radiologist', 'Radiologist'),
        ('admin', 'Admin'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='doctor')

    def __str__(self):
        return f"{self.user.username} - {self.role}"
