# Dynamic Family Form Application

A full-stack web application for collecting and managing family information. The application features a dynamic form that allows users to input details for multiple family members.

## Features

- Dynamic form generation based on number of family members
- Responsive design with Tailwind CSS
- Real-time form validation
- Backend API with FastAPI
- Data persistence with MongoDB database

## Tech Stack

- Frontend: React with Tailwind CSS
- Backend: FastAPI
- Database: MongoDB

## Project Structure

```
/
├── frontend/           # React application
│   ├── public/         # Static assets
│   └── src/           # React source code
├── backend/           # FastAPI application
│   ├── app/           # API endpoints and business logic
│   └── database/      # Database models and connection
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn
- MongoDB (running locally or accessible instance)

### Environment Variables

#### Frontend (.env)

Copy `.env.example` to `.env` and configure:

```bash
# API Configuration
VITE_API_URL=http://localhost:8000

# Other Configuration
VITE_APP_TITLE="Family Form"
VITE_APP_DESCRIPTION="A dynamic form for collecting family information"
```

#### Backend (.env)

Copy `.env.example` to `.env` and configure:

```bash
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=family_form

# FastAPI Configuration
BACKEND_CORS_ORIGINS=["http://localhost:5173"]
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:

   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`

## API Documentation

### Endpoints

#### POST /api/family-members

Submits family member information.

**Request Body:**

```json
{
  "familyMembers": [
    {
      "native_city": "string",
      "native_state": "string"
    }
  ]
}
```

**Response:**

- `200 OK`: Successfully saved family members
- `400 Bad Request`: Invalid input data
- `500 Internal Server Error`: Server error

## Development

- Frontend code is in `frontend/src/`
- Backend API endpoints are in `backend/app/main.py`
- Database models are in `backend/app/models.py`

## Deployment

### Frontend Deployment

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the contents of `dist/` to your hosting service

### Backend Deployment

1. Set up your production database
2. Configure environment variables
3. Deploy using your preferred hosting service

Recommended hosting platforms:

- Frontend: Vercel, Netlify, or AWS S3
- Backend: Docker containers on AWS, GCP, or Azure
