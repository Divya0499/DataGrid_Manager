import React from 'react';
import { FormControl, RadioGroup } from '@mui/material';
import { FieldProps } from 'formik';
import { getHelperText } from '../utils/function';

const CustomRadioGroup: React.FC<FieldProps & { children: React.ReactNode }> = ({ field, form, children, ...props }) => (
  <FormControl component="fieldset" fullWidth>
    <RadioGroup {...field} {...props} style={{ display: 'block' }}>
      {children}
    </RadioGroup>
    {form.touched[field.name] && form.errors[field.name] && (
      <div className="errorText">{getHelperText(form.errors, field.name)}</div>
    )}
  </FormControl>
);

export default CustomRadioGroup;
