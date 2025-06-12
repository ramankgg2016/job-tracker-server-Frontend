// client/src/components/JobApplicationItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';

const JobApplicationItem = ({ job }) => {
    const { removeJob } = useJobs();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            const result = await removeJob(job._id);
            if (!result.success) {
                alert(result.error || 'Failed to delete job application.');
            }
        }
    };

    // Format date for display
    const formattedDate = new Date(job.dateApplied).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="job-item">
            <h3>{job.company}</h3>
            <p><strong>Role:</strong> {job.role}</p>
            <p><strong>Applied:</strong> {formattedDate}</p>
            <p>
                <strong>Status:</strong>
                <span className={`status status-${job.status.replace(/\s/g, '')}`}>
                    {job.status}
                </span>
            </p>
            {job.notes && <p><strong>Notes:</strong> {job.notes}</p>}
            <div className="job-actions">
                <Link to={`/edit-job/${job._id}`} className="btn btn-edit">Edit</Link>
                <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default JobApplicationItem;