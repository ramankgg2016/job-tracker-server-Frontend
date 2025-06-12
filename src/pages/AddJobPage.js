// client/src/pages/AddJobPage.js
import React, { useState } from 'react';
import JobApplicationForm from '../components/JobApplicationForm';
import { useJobs } from '../contexts/JobContext';
import { useNavigate } from 'react-router-dom';

const AddJobPage = () => {
    const { addJob, error } = useJobs();
    const navigate = useNavigate();
    const [formStatus, setFormStatus] = useState({ success: false, message: '' });

    const handleSubmit = async (jobData) => {
        const result = await addJob(jobData);
        if (result.success) {
            setFormStatus({ success: true, message: 'Job application added successfully!' });
            setTimeout(() => {
                navigate('/dashboard'); // Redirect after success
            }, 1500);
        } else {
            setFormStatus({ success: false, message: result.error || 'Failed to add job application.' });
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Job Application</h2>
            {formStatus.message && (
                <div className={`alert ${formStatus.success ? 'alert-success' : 'alert-danger'}`}>
                    {formStatus.message}
                </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            <JobApplicationForm onSubmit={handleSubmit} buttonText="Add Application" />
        </div>
    );
};

export default AddJobPage;