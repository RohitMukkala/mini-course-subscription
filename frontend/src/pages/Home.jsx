import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import client from "../api/client";
import Navbar from "../components/Navbar";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await client.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="p-10 text-xl">Loading...</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{course.title}</h3>

              <p className="text-sm text-gray-600 mb-3">
                {course.description.slice(0, 60)}...
              </p>

              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  {course.price === 0 ? "FREE" : `₹${course.price}`}
                </span>

                <Link
                  to={`/courses/${course.id}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
