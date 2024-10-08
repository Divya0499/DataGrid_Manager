import React from 'react';
import { TextField } from '@mui/material';
import { FieldProps } from 'formik';
import { getHelperText } from '../utils/function';



const CustomTextField: React.FC<FieldProps & { label: string; type?: string }> = ({
  field,
  form,
  label,
  type = 'text',
  ...props
}) => (
  <TextField
    {...field}
    {...props}
    label={label}
    type={type}
    variant="outlined"
    fullWidth
    error={Boolean(form.touched[field.name] && form.errors[field.name])}
    helperText={form.touched[field.name] ? getHelperText(form.errors, field.name) : undefined}
  />
);

export default CustomTextField;
