import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { FieldProps } from 'formik';

const CustomRadioGroup: React.FC<FieldProps & { children: React.ReactNode }> = ({ field, form, children, ...props }) => (
  <FormControl component="fieldset" fullWidth>
    <RadioGroup {...field} {...props} style={{ display: 'block' }}>
      {children}
    </RadioGroup>
    {form.touched[field.name] && form.errors[field.name] && (
      <div className="errorText">{form.errors[field.name]}</div>
    )}
  </FormControl>
);

export default CustomRadioGroup;
