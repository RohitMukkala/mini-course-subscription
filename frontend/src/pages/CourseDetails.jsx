import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      const payload = { course_id: course.id };
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
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 sm:h-64 lg:h-80 object-cover"
          />

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              {course.title}
            </h1>

            <div className="flex items-start gap-2 mb-6">
              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="mb-6 flex items-center gap-2">
              {course.price === 0 ? (
                <>
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">FREE</p>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">Price: ₹{course.price}</p>
                </>
              )}
            </div>

            {course.price > 0 && (
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Promo Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                />
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-md">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2 text-green-600 text-sm mb-4 bg-green-50 p-3 rounded-md">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{success}</span>
              </div>
            )}

            <button
              onClick={handleSubscribe}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
