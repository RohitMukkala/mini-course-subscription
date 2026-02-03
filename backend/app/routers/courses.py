from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.deps import get_db


router = APIRouter(prefix="/courses", tags=["Courses"])


# -------- Get All Courses --------

@router.get("/", response_model=List[schemas.CourseOut])
def get_all_courses(db: Session = Depends(get_db)):

    courses = db.query(models.Course).all()

    return courses


# -------- Get Course By ID --------

@router.get("/{course_id}", response_model=schemas.CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):

    course = (
        db.query(models.Course)
        .filter(models.Course.id == course_id)
        .first()
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return course
