# Medical Image Analysis Platform for Breast Cancer

A comprehensive platform for deblurring, annotation, and segmentation of medical images for breast cancer discovery.

## Features

- Image Deblurring using DeblurGAN-v2
- Lesion Detection using Mask R-CNN/YOLOv8
- Image Segmentation using U-Net variants
- Automatic Medical Report Generation
- Interactive Web Interface

## Project Structure

```
pfa/
├── backend/          # Django backend
├── frontend/         # React frontend
├── models/           # AI model implementations
└── data/            # Data storage (gitignored)
```

## Setup Instructions

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory

4. Run development servers:
   - Backend: `python manage.py runserver`
   - Frontend: `npm start`
