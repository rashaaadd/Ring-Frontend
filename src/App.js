import React,{ useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoutes";
import { fetchUserById } from "./redux/userSlice"
import ResetPass from "./pages/ResetPass/ResetPass";
import AdminPublicRoute from "./components/AdminPublicRoutes";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import AdminProtectedRoute from "./components/AdminProtectedRoutes";
import UsersList from "./pages/Admin/UsersList/UsersList";
import Chat from "./pages/Chat/Chat";
import Settings from "./pages/Settings/Settings";
import ReportedPosts from "./pages/Admin/ReportedPosts/ReportedPosts";

function App() {
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector(state => state.users);
  const { loading } = useSelector((state) => state.alerts);
  useEffect(() => {
    if(!user && token){
      fetchUserById(token);
    }
  }, [user,token])
  return (
    <BrowserRouter>
      <div className="App">
        {loading && (
          <div className="spinner-parent">
            <div className="spinner-border text-white" role="status"></div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "40%", left: "-8rem" }}></div>
        <Routes>
          <Route path="/" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/reset-password" element= {<ResetPass />} />
          <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
          <Route path="/admin" element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
          <Route path="/admin/home" element={<AdminProtectedRoute><AdminHome /></AdminProtectedRoute>} />
          <Route path="/admin/users" element={<AdminProtectedRoute><UsersList /></AdminProtectedRoute>} />
          <Route path="/admin/reported-posts" element={<AdminProtectedRoute><ReportedPosts /></AdminProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
