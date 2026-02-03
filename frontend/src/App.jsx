import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/my-courses"
        element={
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
