import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import client from "../api/client";
import Navbar from "../components/Navbar";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [promo, setPromo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await client.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  const handleSubscribe = async () => {
    setError("");
    setSuccess("");

    try {
      const payload = {
        course_id: course.id,
      };

      if (course.price > 0) {
        payload.promo_code = promo;
      }

      const res = await client.post("/subscribe", payload);

      setSuccess(`Subscribed! Paid ₹${res.data.price_paid}`);

      setTimeout(() => {
        navigate("/my-courses");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.detail || "Subscription failed");
    }
  };

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (!course) {
    return <p className="p-10">Course not found</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-bold mb-3">{course.title}</h1>

        <p className="text-gray-700 mb-4">{course.description}</p>

        <p className="text-xl font-semibold mb-4">
          {course.price === 0 ? "FREE" : `Price: ₹${course.price}`}
        </p>

        {/* Promo for Paid */}

        {course.price > 0 && (
          <input
            type="text"
            placeholder="Enter Promo Code"
            className="border p-2 rounded w-full mb-3"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
        )}

        {error && <p className="text-red-500 mb-2">{error}</p>}

        {success && <p className="text-green-600 mb-2">{success}</p>}

        <button
          onClick={handleSubscribe}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
