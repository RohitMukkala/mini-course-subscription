from .auth import router as auth_router
from .courses import router as courses_router
from .subscriptions import router as subscriptions_router

__all__ = [
    "auth_router",
    "courses_router",
    "subscriptions_router",
]
