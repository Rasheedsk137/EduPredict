import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleAdminLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );


            const user = response.data.user;


            // Make sure this is actually an admin account

            if (user.role !== "admin") {

                setError(
                    "This account does not have administrator access."
                );

                return;
            }


            // Save login information

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            // Go to admin dashboard

            navigate("/admin-dashboard");


        } catch (error) {

            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Invalid admin email or password"
                );

            } else {

                setError(
                    "Unable to connect to server. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="login-page">

            <div className="login-card">


                {/* BRAND */}

                <div className="brand-section">

                    <div className="brand-icon">
                        🎓
                    </div>

                    <div>

                        <h1>
                            EduPredict
                        </h1>

                        <p>
                            AI-POWERED PERFORMANCE PREDICTOR
                        </p>

                    </div>

                </div>


                {/* TITLE */}

                <h2>
                    Admin Login
                </h2>

                <p className="login-subtitle">
                    Sign in to access the administrator dashboard
                </p>


                {/* ERROR */}

                {error && (

                    <p
                        style={{
                            color: "#dc2626",
                            background: "#fee2e2",
                            padding: "10px",
                            borderRadius: "8px",
                            textAlign: "center",
                            marginBottom: "15px"
                        }}
                    >
                        {error}
                    </p>

                )}


                {/* FORM */}

                <form
                    onSubmit={handleAdminLogin}
                    autoComplete="off"
                >

                    <label>
                        Admin Email
                        <span>*</span>
                    </label>

                    <input
                        type="email"
                        name="admin-email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        autoComplete="off"
                        required
                    />


                    <label>
                        Password
                        <span>*</span>
                    </label>

                    <input
                        type="password"
                        name="admin-password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        autoComplete="new-password"
                        required
                    />


                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing In..."
                            : "Admin Sign In"}
                    </button>

                </form>


                {/* BACK TO STUDENT LOGIN */}

                <p className="register-text">

                    Student?

                    {" "}

                    <Link to="/login">
                        Student Login
                    </Link>

                </p>


                <p className="register-text">

                    <Link to="/">
                        ← Back to Home
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default AdminLogin;