// client/src/pages/DashboardPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useJobs } from '../contexts/JobContext'; // Use the JobContext
import JobApplicationItem from '../components/JobApplicationItem';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    // Destructure state and functions from JobContext
    const { jobs, loading, error, currentPage, totalPages, totalJobs, fetchJobs } = useJobs();

    // Local state for search, filter, and sort controls
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest'); // Options: 'newest', 'oldest', 'companyAsc', 'companyDesc'

    // Memoized function to fetch jobs with current parameters
    // This useCallback prevents 'fetchJobs' from being recreated unnecessarily,
    // which is important for the debounce useEffect's dependency array.
    const memoizedFetchJobs = useCallback((page, search, status, sort) => {
        fetchJobs(page, search, status, sort);
    }, [fetchJobs]); // Dependency on fetchJobs from context

    // Effect to trigger fetching jobs when search query, filter status, or sort order changes
    useEffect(() => {
        // Define the debounce handler
        const handler = setTimeout(() => {
            // This function will be called after the user stops typing for 500ms
            // Or immediately for filter/sort changes.
            memoizedFetchJobs(1, searchQuery, filterStatus, sortOrder); // Always reset to page 1
        }, 500); // Debounce delay: 500 milliseconds

        // Cleanup function: This runs if the dependencies change *before* the timeout
        // This clears the previous timeout, ensuring that fetchJobs is only called
        // after the user has truly stopped typing for the delay period.
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, filterStatus, sortOrder, memoizedFetchJobs]); // Dependencies for this useEffect

    // Handler for pagination button clicks
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            memoizedFetchJobs(page, searchQuery, filterStatus, sortOrder);
        }
    };

    if (loading) return <div className="container">Loading job applications...</div>;
    if (error) return <div className="container alert alert-danger">{error}</div>;

    return (
        <div className="container">
            <h2>Dashboard</h2>
            {/* Dashboard Summary Section */}
            <div className="dashboard-summary">
                <p>Total Applications: <strong>{totalJobs}</strong></p>
                <p>Current Page: {currentPage} of {totalPages}</p>
            </div>

            {/* Filter, Search, and Sort Controls */}
            <div className="filter-search-container">
                <input
                    type="text"
                    placeholder="Search by company or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer Received">Offer Received</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="newest">Newest Date</option>
                    <option value="oldest">Oldest Date</option>
                    <option value="companyAsc">Company (A-Z)</option>
                    <option value="companyDesc">Company (Z-A)</option>
                </select>
                <Link to="/add-job" className="btn">Add New Application</Link>
            </div>

            {/* Conditional rendering for job list or "no applications" message */}
            {jobs.length === 0 && totalJobs === 0 ? (
                <p>No job applications found. Start by adding one!</p>
            ) : (jobs.length === 0 && totalJobs > 0) ? (
                <p>No job applications found matching your current search/filter criteria on this page.</p>
            ) : (
                <>
                    <div className="job-list">
                        {/* Render job items (jobs array from context is already paginated/filtered/sorted) */}
                        {jobs.map((job) => (
                            <JobApplicationItem key={job._id} job={job} />
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            className="btn"
                        >
                            Previous
                        </button>
                        {/* Render pagination buttons for each page */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`btn ${currentPage === page ? 'active-page' : ''}`}
                                disabled={loading}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || loading}
                            className="btn"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardPage;