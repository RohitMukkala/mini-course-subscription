from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer

from app.database import SessionLocal
from app.config import SECRET_KEY, ALGORITHM
from app import models


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# -------- DB Dependency --------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------- Current User --------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=401)

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if not user:
        raise HTTPException(status_code=401)

    return user
