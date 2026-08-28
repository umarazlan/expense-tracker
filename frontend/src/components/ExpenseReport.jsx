import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa6";

const ExpenseReport = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  
  // Protect page
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  // Submit expense search
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://expense-tracker-0wwb.onrender.com/api/report_expense/${userId}/?from=${fromDate}&to=${toDate}`
      );

      const data = await response.json();
      setExpenses(data.expenses || []);
      setGrandTotal(data.total || 0);
    } catch (error) {
      console.error("fetching expense error:", error);
      toast.error("Network error. Could not connect to server.");
    }
  };

  return (
    <div className="container my-4 my-md-5 px-3">
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="fs-3 fs-md-2">
          <FaFileInvoiceDollar className="mb-2 text-warning" /> Expense Report
        </h2>
        <p className="text-muted small">
          Search and analyze your expense by dates
        </p>
      </div>

      {/* Main Container Wrapper */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          
          {/* Search Form Card */}
          <div className="card shadow-sm border-0 p-3 p-md-4 mb-4 bg-light">
            <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
              {/* From Date */}
              <div className="col-12 col-md-4">
                <label className="form-label small text-muted">From Date</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="date"
                    name="fromDate"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* To Date */}
              <div className="col-12 col-md-4">
                <label className="form-label small text-muted">To Date</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="date"
                    name="toDate"
                    className="form-control"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12 col-md-4 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mt-2 mt-md-4"
                >
                  Search Report
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          {expenses.length > 0 ? (
            <>
              {/* DESKTOP & TABLET VIEW: Table layout */}
              <div className="table-responsive shadow-sm rounded d-none d-md-block">
                <table className="table table-striped table-bordered align-middle mb-0">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Item</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((exp, index) => (
                      <tr key={exp.id}>
                        <td className="text-center">{index + 1}</td>
                        <td>{exp.ExpenseDate}</td>
                        <td>{exp.ExpenseItem}</td>
                        <td>Rs: {exp.ExpenseCost}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <td colSpan={3} className="text-end fw-bold">Grand Total:</td>
                      <td className="fw-bold text-success">Rs: {grandTotal}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* MOBILE VIEW: Card layout */}
              <div className="d-block d-md-none">
                {/* Mobile Grand Total Banner */}
                <div className="card bg-dark text-white mb-3 shadow-sm border-0">
                  <div className="card-body d-flex justify-content-between align-items-center py-3">
                    <span className="fw-bold">Grand Total:</span>
                    <span className="fs-5 fw-bold text-success bg-white px-3 py-1 rounded">
                      Rs: <span className="">{grandTotal}</span>
                    </span>
                  </div>
                </div>

                {/* Individual Expense Cards */}
                {expenses.map((exp, index) => (
                  <div key={exp.id} className="card mb-3 shadow-sm border-0 bg-light">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-dark">#{index + 1}</span>
                        <small className="text-muted">
                          <FaCalendarAlt className="me-1" />
                          {exp.ExpenseDate}
                        </small>
                      </div>
                     <div className="d-flex justify-content-between">
                       <h5 className="card-title text-primary ">
                        <TiShoppingCart className="me-1 mb-1" /> {exp.ExpenseItem}
                      </h5>
                       <h6 className="card-subtitle  mt-1  text-success fw-bold">
                        Rs: {exp.ExpenseCost}
                      </h6>
                     </div>
                     
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-muted py-5 bg-light rounded shadow-sm">
              <p className="mb-0">No Expenses Found for the selected dates!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;