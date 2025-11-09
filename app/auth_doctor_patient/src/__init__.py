from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.Doctor_auth.routes import auth_router
from src.db.main import init_db

version = "v1"

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Server is starting ...")
    await init_db()
    yield
    print("Server is shutting down ...")

app = FastAPI(
    title="MediChain API",
    version=version,
    description="A secure healthcare data-sharing platform for patients and doctors.",
    lifespan=lifespan
)

app.include_router(auth_router, prefix=f"/api/{version}/auths", tags=["Auths"])
