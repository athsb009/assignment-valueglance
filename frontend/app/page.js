"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";

export default function Home() {
  // States to hold the filtered data returned from the backend
  const [data, setData] = useState([]);

  // States to manage the active filters applied to the data
  const [filters, setFilters] = useState({
    start_date: "", // Start date for filtering
    end_date: "",   // End date for filtering
    min_revenue: "", // Minimum revenue filter
    max_revenue: "", // Maximum revenue filter
    min_net_income: "", // Minimum net income filter
    max_net_income: "", // Maximum net income filter
    sort_by: "date", // Default sorting is by 'date'
    order: "asc",    // Default sorting order is 'ascending'
  });

  // States to temporarily store unsaved filter changes
  const [pendingFilters, setPendingFilters] = useState({ ...filters });

  // States to track the loading state while fetching data
  const [loading, setLoading] = useState(false);

  // State to capture and display error messages, if any
  const [error, setError] = useState(null);

  // Function to fetch data from the backend
  const fetchData = async () => {
    setLoading(true); 
    setError(null);  

    try {
      // Removes any empty filter parameters before sending the request
      const filteredParams = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      // Converts the filters into a query string for the backend
      const query = new URLSearchParams(filteredParams).toString();

      // Makes a GET request to the backend with the filters
      const response = await axios.get(`https://backend-zctx.onrender.com/filter-data?${query}`);
      
      // Sets the fetched data into the state
      setData(response.data.data || []);
    } catch (err) {
      // Handles errors and set the error state
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  // Function to apply the pending filters and update the main filters state
  const applyFilters = () => {
    setFilters({ ...pendingFilters }); 
  };

  // Function to handle changes in filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setPendingFilters({ ...pendingFilters, [name]: value }); 
  };

  // Effect to fetch data whenever the filters state changes
  useEffect(() => {
    fetchData(); 
  }, [filters]);

  return (
    // Main container with a dark background for the entire app
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        
        {/* App Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          Financial Data Filtering App
        </h1>

        {/* Filters Section */}
        <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Date Filters */}
            <input
              type="date"
              name="start_date"
              value={pendingFilters.start_date}
              onChange={handleFilterChange}
              className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Start Date"
            />
            <input
              type="date"
              name="end_date"
              value={pendingFilters.end_date}
              onChange={handleFilterChange}
              className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="End Date"
            />

            {/* Revenue Filters */}
            <input
              type="number"
              name="min_revenue"
              value={pendingFilters.min_revenue}
              onChange={handleFilterChange}
              className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Min Revenue"
            />
            <input
              type="number"
              name="max_revenue"
              value={pendingFilters.max_revenue}
              onChange={handleFilterChange}
              className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Max Revenue"
            />

            {/* Net Income Filters */}
            <input
              type="number"
              name="min_net_income"
              value={pendingFilters.min_net_income}
              onChange={handleFilterChange}
              className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Min Net Income"
            />
            <input
              type="number"
              name="max_net_income"
              value={pendingFilters.max_net_income}
              onChange={handleFilterChange}
              className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Max Net Income"
            />

            {/* Sort By Filter */}
            <select
              name="sort_by"
              value={pendingFilters.sort_by}
              onChange={handleFilterChange}
              className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="date">Date</option>
              <option value="revenue">Revenue</option>
              <option value="netIncome">Net Income</option>
            </select>

            {/* Order Filter */}
            <select
              name="order"
              value={pendingFilters.order}
              onChange={handleFilterChange}
              className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={applyFilters}
              className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && <p className="text-gray-400 text-center">Loading...</p>}

        {/* Error State */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Data Table */}
        {!loading && !error && <Table data={data} />}
      </div>

      <p className="text-center text-gray-500 mt-8">
        Let's Grow ValueGlance Together and Take It To the Next Height
      </p>
    </div>
  );
}
