from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from .config import settings

client = None
db = None

async def connect_to_mongodb():
    global client, db
    try:
        client = AsyncIOMotorClient(settings.MONGODB_URL)
        # Verify the connection
        await client.admin.command('ping')
        db = client[settings.DATABASE_NAME]
        print("Successfully connected to MongoDB")
    except ConnectionFailure:
        print("Failed to connect to MongoDB")
        raise

async def close_mongodb_connection():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")

def get_database():
    return db