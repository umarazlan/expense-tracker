// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MdKey } from "react-icons/md";
// import { FaLock } from "react-icons/fa";
// import toast, { Toaster } from "react-hot-toast";
// import { FaUnlock } from "react-icons/fa6";
// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId");
//    useEffect(() => {
//       if (!userId) {
//         navigate("/");
//       }
//     }, [userId, navigate]);
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(formData.newPassword !== formData.confirmPassword){
//       toast.error('Your passwords is not matching!!');
//       return;
//     }
//     console.log("Sending:", formData);
    
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/change_password/${userId}/`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json",},
//         body: JSON.stringify({
//           oldPassword:formData.oldPassword,
//           newPassword: formData.newPassword,
//         }),
//       });

//       const data = await response.json();

//       console.log("Backend response:", data);

//       if (response.ok) {
//         toast.success(data.message || "Password Changed successfully!");
//         setFormData({
//           oldPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//         }); 
//       } else {
//         toast.error(data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       toast.error("Network error. Could not connect to server.");
//     }
//   };
//   return (
//     <div className="container mt-5">
//       <form className="p-4 shadow mx-auto form1 mb-5" onSubmit={handleSubmit}>
//         <div className="text-center mb-4">
//           <h2>
//             <MdKey className="mb-2 text-warning" /> Change Password
//           </h2>

//           <p className="text-muted">
//             Secure your account with a new password!
//           </p>
//         </div>

//         {/* Full Name */}
//         <div className="mb-3">
//           <label className="form-label">Old Password</label>

//           <div className="input-group">
//             <span className="input-group-text">
//               <FaLock />
//             </span>

//             <input
//               type="password"
//               name="oldPassword"
//               className="form-control"
//               placeholder="Enter your old password"
//               value={formData.oldPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="mb-3">
//           <label className="form-label">New Password</label>

//           <div className="input-group">
//             <span className="input-group-text">
//               <FaUnlock />
//             </span>

//             <input
//               type="password"
//               name="newPassword"
//               className="form-control"
//               placeholder="Enter your new password"
//               value={formData.newPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div className="mb-3">
//           <label className="form-label">Confirm New Password</label>

//           <div className="input-group">
//             <span className="input-group-text">
//               <FaUnlock />
//             </span>

//             <input
//               type="password"
//               name="confirmPassword"
//               className="form-control"
//               placeholder="Enter your new password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary w-100 mt-3 text-white">
//           Change Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKey } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { FaUnlock } from "react-icons/fa6";

const ChangePassword = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Your passwords are not matching!!");
      return;
    }

    console.log("Sending:", formData);

    try {
      const response = await fetch(`https://your-django-backend.onrender.com/api/change_password/${userId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      console.log("Backend response:", data);

      if (response.ok) {
        toast.success(data.message || "Password Changed successfully!");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Network error. Could not connect to server.");
    }
  };

  return (
    <div className="container mt-4 mt-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <form className="p-3 p-sm-4 p-md-5 shadow rounded form1 mb-5 bg-white" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h2 className="fs-3 fs-md-2">
                <MdKey className="mb-2 text-warning" /> Change Password
              </h2>

              <p className="text-muted small fs-md-6">
                Secure your account with a new password!
              </p>
            </div>

            {/* Old Password */}
            <div className="mb-3">
              <label className="form-label">Old Password</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  placeholder="Enter your old password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div className="mb-3">
              <label className="form-label">New Password</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaUnlock />
                </span>

                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="mb-3">
              <label className="form-label">Confirm New Password</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaUnlock />
                </span>

                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3 text-white py-2">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;