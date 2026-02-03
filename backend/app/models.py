from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    subscriptions = relationship("Subscription", back_populates="user")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    price = Column(Float)
    image = Column(String, nullable=True)

    subscriptions = relationship("Subscription", back_populates="course")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    price_paid = Column(Float)
    subscribed_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="subscriptions")
    course = relationship("Course", back_populates="subscriptions")
