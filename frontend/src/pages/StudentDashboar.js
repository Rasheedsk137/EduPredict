import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {
        name: "Student"
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="dashboard-page">

            {/* Navbar */}
            <nav className="dashboard-navbar">
                <div className="brand">
                    EduPredict
                </div>

                <div className="nav-right">
                    <span>Welcome, {user.name}</span>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="dashboard-container">

                <div className="dashboard-header">
                    <h1>Student Dashboard</h1>
                    <p>
                        Track your academic performance and AI-powered
                        predictions.
                    </p>
                </div>

                {/* Performance Cards */}
                <div className="performance-cards">

                    <div className="performance-card">
                        <h3>Overall Performance</h3>
                        <div className="score">78%</div>
                        <p>Good Performance</p>
                    </div>

                    <div className="performance-card">
                        <h3>Attendance</h3>
                        <div className="score">85%</div>
                        <p>Excellent</p>
                    </div>

                    <div className="performance-card">
                        <h3>Internal Marks</h3>
                        <div className="score">76%</div>
                        <p>Good</p>
                    </div>

                    <div className="performance-card">
                        <h3>AI Prediction</h3>
                        <div className="score">Good</div>
                        <p>Positive Performance</p>
                    </div>

                </div>

                {/* AI Prediction */}
                <div className="dashboard-section">

                    <h2>AI Performance Prediction</h2>

                    <div className="prediction-box">

                        <div>
                            <h3>Predicted Score</h3>
                            <div className="prediction-score">
                                78%
                            </div>
                        </div>

                        <div className="prediction-content">
                            <h3>Prediction Result</h3>

                            <p>
                                Based on your attendance, internal marks,
                                previous academic performance and assignment
                                scores, the AI predicts a positive academic
                                performance.
                            </p>

                            <strong>
                                Performance Level: Good
                            </strong>
                        </div>

                    </div>

                </div>

                {/* Academic Performance */}
                <div className="dashboard-section">

                    <h2>Academic Performance</h2>

                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Internal Marks</th>
                                    <th>Attendance</th>
                                    <th>Assignment</th>
                                    <th>Performance</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>Data Structures</td>
                                    <td>82%</td>
                                    <td>88%</td>
                                    <td>85%</td>
                                    <td>Good</td>
                                </tr>

                                <tr>
                                    <td>Database Management</td>
                                    <td>76%</td>
                                    <td>84%</td>
                                    <td>78%</td>
                                    <td>Good</td>
                                </tr>

                                <tr>
                                    <td>Artificial Intelligence</td>
                                    <td>80%</td>
                                    <td>86%</td>
                                    <td>82%</td>
                                    <td>Excellent</td>
                                </tr>

                                <tr>
                                    <td>Web Technologies</td>
                                    <td>74%</td>
                                    <td>82%</td>
                                    <td>79%</td>
                                    <td>Good</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* AI Recommendations */}
                <div className="dashboard-section">

                    <h2>AI Recommendations</h2>

                    <div className="recommendations">

                        <div className="recommendation-card">
                            <h3>Improve Study Time</h3>
                            <p>
                                Increase your daily study time to improve
                                your predicted academic score.
                            </p>
                        </div>

                        <div className="recommendation-card">
                            <h3>Maintain Attendance</h3>
                            <p>
                                Your attendance is good. Continue maintaining
                                an attendance level above 80%.
                            </p>
                        </div>

                        <div className="recommendation-card">
                            <h3>Complete Assignments</h3>
                            <p>
                                Completing assignments on time can improve
                                your overall performance.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default StudentDashboard;