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
  firstName: yup.string().required("Firstname is Required").label("firstName"),
  lastName: yup.string().required("Lastname is Required").label("lastName"),
  phoneNumber: yup
    .string()
    .required("Phone Number is Required")
    .label("phonenumber"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  DOB: yup.string().required("Date of Birth is Required").label("DOB"),
});

// const EditBookVS = yup.object().shape({
//   name: yup.string().required("Book Title Required").label("name"),
//   writer: yup.string().required("Writer's Name Required").label("writer"),
//   price: yup.string().required("Price Required").label("price"),
//   description: yup
//     .string()
//     .required("Description Required")
//     .label("description"),
// });

// const EditProfileVS = yup.object().shape({
//   firstname: yup.string().required("Firstname is Required").label("firstname"),
//   lastname: yup.string().required("Lastname is Required").label("lastname"),
//   bio: yup.string().required("Bio is Required").label("bio"),
// });
// const SUPPORTED_FORMATS = [
//   "image/jpg",
//   "image/jpeg",
//   "image/png",
//   "video/mp4",
//   "audio/mp3",
//   "video/mov",
//   "video/wmv",
//   "video/avi",
//   "audio/mpeg",
// ];
// const publishVS = yup.object().shape({
//   file: yup.mixed().required("Book's File is Required").label("File"),
//   coverImage: yup
//     .mixed()
//     .required("Cover Image is Required")
//     // .test("fileFormat", " [Incorrect file tye]", function (value) {
//     //   return SUPPORTED_FORMATS.includes(value?.type);
//     // })
//     // .test("fileSize", "File Size is too large", (value) => {
//     //   const sizeInBytes = 500000; //0.5MB
//     //   return value?.size <= sizeInBytes;
//     // })
//     .label("coverImage"),
//   name: yup.string().required("Book's Name is Required").label("name"),
//   writer: yup.string().required("Writer's Name is Required").label("writer"),
//   description: yup
//     .string()
//     .required("Book's Description is Required")
//     .label("description"),
//   edition: yup.string().required("Book's Edition is Required").label("edition"),
//   numberOfCopies: yup
//     .string()
//     .required("Number of Book's Copies is Required")
//     .label("numberOfCopies"),
//   price: yup.string().required("Book's Price is Required").label("price"),
//   type: yup.string().required("Book's Type is Required").label("type"),
// });
// const imageWidthAndHeight = (provideFile) => {
//   // take the given file (which should be an image) and return the width and height
//   const imgDimensions = { width: null, height: null };

//   return new Promise((resolve) => {
//     const reader = new FileReader();

//     reader.readAsDataURL(provideFile);
//     reader.onload = function () {
//       const img = new Image();
//       img.src = reader.result;

//       img.onload = function () {
//         imgDimensions.width = img.width;
//         imgDimensions.height = img.height;

//         resolve(imgDimensions);
//       };
//     };
//   });
// };
// const imageDimensionCheck = yup.addMethod(
//   yup.mixed,
//   "imageDimensionCheck",
//   function (message, requiredWidth, requiredHeight) {
//     return this.test(
//       "image-width-height-check",
//       message,
//       async function (value) {
//         const { path, createError } = this;
//         var Type = value?.type.substr(0, 5);
//         if (!value) {
//           return;
//         }
//         if (Type == "image") {
//           const imgDimensions = await imageWidthAndHeight(value);

//           if (imgDimensions.width !== imgDimensions.height) {
//             return createError({
//               path,
//               message: `Image width and height needs to be the same`,
//             });
//           }
//           if (imgDimensions.width <= requiredWidth) {
//             return createError({
//               path,
//               message: `Image width and height must be the greater than ${requiredWidth}px`,
//             });
//           }
//           return true;
//         } else {
//           return true;
//         }

//         // if (imgDimensions.height !== requiredHeight) {
//         //   return createError({
//         //     path,
//         //     message: `The file height needs to be the ${requiredHeight}px!`,
//         //   });
//         // }
//       }
//     );
//   }
// );
export { LoginVS, RegistrationVS };
