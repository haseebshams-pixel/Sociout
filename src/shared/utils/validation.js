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

export {
  LoginVS,
  RegistrationVS,
  ChangePasswordVS,
  EditProfileVS,
  ResetPasswordVS,
};
