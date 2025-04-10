from pydantic import BaseSettings
from typing import List
import json

class Settings(BaseSettings):
    # MongoDB settings
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "family_form"
    
    # FastAPI settings
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173"]
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000
    
    class Config:
        env_file = ".env"
        
    def get_cors_origins(self) -> List[str]:
        if isinstance(self.BACKEND_CORS_ORIGINS, str):
            # Parse string of list to actual list if coming from environment variable
            return json.loads(self.BACKEND_CORS_ORIGINS)
        return self.BACKEND_CORS_ORIGINS

settings = Settings()