// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Signup = () => {
//   const [profilePreviewImage, setProfilePreviewImage] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userMobile, setUserMobile] = useState("");
//   const [userBio, setUserBio] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userName, setUserName] = useState("");
//   const [userPassword, setUserPassword] = useState("");

//   const registerUser = async (e) => {
//     try {
//       e.preventDefault();

//       const formData = new FormData();
//       formData.append("firstName", firstName);
//       formData.append("lastName", lastName);
//       formData.append("userBio", userBio);
//       formData.append("userEmail", userEmail);
//       formData.append("userMobile", userMobile);
//       formData.append("userName", userName);
//       formData.append("userPassword", userPassword);
//       formData.append("profileImage", profileImage);

//       const result = await axios.post(
//         "http://localhost:6969/auth/signup",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       console.log("Data: ", result);
//       alert("User Entry Saved in Database");

//     } catch (error) {
//       console.log("Failed to Register User: ", error);
//     }

//   };

//   return (
//     <div className=" flex w-full items-center justify-center bg-[#f3f4f6]">
//       <form className="flex h-full w-full max-w-[420px] flex-col gap-3 bg-white p-5" onSubmit={registerUser}>
//         <h1 className="text-2xl font-black">Register</h1>
//         <div className="flex items-start justify-center gap-4" >
//           <div className="flex flex-col items-start justify-center">
//             <label className="font-bold" htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
//               placeholder="John"
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col items-start justify-center">
//             <label className="font-bold" htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
//               placeholder="Doe"
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userBio">Bio</label>
//           <textarea
//             id="userBio"
//             name="userBio"
//             rows="3"
//             className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
//             placeholder="Tell us something about yourself"
//             required
//             onChange={(e) => setUserBio(e.target.value)}
//           ></textarea>

//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userEmail">Email</label>
//           <input
//             type="email"
//             id="userEmail"
//             name="userEmail"
//             className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
//             placeholder="your.email@example.com"
//             onChange={(e) => setUserEmail(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userMobile">Mobile Number</label>
//           <input
//             type="number"
//             id="userMobile"
//             name="userMobile"
//             className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
//             placeholder="0000000000"
//             onChange={(e) => setUserMobile(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userName">UserName</label>
//           <input
//             type="text"
//             id="userName"
//             name="userName"
//             className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
//             placeholder="johndoe123"
//             onChange={(e) => setUserName(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userPassword">Password</label>
//           <input
//             type="password"
//             id="userPassword"
//             name="userPassword"
//             className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
//             placeholder="*********"
//             onChange={(e) => setUserPassword(e.target.value)}
//           />
//         </div>
//         <div className="flex w-full flex-col items-center justify-center">
//           <div className="mb-4 grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-2xl font-black">
//             {/* 200 x 200 */}
//             {profilePreviewImage == "" ? (
//               <p className="text-sm font-bold text-gray-500">Profile Image</p>
//             ) : (
//               <img src={profilePreviewImage} alt="" className="" />
//             )}
//           </div>
//           <label
//             htmlFor="dropzone-file"
//             className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
//           >
//             <div className="flex flex-col items-center justify-center pb-6 pt-5">
//               <svg
//                 className="mb-4 h-8 w-8 text-gray-500 "
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 16"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2 "
//                 />
//               </svg>
//               <p className="mb-2 text-sm text-gray-500">
//                 <span className="font-semibold">
//                   Click to Upload your profile image
//                 </span>
//               </p>
//               <input
//                 type="file"
//                 placeholder="File"
//                 accept="application/png"
//                 required
//                 id="dropzone-file"
//                 onChange={(e) => {
//                   setProfilePreviewImage(
//                     URL.createObjectURL(e.target.files[0]),
//                   );
//                   setProfileImage(e.target.files[0]);
//                 }}
//                 className="hidden"
//               />
//             </div>
//           </label>
//         </div>
//         <button className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600">
//           Register
//         </button>
//         <div className="text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="font-bold text-blue-500 hover:underline">
//             Login
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigation

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userBio", userBio);
      formData.append("userEmail", userEmail);
      formData.append("userMobile", userMobile);
      formData.append("userName", userName);
      formData.append("userPassword", userPassword);
      formData.append("profileImage", profileImage);

      await axios.post("http://localhost:6969/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User registered successfully!");

      // Redirect to Login Page after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Failed to register. Please try again.");
      console.error("Registration Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        className="w-full max-w-md flex flex-col gap-4 rounded-lg bg-gray-800 p-6 shadow-lg"
        onSubmit={registerUser}
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white focus:ring focus:ring-blue-500"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white focus:ring focus:ring-blue-500"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Bio</label>
          <textarea
            rows="3"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white focus:ring focus:ring-blue-500"
            placeholder="Tell us something about yourself"
            onChange={(e) => setUserBio(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white focus:ring focus:ring-blue-500"
            placeholder="your.email@example.com"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Mobile Number</label>
          <input
            type="tel"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white focus:ring focus:ring-blue-500"
            placeholder="0000000000"
            onChange={(e) => setUserMobile(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Username</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white focus:ring focus:ring-blue-500"
            placeholder="johndoe123"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Password</label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white focus:ring focus:ring-blue-500"
            placeholder="*********"
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 h-24 w-24 rounded-full overflow-hidden border border-gray-500">
            {profilePreviewImage ? (
              <img src={profilePreviewImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <p className="text-center text-sm text-gray-400">No Image</p>
            )}
          </div>

          <label className="cursor-pointer bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600">
            Upload Image
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) => {
                setProfilePreviewImage(URL.createObjectURL(e.target.files[0]));
                setProfileImage(e.target.files[0]);
              }}
            />
          </label>
        </div>

        <button
          className="w-full rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600 disabled:bg-gray-600"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
