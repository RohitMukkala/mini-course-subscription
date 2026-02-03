from app.database import SessionLocal
from app import models


def seed_courses():

    db = SessionLocal()

    existing = db.query(models.Course).first()

    if existing:
        print("Courses already seeded.")
        return

    courses = [

        models.Course(
            title="Python for Beginners",
            description="Learn Python from scratch with hands-on examples.",
            price=0,
            image="https://picsum.photos/300/200?1"
        ),

        models.Course(
            title="Full Stack Web Development",
            description="React + FastAPI + PostgreSQL complete guide.",
            price=1999,
            image="https://picsum.photos/300/200?2"
        ),

        models.Course(
            title="Data Structures & Algorithms",
            description="Crack interviews with DSA in Python and Java.",
            price=1499,
            image="https://picsum.photos/300/200?3"
        ),

        models.Course(
            title="Machine Learning Basics",
            description="Introduction to ML with real projects.",
            price=2499,
            image="https://picsum.photos/300/200?4"
        ),

        models.Course(
            title="System Design Fundamentals",
            description="Learn scalable system architecture.",
            price=1799,
            image="https://picsum.photos/300/200?5"
        ),
    ]

    db.add_all(courses)
    db.commit()
    db.close()

    print("Courses seeded successfully.")


if __name__ == "__main__":
    seed_courses()
