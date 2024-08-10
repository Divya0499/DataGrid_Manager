import React from 'react';
import { TableRow, TableCell } from '@mui/material';

interface TotalRowProps {
  totalAmount: number;
}

const TotalRow: React.FC<TotalRowProps> = ({ totalAmount }) => (
  <TableRow>
    <TableCell colSpan={3}>Total</TableCell>
    <TableCell>{totalAmount}</TableCell>
    <TableCell colSpan={4} />
  </TableRow>
);

export default TotalRow;
