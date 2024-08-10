import React from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';
import { FieldProps } from 'formik';
import { getHelperText } from '../utils/function';

const CustomSelect: React.FC<FieldProps & { label: string; children: React.ReactNode }> = ({ field, form, label, children, ...props }) => (
  <FormControl variant="outlined" fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      {...field}
      {...props}
      label={label}
      error={Boolean(form.touched[field.name] && form.errors[field.name])}
    >
      {children}
    </Select>
    {form.touched[field.name] && form.errors[field.name] && (
      <div className="errorText">{ getHelperText(form.errors, field.name)}</div>
    )}
  </FormControl>
);

export default CustomSelect;
