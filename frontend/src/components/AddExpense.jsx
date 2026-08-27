// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";

// import { FaCalendarAlt } from "react-icons/fa";
// import { TiShoppingCart } from "react-icons/ti";
// import { FaRupeeSign } from "react-icons/fa6";
// import { SiParamountplus } from "react-icons/si";

// const AddExpense = () => {
//   const navigate = useNavigate();

//   const userId = localStorage.getItem("userId");

//   const [formData, setFormData] = useState({
//     ExpenseDate: "",
//     ExpenseItem: "",
//     ExpenseCost: "",
//   });

//   // Protect page
//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // Handle input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Submit expense
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/add_expense/", {
//         method: "POST",
//         headers: {"Content-Type": "application/json",},

//         body: JSON.stringify({
//           userId: userId,
//           ExpenseDate: formData.ExpenseDate,
//           ExpenseItem: formData.ExpenseItem,
//           ExpenseCost: formData.ExpenseCost,
//         }),
//       });

//       const data = await response.json();

//       console.log("Backend response:", data);

//       if (response.ok) {
//         toast.success(data.message || "Expense added successfully!");

//         // Clear form
//         setFormData({
//           ExpenseDate: "",
//           ExpenseItem: "",
//           ExpenseCost: "",
//         });
//       } else {
//         toast.error(data.message || "Could not add expense");
//       }
//     } catch (error) {
//       console.error("Add expense error:", error);

//       toast.error("Network error. Could not connect to server.");
//     }
//   };

//   return (
//     <div className="container">
//       {/* Heading */}
//       <div className="text-center mb-4">
//         <h2>
//           <SiParamountplus className="mb-2" /> Add Expense
//         </h2>

//         <p className="text-muted">Track your new spending here...</p>
//       </div>

//       {/* Form */}
//       <form className="p-4 shadow mx-auto form1 mb-5" onSubmit={handleSubmit}>
//         {/* Expense Date */}
//         <div className="mb-3">
//           <label className="form-label">Expense Date</label>

//           <div className="input-group">
//             <span className="input-group-text">
//               <FaCalendarAlt />
//             </span>

//             <input
//               type="date"
//               name="ExpenseDate"
//               className="form-control"
//               value={formData.ExpenseDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Expense Item */}
//         <div className="mb-3">
//           <label className="form-label">Expense Item</label>

//           <div className="input-group">
//             <span className="input-group-text">
//               <TiShoppingCart size={18} />
//             </span>

//             <input
//               type="text"
//               name="ExpenseItem"
//               className="form-control"
//               placeholder="Enter Expense Item"
//               value={formData.ExpenseItem}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Expense Cost */}
//         <div className="mb-3">
//           <label className="form-label">Expense Cost</label>

//           <div className="input-group">
//             <span className="input-group-text">
//               <FaRupeeSign />
//             </span>

//             <input
//               type="number"
//               name="ExpenseCost"
//               className="form-control"
//               placeholder="Enter Expense Cost"
//               value={formData.ExpenseCost}
//               onChange={handleChange}
//               min="0"
//               step="0.01"
//               required
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <button type="submit" className="btn btn-primary w-100 mt-3">
//           Add Expense
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddExpense;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa6";
import { SiParamountplus } from "react-icons/si";

const AddExpense = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    ExpenseDate: "",
    ExpenseItem: "",
    ExpenseCost: "",
  });

  // Protect page
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://your-django-backend.onrender.com/api/add_expense/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          ExpenseDate: formData.ExpenseDate,
          ExpenseItem: formData.ExpenseItem,
          ExpenseCost: formData.ExpenseCost,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Expense added successfully!");

        // Clear form
        setFormData({
          ExpenseDate: "",
          ExpenseItem: "",
          ExpenseCost: "",
        });
      } else {
        toast.error(data.message || "Could not add expense");
      }
    } catch (error) {
      console.error("Add expense error:", error);
      toast.error("Network error. Could not connect to server.");
    }
  };

  return (
    <div className="container my-4 my-md-3 px-3">
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="fs-3 fs-md-2">
          <SiParamountplus className="mb-2 text-warning" /> Add Expense
        </h2>
        <p className="text-muted small">Track your new spending here...</p>
      </div>

      {/* Form Container with Responsive Grid Columns */}
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <form className="p-4 p-md-5 shadow rounded bg-white mb-5" onSubmit={handleSubmit}>
            
            {/* Expense Date */}
            <div className="mb-3">
              <label className="form-label">Expense Date</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <input
                  type="date"
                  name="ExpenseDate"
                  className="form-control"
                  value={formData.ExpenseDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Expense Item */}
            <div className="mb-3">
              <label className="form-label">Expense Item</label>
              <div className="input-group">
                <span className="input-group-text">
                  <TiShoppingCart size={18} />
                </span>
                <input
                  type="text"
                  name="ExpenseItem"
                  className="form-control"
                  placeholder="Enter Expense Item"
                  value={formData.ExpenseItem}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Expense Cost */}
            <div className="mb-3">
              <label className="form-label">Expense Cost</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaRupeeSign />
                </span>
                <input
                  type="number"
                  name="ExpenseCost"
                  className="form-control"
                  placeholder="Enter Expense Cost"
                  value={formData.ExpenseCost}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100 mt-3 py-2">
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;