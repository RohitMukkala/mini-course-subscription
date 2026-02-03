from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.deps import get_db, get_current_user


router = APIRouter(tags=["Subscriptions"])


PROMO_CODE = "BFSALE25"
DISCOUNT = 0.5   # 50%


# -------- Subscribe --------

@router.post("/subscribe")
def subscribe(
    data: schemas.SubscribeRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    # Check course
    course = db.query(models.Course).filter(
        models.Course.id == data.course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    # Check already subscribed
    existing = db.query(models.Subscription).filter(
        models.Subscription.user_id == current_user.id,
        models.Subscription.course_id == course.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already subscribed"
        )

    final_price = course.price

    # Free course
    if course.price == 0:
        final_price = 0

    # Paid course
    else:
        if not data.promo_code:
            raise HTTPException(
                status_code=400,
                detail="Promo code required"
            )

        if data.promo_code != PROMO_CODE:
            raise HTTPException(
                status_code=400,
                detail="Invalid promo code"
            )

        final_price = course.price * DISCOUNT


    subscription = models.Subscription(
        user_id=current_user.id,
        course_id=course.id,
        price_paid=final_price
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)

    return {
        "message": "Subscribed successfully",
        "price_paid": final_price
    }


# -------- My Courses --------

@router.get("/my-courses")
def my_courses(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    subs = db.query(models.Subscription).filter(
        models.Subscription.user_id == current_user.id
    ).all()

    result = []

    for sub in subs:
        course = sub.course

        result.append({
            "id": course.id,
            "title": course.title,
            "price_paid": sub.price_paid,
            "subscribed_at": sub.subscribed_at.isoformat(),
            "image": course.image
        })

    return result
