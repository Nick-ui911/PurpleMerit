import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./services/api";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import { clearUser, setUser } from "./Redux/userSlice";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    api
      .get("/users/profile")
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => dispatch(clearUser()));
  }, []);

  if (loading) return <Loader/>;

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

        <Route path="/" element={user ? <Profile /> : <Navigate to="/login" />} />

        <Route
          path="/admin"
          element={
            user?.role === "ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
