import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

const TableHeaders: React.FC = () => (
  <TableHead className="table-head">
    <TableRow>
      <TableCell className="table-cell">Full Name</TableCell>
      <TableCell className="table-cell">Email</TableCell>
      <TableCell className="table-cell">Phone Number</TableCell>
      <TableCell className="table-cell">Amount</TableCell>
      <TableCell className="table-cell">Donation Type</TableCell>
      <TableCell className="table-cell">Payment Method</TableCell>
      <TableCell className="table-cell">Special Instructions</TableCell>
      <TableCell className="table-cell">Actions</TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeaders;
