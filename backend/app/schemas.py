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


# -------- Course Schemas --------

class CourseBase(BaseModel):
    title: str
    description: str
    price: float
    image: str | None = None


class CourseOut(CourseBase):
    id: int

    class Config:
        from_attributes = True
