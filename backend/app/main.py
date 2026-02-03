from fastapi import FastAPI
from app.database import engine
from app import models
from app.routers import auth, courses, subscriptions
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mini Course API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(subscriptions.router)


@app.get("/")
def root():
    return {"status": "running"}
