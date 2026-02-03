from fastapi import APIRouter

router = APIRouter(prefix="/courses", tags=["Courses"])


@router.get("/test")
def courses_test():
    return {"msg": "Courses router working"}
