from django.urls import path
from .views import PatientListView, PatientDetailView, PatientDocumentsView

urlpatterns = [
    path('patients/', PatientListView.as_view(), name='patients-list'),
    path('patients/<int:id>/', PatientDetailView.as_view(), name='patient-detail'),
    path('patients/<int:id>/documents/', PatientDocumentsView.as_view(), name='patient-documents'),
    # ...other routes...
]
