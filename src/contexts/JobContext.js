// client/src/contexts/JobContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getJobs, createJob, updateJob, deleteJob, updateStatus } from '../api/jobApi';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // New state for pagination and totals
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [limitPerPage] = useState(6); // Define jobs per page, matching backend default

    // Memoized function to fetch jobs with dynamic parameters
    // This function will be called by DashboardPage with search, filter, sort, and page
    const fetchJobs = useCallback(async (page = 1, search = '', status = 'All', sort = 'newest') => {
        setLoading(true);
        setError(null);
        try {
            // Pass all parameters to the API call
            const res = await getJobs({ page, limit: limitPerPage, search, status, sort });
            setJobs(res.data.jobs);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
            setTotalJobs(res.data.totalJobs);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch jobs');
            console.error('Fetch jobs error:', err);
            // Optionally handle 401/403 errors (e.g., redirect to login)
        } finally {
            setLoading(false);
        }
    }, [limitPerPage]); // Dependency on limitPerPage

    // Initial fetch of jobs when the component mounts
    useEffect(() => {
        fetchJobs(currentPage); // Fetch the current page initially
    }, [fetchJobs, currentPage]); // Depend on fetchJobs

    // Functions for CRUD operations (updated to potentially refetch current page)
    const addJob = async (jobData) => {
        try {
            await createJob(jobData);
            // After adding, refetch the current page to update the list,
            // or consider navigating to the first page if logic dictates.
            fetchJobs(currentPage);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add job');
            console.error('Add job error:', err);
            return { success: false, error: err.response?.data?.message };
        }
    };

    const editJob = async (id, jobData) => {
        try {
            await updateJob(id, jobData);
            // After editing, refetch the current page
            fetchJobs(currentPage);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update job');
            console.error('Update job error:', err);
            return { success: false, error: err.response?.data?.message };
        }
    };


    const removeJob = async (id) => {
        try {
            await deleteJob(id);
            // After deleting, refetch the current page.
            // Consider logic for if the last item on a page was deleted (might need to go to prev page)
            fetchJobs(currentPage);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete job');
            console.error('Delete job error:', err);
            return { success: false, error: err.response?.data?.message };
        }
    };
    const updateJobStatus = async (id, status) => {
        try {
            await updateStatus(id, { status }); // ✅ Pass the status in the body correctly
            await fetchJobs(currentPage);       // Refresh job list
            return { success: true };
        } catch (error) {
            console.error('Update status error:', error.message);
            setError(error.message || 'Failed to update job status');
            return { success: false, error: error.message };
        }
    };


    return (
        <JobContext.Provider
            value={{
                jobs,
                loading,
                error,
                currentPage,
                totalPages,
                totalJobs,
                limitPerPage,
                fetchJobs, // Expose fetchJobs for DashboardPage to call with parameters
                addJob,
                editJob,
                removeJob,
                updateJobStatus
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);