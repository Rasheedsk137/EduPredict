import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            <div className="home-content">

                <h1>
                    EduPredict
                </h1>

                <h2>
                    AI-Powered Student Performance
                    Prediction System
                </h2>

                <p>
                    Predict student performance using
                    academic data and AI-powered analysis.
                </p>


                <div className="home-buttons">

                    <Link
                        to="/login"
                        className="home-button student-button"
                    >
                        Student Login
                    </Link>


                    <Link
                        to="/register"
                        className="home-button register-button"
                    >
                        Student Register
                    </Link>


                    <Link
                        to="/admin-login"
                        className="home-button admin-button"
                    >
                        Admin Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Home;