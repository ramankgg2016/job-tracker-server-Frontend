import { useEffect, useState } from "react";
import { useJobs } from '../contexts/JobContext';

const JobStatusUpdate = ({ job }) => {
    const { updateJobStatus } = useJobs();

    const inputStatus = ['Applied', 'Interview Scheduled', 'Rejected', 'Offer Received'];

    // Remove the current status from the dropdown options
    const availableStatuses = inputStatus.filter(statusKey => statusKey !== job.status);

    const [status, setStatus] = useState('');

    // Update the backend only when a valid new status is selected
    useEffect(() => {
        if (status && status !== job.status) {
            updateJobStatus(job._id, status);
        }
    }, [status, job._id, job.status, updateJobStatus]);

    return (
        <div className="form-group">
            <label htmlFor={`status-${job._id}`}>Update Status:</label>
            <select
                id={`status-${job._id}`}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                <option value="">-- Select New Status --</option>
                {availableStatuses.map((statusKey) => (
                    <option key={statusKey} value={statusKey}>
                        {statusKey}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default JobStatusUpdate;
