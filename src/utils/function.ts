// validationSchema.ts
import * as Yup from "yup";

export const validationSchema = Yup.object({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .required("Required"),
  amount: Yup.number()
    .required("Required")
    .positive("Must be a positive number"),
  donationType: Yup.string().required("Required"),
  paymentMethod: Yup.string().required("Required"),
  specialInstructions: Yup.string().required("Required"),
  newsletter: Yup.bool(),
});

export // Helper function to format the error message
const getHelperText = (errors: any, fieldName: string): string | undefined => {
  const error = errors[fieldName];
  
  if (Array.isArray(error)) {
    return error.join(', '); // Join array of errors into a single string
  }
  
  if (typeof error === 'string') {
    return error;
  }

  // If error is an object with a message property
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message?: string }).message;
  }
  
  return undefined;
};