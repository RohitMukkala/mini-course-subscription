from fastapi import APIRouter

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])


@router.get("/test")
def subs_test():
    return {"msg": "Subscriptions router working"}
