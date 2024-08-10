import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete, ContentCopy, CheckCircle } from '@mui/icons-material';
import { DonationEntry } from '../types/formTypes';

interface TableRowsProps {
  data: DonationEntry[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (text: string, id: string) => void;
  copiedRow: string | null;
}

const TableRows: React.FC<TableRowsProps> = ({ data, onEdit, onDelete, onCopy, copiedRow }) => (
  <>
    {data.map(entry => (
      <TableRow key={entry.id} className="table-row">
        <TableCell>{entry.fullName}</TableCell>
        <TableCell>{entry.email}</TableCell>
        <TableCell>{entry.phoneNumber}</TableCell>
        <TableCell>{entry.amount}</TableCell>
        <TableCell>{entry.donationType}</TableCell>
        <TableCell>{entry.paymentMethod}</TableCell>
        <TableCell>{entry.specialInstructions}</TableCell>
        <TableCell className="action-buttons">
          <IconButton 
            className="icon-button" 
            onClick={() => onCopy(JSON.stringify(entry), entry?.id)}
          >
            {copiedRow === entry?.id ? <CheckCircle /> : <ContentCopy />} 
          </IconButton>
          <IconButton className="icon-button" onClick={() => onEdit(entry.id)}>
            <Edit />
          </IconButton>
          <IconButton className="icon-button" onClick={() => onDelete(entry.id)}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default TableRows;
