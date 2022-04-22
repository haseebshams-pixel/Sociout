import * as yup from "yup";

const LoginVS = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid Email")
    .label("email"),
  password: yup.string().required("Password is Required").label("password"),
});

const RegistrationVS = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid Email")
    .label("email"),
  firstName: yup.string().required("FirstName is Required").label("firstName"),
  lastName: yup.string().required("LastName is Required").label("lastName"),
  phoneNumber: yup
    .string()
    .required("Phone Number is Required")
    .label("phonenumber"),
  password: yup.string().required("Password is Required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  DOB: yup.string().required("Date of Birth is Required").label("DOB"),
});

const ChangePasswordVS = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Old Password is Required")
    .label("oldPassword"),
  newPassword: yup
    .string()
    .required("New Password is Required")
    .label("newPassword"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const EditProfileVS = yup.object().shape({
  firstname: yup.string().required("Firstname is Required").label("firstname"),
  lastname: yup.string().required("Lastname is Required").label("lastname"),
  phonenumber: yup
    .string()
    .required("Phone Number is Required")
    .label("phonenumber"),
  DOB: yup.string().required("Date of Birth is Required").label("DOB"),
});

const ResetPasswordVS = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid Email")
    .label("email"),
});

const CreateJobVS = yup.object().shape({
  jobTitle: yup.string().required("Job Title is Required").label("jobTitle"),
  companyName: yup
    .string()
    .required("Company Name is Required")
    .label("companyName"),
  employmentType: yup
    .string()
    .required("Employment Type is Required")
    .label("employmentType"),
  location: yup.string().required("Location is Required").label("location"),
  contact: yup
    .string()
    .required("Contact Email is Required")
    .email("Invalid Email")
    .label("contact"),
  description: yup
    .string()
    .required("Description is Required")
    .label("description"),
});

export {
  LoginVS,
  RegistrationVS,
  ChangePasswordVS,
  EditProfileVS,
  ResetPasswordVS,
  CreateJobVS,
};
