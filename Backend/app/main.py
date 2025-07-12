from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.api.api_router import api_router
from app.db.base import Base
from app.db.session import engine

# Create all tables
# In a production app, you would use Alembic for migrations
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ReWear API")

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your Next.js app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the ReWear API"}