// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { RiSettings2Fill } from "react-icons/ri";
// // import toast from "react-hot-toast";
// // import { RiDeleteBin6Fill } from "react-icons/ri";
// // import { FaEdit } from "react-icons/fa";
// // import { RiPencilFill } from "react-icons/ri";

// // import { FaCalendarAlt } from "react-icons/fa";
// // import { TiShoppingCart } from "react-icons/ti";
// // import { FaRupeeSign } from "react-icons/fa6";

// // const ManageExpense = () => {
// //   const navigate = useNavigate();
// //   const [expenses, setExpenses] = useState([]);
// //   const userId = localStorage.getItem("userId");

// //   const fetchExpenses = async (userId) => {
// //     try {
// //       const response = await fetch(
// //         `http://127.0.0.1:8000/api/manage_expense/${userId}`,
// //       );
// //       const data = await response.json();
// //       setExpenses(data);
// //     } catch (error) {
// //       console.error("Error fetching expenses: ", error);
// //     }
// //   };

// //    const handleUpdate = async (userId) => {
// //     try {
// //       const response = await fetch(`http://127.0.0.1:8000/api/update_expense/${editExpanse.Id}/`,{
// //         method: "PUT",
// //         headers: {"Content-Type": "application/json",},
// //         body: JSON.stringify({editExpanse})
// //       });
// //       if(response.status == 200) {
// //         toast.success('Expense updated successfully Jani!');
// //         setEditExpanse(null);
// //         fetchExpenses(userId)
// //       }
// //       else {
// //         toast.error('Failed to update Expense')
// //       }
// //     } catch (error) {
// //       console.error("Error fetching expenses: ", error);
// //        toast.error('Failed to update Expense')
// //     }
// //   };
// //   // Protect page
// //   useEffect(() => {
// //     if (!userId) {
// //       navigate("/");
// //     }
// //     fetchExpenses(userId);
// //   }, [userId, navigate]);
// //   const [editExpanse, setEditExpanse] = useState(null);
  
// //   const handleEdit = (expense) =>{
// //     setEditExpanse(expense);
// //   }

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditExpanse((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <div className="text-center mb-4">
// //         <h2>
// //           <RiSettings2Fill classNameName="me-2 mb-1" />
// //           Manage Expense
// //         </h2>

// //         <p className="text-muted">ViewExpense, EditExpense, DeleteExpense</p>
// //       </div>
// //       <div>
// //         <table className="table table-striped table-bordered">
// //           <thead className="table-dark text-center">
// //             <tr>
// //               <th>#</th>
// //               <th>Date</th>
// //               <th>Item</th>
// //               <th>Cost</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {expenses.length > 0 ? (
// //               expenses.map((exp, index) => (
// //                 <tr key={exp.id}>
// //                   <td>{index + 1}</td>
// //                   <td>{exp.ExpenseDate}</td>
// //                   <td>{exp.ExpenseItem}</td>
// //                   <td>Rs: {exp.ExpenseCost}</td>
// //                   <td>
// //                     <button onClick={()=>handleEdit(exp)} className="btn btn-sm btn-primary me-2">
// //                       <FaEdit />
// //                     </button>
// //                     <button className="btn btn-sm btn-danger">
// //                       <RiDeleteBin6Fill />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan={5} classNameName="text-center text-muted">
// //                   No Expenses Found!
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //       {/* Modal */}

// //       {editExpanse && (
// //         <div
// //         className="modal fade show d-block "
// //         id="exampleModal"
// //         aria-labelledby="exampleModalLabel"
// //         aria-hidden="true"
// //       >
// //         <div className="modal-dialog">
// //           <div className="modal-content">
// //             <div className="modal-header bg-dark text-white">
// //               <h1 className="modal-title fs-5" id="exampleModalLabel">
// //                 <RiPencilFill size={20} className="me-2 mb-1 text-warning" />{" "}
// //                 Edit Expense
// //               </h1>
// //               <button
// //                 type="button"
// //                 className="btn-close btn-close-white"
// //                 data-bs-dismiss="modal"
// //                 aria-label="Close"
// //                 onClick={()=>setEditExpanse(null)}
// //               ></button>
// //             </div>
// //             <div className="modal-body">
// //               <div className="mb-3">
// //                 <label className="form-label">Expense Date</label>

// //                 <div className="input-group">
// //                   <span className="input-group-text">
// //                     <FaCalendarAlt />
// //                   </span>

// //                   <input
// //                     type="date"
// //                     name="ExpenseDate"
// //                     className="form-control"
// //                     value={editExpanse.ExpenseDate}
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* Expense Item */}
// //               <div className="mb-3">
// //                 <label className="form-label">Expense Item</label>

// //                 <div className="input-group">
// //                   <span className="input-group-text">
// //                     <TiShoppingCart size={18} />
// //                   </span>

// //                   <input
// //                     type="text"
// //                     name="ExpenseItem"
// //                     className="form-control"
// //                     placeholder="Enter Expense Item"
// //                     value={editExpanse.ExpenseItem}
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* Expense Cost */}
// //               <div className="mb-3">
// //                 <label className="form-label">Expense Cost</label>

// //                 <div className="input-group">
// //                   <span className="input-group-text">
// //                     <FaRupeeSign />
// //                   </span>

// //                   <input
// //                     type="number"
// //                     name="ExpenseCost"
// //                     className="form-control"
// //                     placeholder="Enter Expense Cost"
// //                     min="0"
// //                     step="0.01"
// //                     value={editExpanse.ExpenseCost}
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="modal-footer">
// //               <button
// //                 type="button"
// //                 className="btn btn-secondary"
// //                 data-bs-dismiss="modal"
// //                 onClick={()=>setEditExpanse(null)}
// //               >
// //                 Close
// //               </button>
// //               <button type="button" className="btn btn-primary" onClick={handleUpdate}>
// //                 Save changes
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       )}
      
// //     </div>
// //   );
// // };

// // export default ManageExpense;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { RiSettings2Fill } from "react-icons/ri";
// import toast from "react-hot-toast";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { FaEdit } from "react-icons/fa";
// import { RiPencilFill } from "react-icons/ri";
// import { FaCalendarAlt } from "react-icons/fa";
// import { TiShoppingCart } from "react-icons/ti";
// import { FaRupeeSign } from "react-icons/fa6";

// const ManageExpense = () => {
//   const navigate = useNavigate();
//   const [expenses, setExpenses] = useState([]);
//   const [editExpanse, setEditExpanse] = useState(null);
//   const userId = localStorage.getItem("userId");

//   const fetchExpenses = async (userId) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/manage_expense/${userId}`
//       );
//       const data = await response.json();
//       setExpenses(data);
//     } catch (error) {
//       console.error("Error fetching expenses: ", error);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       // Fixed: use lowercase 'id' and send fields directly
//       const response = await fetch(`http://127.0.0.1:8000/api/update_expense/${editExpanse.id}/`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ExpenseDate: editExpanse.ExpenseDate,
//           ExpenseItem: editExpanse.ExpenseItem,
//           ExpenseCost: editExpanse.ExpenseCost,
//         })
//       });
      
//       if (response.status === 200) {
//         toast.success('Expense updated successfully Jani!');
//         setEditExpanse(null);
//         fetchExpenses(userId);
//       } else {
//         toast.error('Failed to update Expense');
//       }
//     } catch (error) {
//       console.error("Error updating expense: ", error);
//       toast.error('Failed to update Expense');
//     }
//   };
//   const handleDelete = async (expenseId) => {
//     if(window.confirm('Are You Sure You Want to Delete This Expense!')){
//     try {
//       // Fixed: use lowercase 'id' and send fields directly
//       const response = await fetch(`http://127.0.0.1:8000/api/delete_expense/${expenseId}/`, {
//         method: "DELETE",});
      
//       if (response.status === 200) {
//         toast.success('Expense deleted successfully Jani!');
//         fetchExpenses(userId);
//       } else {
//         toast.error('Failed to delete Expense');
//       }
//     } catch (error) {
//       console.error("Error deleting expense: ", error);
//       toast.error('Failed to update Expense');
//     }}
//   };

//   // Protect page
//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     } else {
//       fetchExpenses(userId);
//     }
//   }, [userId, navigate]);

//   const handleEdit = (expense) => {
//     setEditExpanse(expense);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditExpanse((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="container mt-5">
//       <div className="text-center mb-4">
//         <h2>
//           <RiSettings2Fill className="me-2 mb-1" />
//           Manage Expense
//         </h2>
//         <p className="text-muted">ViewExpense, EditExpense, DeleteExpense</p>
//       </div>
//       <div>
//         <table className="table table-striped table-bordered">
//           <thead className="table-dark text-center">
//             <tr>
//               <th>#</th>
//               <th>Date</th>
//               <th>Item</th>
//               <th>Cost</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.length > 0 ? (
//               expenses.map((exp, index) => (
//                 <tr key={exp.id}>
//                   <td>{index + 1}</td>
//                   <td>{exp.ExpenseDate}</td>
//                   <td>{exp.ExpenseItem}</td>
//                   <td>Rs: {exp.ExpenseCost}</td>
//                   <td>
//                     <button onClick={() => handleEdit(exp)} className="btn btn-sm btn-primary me-2">
//                       <FaEdit />
//                     </button>
//                     <button  onClick={() => handleDelete(exp.id)} className="btn btn-sm btn-danger">
//                       <RiDeleteBin6Fill />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center text-muted">
//                   No Expenses Found!
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {editExpanse && (
//         <div
//           className="modal fade show d-block divStyle"
//           id="exampleModal"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header bg-dark text-white">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                   <RiPencilFill size={20} className="me-2 mb-1 text-warning" /> Edit Expense
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close btn-close-white"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                   onClick={() => setEditExpanse(null)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Expense Date</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FaCalendarAlt />
//                     </span>
//                     <input
//                       type="date"
//                       name="ExpenseDate"
//                       className="form-control"
//                       value={editExpanse.ExpenseDate || ""}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Expense Item */}
//                 <div className="mb-3">
//                   <label className="form-label">Expense Item</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <TiShoppingCart size={18} />
//                     </span>
//                     <input
//                       type="text"
//                       name="ExpenseItem"
//                       className="form-control"
//                       placeholder="Enter Expense Item"
//                       value={editExpanse.ExpenseItem || ""}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Expense Cost */}
//                 <div className="mb-3">
//                   <label className="form-label">Expense Cost</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FaRupeeSign />
//                     </span>
//                     <input
//                       type="number"
//                       name="ExpenseCost"
//                       className="form-control"
//                       placeholder="Enter Expense Cost"
//                       min="0"
//                       step="0.01"
//                       value={editExpanse.ExpenseCost || ""}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setEditExpanse(null)}
//                 >
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary" onClick={handleUpdate}>
//                   Save changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageExpense; 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiSettings2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa6";

const ManageExpense = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [editExpanse, setEditExpanse] = useState(null);
  const userId = localStorage.getItem("userId");

  const fetchExpenses = async (userId) => {
    try {
      const response = await fetch(
        `https://your-django-backend.onrender.com/api/manage_expense/${userId}`
      );
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://your-django-backend.onrender.com/api/update_expense/${editExpanse.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ExpenseDate: editExpanse.ExpenseDate,
          ExpenseItem: editExpanse.ExpenseItem,
          ExpenseCost: editExpanse.ExpenseCost,
        })
      });
      
      if (response.status === 200) {
        toast.success('Expense updated successfully Jani!');
        setEditExpanse(null);
        fetchExpenses(userId);
      } else {
        toast.error('Failed to update Expense');
      }
    } catch (error) {
      console.error("Error updating expense: ", error);
      toast.error('Failed to update Expense');
    }
  };

  const handleDelete = async (expenseId) => {
    if (window.confirm('Are You Sure You Want to Delete This Expense!')) {
      try {
        const response = await fetch(`https://your-django-backend.onrender.com/api/delete_expense/${expenseId}/`, {
          method: "DELETE",
        });
        
        if (response.status === 200) {
          toast.success('Expense deleted successfully Jani!');
          fetchExpenses(userId);
        } else {
          toast.error('Failed to delete Expense');
        }
      } catch (error) {
        console.error("Error deleting expense: ", error);
        toast.error('Failed to delete Expense');
      }
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      fetchExpenses(userId);
    }
  }, [userId, navigate]);

  const handleEdit = (expense) => {
    setEditExpanse(expense);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditExpanse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container my-4 my-md-5 px-3">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2 className="fs-3 fs-md-2">
          <RiSettings2Fill className="me-2 mb-1 text-warning" />
          Manage Expense
        </h2>
        <p className="text-muted small">ViewExpense, EditExpense, DeleteExpense</p>
      </div>

      {expenses.length > 0 ? (
        <>
          {/* DESKTOP & TABLET VIEW: Table layout (Visible on medium screens and up) */}
          <div className="table-responsive shadow-sm rounded d-none d-md-block">
            <table className="table table-striped table-bordered align-middle mb-0">
              <thead className="table-dark text-center">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, index) => (
                  <tr key={exp.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{exp.ExpenseDate}</td>
                    <td>{exp.ExpenseItem}</td>
                    <td>Rs: {exp.ExpenseCost}</td>
                    <td className="text-center text-nowrap">
                      <button 
                        onClick={() => handleEdit(exp)} 
                        className="btn btn-sm btn-primary me-2"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(exp.id)} 
                        className="btn btn-sm btn-danger"
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW: Card layout (Visible only on small screens) */}
          <div className="d-block d-md-none">
            {expenses.map((exp, index) => (
              <div key={exp.id} className="card mb-3 shadow-sm border-0 bg-light">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-dark">#{index + 1}</span>
                    <small className="text-muted"><FaCalendarAlt className="me-1" />{exp.ExpenseDate}</small>
                  </div>
                  <h5 className="card-title text-primary mb-1">
                    <TiShoppingCart className="me-1" /> {exp.ExpenseItem}
                  </h5>
                  <h6 className="card-subtitle mt-3 text-success fw-bold">
                    {/* <FaRupeeSign className="mt-3  me-2" />*/} Rs: {exp.ExpenseCost} 
                  </h6>
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      onClick={() => handleEdit(exp)} 
                      className="btn btn-sm btn-primary px-3"
                    >
                      <FaEdit className="me-1" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(exp.id)} 
                      className="btn btn-sm btn-danger px-3"
                    >
                      <RiDeleteBin6Fill className="me-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-muted py-5 bg-light rounded shadow-sm">
          <p className="mb-0">No Expenses Found!</p>
        </div>
      )}

      {/* Responsive Modal */}
      {editExpanse && (
        <div
          className="modal fade show d-block"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable mx-3 mx-sm-auto">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  <RiPencilFill size={20} className="me-2 mb-1 text-warning" /> Edit Expense
                </h1>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEditExpanse(null)}
                ></button>
              </div>
              
              <div className="modal-body">
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
                      value={editExpanse.ExpenseDate || ""}
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
                      value={editExpanse.ExpenseItem || ""}
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
                      min="0"
                      step="0.01"
                      value={editExpanse.ExpenseCost || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditExpanse(null)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm" 
                  onClick={handleUpdate}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExpense;