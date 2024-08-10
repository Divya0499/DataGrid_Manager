import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { validationSchema } from "../utils/function.js";
import {
  Checkbox,
  FormControlLabel,
  Radio,
  TextareaAutosize,
  MenuItem,
} from "@mui/material";
import { FormValues } from "../types/formTypes";
import CustomTextField from "./CustomTextField.js";
import CustomSelect from "./CustomSelect.js";
import CustomRadioGroup from "./CustomRadioGroup.js";

interface DonationFormProps {
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
}

// Form component
const DonationForm: React.FC<DonationFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    onSubmit(values);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  const defaultInitialValues: FormValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    amount: 0,
    donationType: "",
    paymentMethod: "",
    specialInstructions: "",
    newsletter: false,
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues || defaultInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="formContainer">
          {/* Full Name and Email Address Fields */}
          <div className="formField">
            <Field
              name="fullName"
              component={CustomTextField}
              label="Full Name"
            />
            <Field
              name="email"
              component={CustomTextField}
              label="Email Address"
              type="email"
            />
          </div>

          {/* Phone Number and Amount Fields */}
          <div className="formField">
            <Field
              name="phoneNumber"
              component={CustomTextField}
              label="Phone Number"
            />
            <Field
              name="amount"
              component={CustomTextField}
              label="Amount"
              type="number"
            />
          </div>

          {/* Payment Method Select Field */}
          <div className="formField">
            <Field
              name="paymentMethod"
              component={CustomSelect}
              label="Payment Method"
            >
              <MenuItem value="creditCard">Credit Card</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
            </Field>
          </div>

          {/* Donation Type Radio Group */}
          <div className="formField">
            <Field name="donationType" component={CustomRadioGroup}>
              <FormControlLabel
                value="one-time"
                control={<Radio />}
                label="One-Time Donation"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio />}
                label="Monthly Subscription"
              />
              <FormControlLabel
                value="annual"
                control={<Radio />}
                label="Annual Subscription"
              />
            </Field>
          </div>

          {/* Special Instructions Textarea */}
          <div className="formField">
            <Field name="specialInstructions">
              {({ field, form }: any) => (
                <TextareaAutosize
                  {...field}
                  placeholder="Special Instructions"
                  className="textarea"
                />
              )}
            </Field>
            {formikProps.touched.specialInstructions &&
              formikProps.errors.specialInstructions && (
                <div className="errorText">
                  {formikProps.errors.specialInstructions}
                </div>
              )}
          </div>

          {/* Newsletter Checkbox */}
          <div className="formField">
            <FormControlLabel
              control={
                <Checkbox
                  name="newsletter"
                  color="primary"
                  checked={formikProps.values.newsletter}
                  onChange={formikProps.handleChange}
                />
              }
              label="Subscribe to our newsletter for updates and special offers"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submitButton">
            {formikProps.values?.id ? "Update" : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DonationForm;
