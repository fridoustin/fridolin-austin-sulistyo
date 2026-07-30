from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas


def get_tasks(db: Session):
    """Ambil semua task, urut dari yang terbaru (created_at descending)."""
    return db.query(models.Task).order_by(models.Task.created_at.desc()).all()


def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(
        title=task.title,
        description=task.description or "",
        status=task.status,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, task_id: int, task_update: schemas.TaskUpdate):
    db_task = get_task(db, task_id)
    if not db_task:
        return None

    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)

    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    if not db_task:
        return None
    db.delete(db_task)
    db.commit()
    return db_task


def get_stats(db: Session):
    total = db.query(func.count(models.Task.id)).scalar()
    todo = db.query(func.count(models.Task.id)).filter(
        models.Task.status == models.TaskStatus.TODO
    ).scalar()
    in_progress = db.query(func.count(models.Task.id)).filter(
        models.Task.status == models.TaskStatus.IN_PROGRESS
    ).scalar()
    done = db.query(func.count(models.Task.id)).filter(
        models.Task.status == models.TaskStatus.DONE
    ).scalar()

    return schemas.TaskStats(
        total=total, todo=todo, in_progress=in_progress, done=done
    )
