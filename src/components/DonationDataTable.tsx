import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import TableHeaders from "./TableHeaders";
import TableRows from "./TableRows";
import TotalRow from "./TableRow";
import SearchAndActions from "./SearchAndActions";
import { FormValues } from "../types/formTypes";
import { toast } from "react-toastify";

interface DonationDataTableProps {
  data: FormValues[]; // Array of donation entries to display
  setData: React.Dispatch<React.SetStateAction<FormValues[]>>; // Function to update the data
  onEdit: (id: string) => void; // Function to handle editing an entry
  onAdd: () => void; // Function to handle adding a new entry
}

const DonationDataTable: React.FC<DonationDataTableProps> = ({
  data,
  setData,
  onEdit,
  onAdd,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [copiedRow, setCopiedRow] = useState<string | null>(null); // State to hold the ID of the copied row
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending"); // State to control sort direction
  const [page, setPage] = useState(0); // State to control the current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // State to control the number of rows per page

  // Function to handle copying text to the clipboard
  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text); // Copy text to clipboard
      setCopiedRow(id); // Set the ID of the copied row
      setTimeout(() => setCopiedRow(null), 4000); // Clear the copied row ID after 4 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err); // Log error if copying fails
    }
  }, []);

  // Function to handle deleting a row by ID
  const handleDelete = useCallback(
    (id: string) => {
      setData((prevData) => prevData.filter((entry) => entry.id !== id)); // Filter out the deleted entry
      toast.success("Data deleted successfully");

    },
    [setData]
  );

  // Function to toggle sorting direction
  const handleSort = useCallback(() => {
    setSortDirection((prevDirection) =>
      prevDirection === "ascending" ? "descending" : "ascending"
    ); // Toggle sorting direction
    toast.success(`Data sorted in ${sortDirection} order`);

  }, []);

  // Memoized sorted data based on sort direction
  const sortedData = useMemo(
    () =>
      [...data].sort(
        (a, b) =>
          sortDirection === "ascending"
            ? a.fullName.localeCompare(b.fullName) // Sort in ascending order
            : b.fullName.localeCompare(a.fullName) // Sort in descending order
      ),
    [data, sortDirection]
  );

  // Memoized filtered data based on search term
  const filteredData = useMemo(
    () =>
      sortedData.filter((entry) =>
        Object.values(entry).some(
          (value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase()) // Filter data by search term
        )
      ),
    [sortedData, searchTerm]
  );

  // Memoized paginated data based on current page and rows per page
  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), // Get the data for the current page
    [filteredData, page, rowsPerPage]
  );

  // Memoized total amount calculation
  const totalAmount = useMemo(
    () => paginatedData.reduce((sum, entry) => sum + (entry.amount || 0), 0), // Sum up the amounts for the paginated data
    [paginatedData]
  );

  useEffect(() => {
    // Reset page to 0 when search term changes
    setPage(0);
  }, [searchTerm]);

  useEffect(() => {
    // Ensure the current page is within the valid range
    if (page >= Math.ceil(filteredData.length / rowsPerPage)) {
      setPage(0);
    }
  }, [filteredData.length, page, rowsPerPage]);
  return (
    <div className="table-wrapper">
      <TableContainer component={Paper} className="table-container">
        {/* Search and actions component */}
        <SearchAndActions
          searchTerm={searchTerm}
          sortDirection={sortDirection}
          onSearchChange={(e) => setSearchTerm(e.target.value)} // Update search term
          onSort={handleSort} // Handle sorting
          onAdd={onAdd} // Handle adding a new entry
        />
        <Table className="table">
          {/* Table headers */}
          <TableHeaders />
          <TableBody>
            {/* Table rows */}
            <TableRows
              data={paginatedData}
              onEdit={onEdit} // Handle editing
              onDelete={handleDelete} // Handle deleting
              onCopy={handleCopy} // Handle copying
              copiedRow={copiedRow} // ID of the copied row to display feedback
            />
            {/* Total row */}
            <TotalRow totalAmount={totalAmount} />
          </TableBody>
        </Table>
        {/* Table pagination */}
        <TablePagination
          className="pagination"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length} // Total number of entries
          rowsPerPage={rowsPerPage} // Number of rows per page
          page={page} // Current page
          onPageChange={(__, newPage) => setPage(newPage)} // Change page
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
            setPage(0); // Reset to first page when rows per page changes
          }}
        />
      </TableContainer>
    </div>
  );
};

export default DonationDataTable;
