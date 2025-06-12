// client/src/components/JobApplicationForm.js
import React, { useState, useEffect } from 'react';

const JobApplicationForm = ({ initialData = {}, onSubmit, buttonText, formError }) => {
    const [company, setCompany] = useState(initialData.company || '');
    const [role, setRole] = useState(initialData.role || '');
    const [dateApplied, setDateApplied] = useState(
        initialData.dateApplied ? new Date(initialData.dateApplied).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    );
    const [status, setStatus] = useState(initialData.status || 'Applied');
    const [notes, setNotes] = useState(initialData.notes || '');

    // Update form if initialData changes (e.g., for editing)
    useEffect(() => {
        if (initialData._id) {
            setCompany(initialData.company || '');
            setRole(initialData.role || '');
            setDateApplied(initialData.dateApplied ? new Date(initialData.dateApplied).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
            setStatus(initialData.status || 'Applied');
            setNotes(initialData.notes || '');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ company, role, dateApplied, status, notes });
    };

    return (
        <form onSubmit={handleSubmit}>
            {formError && <div className="alert alert-danger">{formError}</div>}
            <div className="form-group">
                <label htmlFor="company">Company:</label>
                <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="dateApplied">Date Applied:</label>
                <input
                    type="date"
                    id="dateApplied"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer Received">Offer Received</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="notes">Notes (optional):</label>
                <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className="btn">
                {buttonText}
            </button>
        </form>
    );
};

export default JobApplicationForm;