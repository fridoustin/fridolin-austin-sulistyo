import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL tidak ditemukan. Jangan lupa salin .env.example menjadi .env"
        "dan isi konfigurasi databasenya terlebih dahulu"
    )

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """Dependency untuk FastAPI: satu session per request, otomatis ditutup setelahnya."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
