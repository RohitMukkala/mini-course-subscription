import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import client from "../api/client";
import Navbar from "../components/Navbar";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await client.get("/my-courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>

        {courses.length === 0 ? (
          <p className="text-gray-600">
            You have not subscribed to any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow p-4 flex gap-4"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-32 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg">{course.title}</h3>

                  <p className="text-sm text-gray-600 mt-1">
                    Paid: ₹{course.price_paid}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Subscribed on:{" "}
                    {new Date(course.subscribed_at).toLocaleDateString()}
                  </p>

                  <Link
                    to={`/courses/${course.id}`}
                    className="text-blue-600 text-sm mt-2 inline-block"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
