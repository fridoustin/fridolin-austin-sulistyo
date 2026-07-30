from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict
from .models import TaskStatus


class TaskBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = ""
    status: TaskStatus = TaskStatus.TODO

    @field_validator("title")
    @classmethod
    def title_tidak_boleh_kosong(cls, v: str) -> str:
        if v is None or v.strip() == "":
            raise ValueError("title wajib diisi dan tidak boleh kosong atau hanya spasi")
        return v.strip()


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    """Semua field opsional -> partial update, hanya field yang dikirim yang diproses."""
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None

    @field_validator("title")
    @classmethod
    def title_tidak_boleh_kosong(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v.strip() == "":
            raise ValueError("title tidak boleh kosong atau hanya spasi")
        return v.strip() if v is not None else v


class TaskResponse(TaskBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class TaskStats(BaseModel):
    total: int
    todo: int
    in_progress: int
    done: int


class DeleteResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    detail: str
