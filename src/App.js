// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage'; // New route for editing
import './index.css'; // Import global styles 

function App() {
    return (
        <Router>
            <AuthProvider>
                <JobProvider> {/* JobProvider needs AuthContext, so wrap it */}
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/" element={<LoginPage />} /> 
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <DashboardPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/add-job"
                                element={
                                    <PrivateRoute>
                                        <AddJobPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/edit-job/:id" 
                                element={
                                    <PrivateRoute>
                                        <EditJobPage />
                                    </PrivateRoute>
                                }
                            />
                            {/* Add a catch-all route for 404 or redirect */}
                            <Route path="*" element={<p className="container">Page Not Found</p>} />
                        </Routes>
                    </main>
                </JobProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;