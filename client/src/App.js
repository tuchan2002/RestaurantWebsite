import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import Auth from "./views/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import DetailRestaurant from "./views/DetailRestaurant";
import UserManagement from "./views/UserManagement";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Auth authRoute="login" />} />
                <Route
                    path="/register"
                    element={<Auth authRoute="register" />}
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/restaurant/:id"
                    element={
                        <ProtectedRoute>
                            <DetailRestaurant />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/"
                    element={
                        <ProtectedRoute>
                            <AdminRoute>
                                <UserManagement />
                            </AdminRoute>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
