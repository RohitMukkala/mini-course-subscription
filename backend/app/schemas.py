from pydantic import BaseModel, EmailStr


# -------- User Schemas --------

class UserCreate(BaseModel):
    name: str | None = None
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str | None
    email: EmailStr

    class Config:
        from_attributes = True


# -------- Token Schema --------

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
