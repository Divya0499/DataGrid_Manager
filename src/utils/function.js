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
