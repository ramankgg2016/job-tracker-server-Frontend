// client/src/pages/EditJobPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobApplicationForm from '../components/JobApplicationForm';
import { useJobs } from '../contexts/JobContext';
import { getJobById } from '../api/jobApi'; // Need to fetch single job

const EditJobPage = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const { editJob, error } = useJobs(); // Use editJob from context
    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [formStatus, setFormStatus] = useState({ success: false, message: '' });

    useEffect(() => {
        const fetchCurrentJob = async () => {
            try {
                const res = await getJobById(id);
                setJobData(res.data);
                setLoading(false);
            } catch (err) {
                setFetchError(err.response?.data?.message || 'Failed to load job data');
                setLoading(false);
            }
        };
        fetchCurrentJob();
    }, [id]);

    const handleSubmit = async (updatedData) => {
        const result = await editJob(id, updatedData);
        if (result.success) {
            setFormStatus({ success: true, message: 'Job application updated successfully!' });
            setTimeout(() => {
                navigate('/dashboard'); // Redirect after success
            }, 1500);
        } else {
            setFormStatus({ success: false, message: result.error || 'Failed to update job application.' });
        }
    };

    if (loading) return <div className="container">Loading job details...</div>;
    if (fetchError) return <div className="container alert alert-danger">{fetchError}</div>;
    if (!jobData) return <div className="container alert alert-danger">Job application not found.</div>;

    return (
        <div className="form-container">
            <h2>Edit Job Application</h2>
            {formStatus.message && (
                <div className={`alert ${formStatus.success ? 'alert-success' : 'alert-danger'}`}>
                    {formStatus.message}
                </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>} {/* General context error */}
            <JobApplicationForm
                initialData={jobData}
                onSubmit={handleSubmit}
                buttonText="Update Application"
            />
        </div>
    );
};

export default EditJobPage;