import { useState } from "react";
// import { useEffect } from "react";

export default function CRM() {
  let [click, setClick] = useState(false);
  let [errorMessage, setErrorMessage] = useState(false);
  let [deleteBtn, setDelete] = useState(false);
  let [emp, setEmp] = useState({
    name: "",
    email: "",
    number: "",
    company: "",
  }); // ? object

  // edit
  let [edit, setEdit] = useState(false);
  let [editIndex, setEditIndex] = useState(null);

  // ! delete
  let [deleteIndex, setDeleteIndex] = useState(null);

  let [arrEmp, setArrEmp] = useState([]); // ?array

  return (
    <>
      <div className="header">
        <h2>Simple CRM</h2>
        <p>Manage your customer relationships</p>
      </div>
      <div className="div-btn">
        <button
          className="btn"
          aria-label="Add Customer"
          onClick={() => {
            setClick(true);
            setEdit(false);
          }}
        >
          Add Customer
        </button>
      </div>
      {click && (
        <div className="div-form">
          <div className="popup">
            <div className="title-and-button">
              <h3>{edit ? "Edit the customer" : "Add new customer"}</h3>
              <button
                onClick={() => {
                  setClick(false);
                }}
              >
                X
              </button>
            </div>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();

                if (edit) {
                  const updated = [...arrEmp];
                  updated[editIndex] = emp;
                  setArrEmp(updated);
                  setEdit(false);
                  setClick(false);
                  setEmp({
                    name: "",
                    email: "",
                    number: "",
                    company: "",
                  });
                  return;
                }

                const isDuplicateEmail = arrEmp.some(
                  (item) => item.email === emp.email
                );

                if (isDuplicateEmail) {
                  setErrorMessage(true);
                  return;
                } else {
                  setArrEmp([...arrEmp, emp]);
                  setEmp({
                    name: "",
                    email: "",
                    number: "",
                    company: "",
                  });
                  setErrorMessage(false);
                }
              }}
            >
              <label>
                <span
                  className="require"
                  style={{
                    display: "block",
                  }}
                >
                  Name
                </span>
                <input
                  type="text"
                  required
                  placeholder="Customer name"
                  value={emp.name}
                  onChange={(e) => {
                    setEmp({ ...emp, name: e.target.value });
                  }}
                />{" "}
              </label>
              <label>
                <span className="require">Email</span>
                <input
                  type="email"
                  required
                  placeholder="customer@example.com"
                  aria-label="Enter email"
                  value={emp.email}
                  onChange={(e) => {
                    setEmp({ ...emp, email: e.target.value });
                  }}
                />{" "}
              </label>
              {errorMessage && (
                <div className="error-message">
                  <h2
                    style={{
                      padding: "4px",
                      color: "red",
                      fontSize: "20px",
                    }}
                  >
                    you must enter email unique
                  </h2>
                </div>
              )}
              <label>
                <span>Number</span>
                <input
                  type="text"
                  aria-label="Enter Number"
                  placeholder="011-00000"
                  value={emp.number}
                  onChange={(e) => {
                    setEmp({ ...emp, number: e.target.value });
                  }}
                />{" "}
              </label>
              <label>
                <span>company</span>
                <input
                  type="text"
                  placeholder="Company name"
                  aria-label="Enter Company"
                  value={emp.company}
                  onChange={(e) => {
                    setEmp({ ...emp, company: e.target.value });
                  }}
                />{" "}
              </label>
              <button
                type="submit"
                className="btnOp add"
                aria-label={edit ? "edit button" : "add new customer button"}
              >
                {edit ? "Edit" : "Add Customer"}
              </button>
              <button
                className="btnOp cancel"
                onClick={(e) => {
                  e.preventDefault();
                  setClick(false);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {arrEmp.length > 0 ? (
        <div className="div-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {arrEmp.map(function (item, index) {
                return (
                  <tr className="row-emp" key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.number}</td>
                    <td>{item.company}</td>
                    <td className="btn-table">
                      <button
                        className="edit-btn"
                        aria-label="edit employee in table"
                        onClick={() => {
                          setClick(true);
                          setEdit(true);
                          setEmp(arrEmp[index]);
                          setEditIndex(index);
                        }}
                      >
                        edit
                      </button>
                      <button
                        className="delete-btn"
                        aria-label="delete employee from table"
                        onClick={() => {
                          setDelete(true);
                          setDeleteIndex(index);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-title-div">
          <h3 className="no-title-emp">Sorry we don't have an employee</h3>
        </div>
      )}
      {deleteBtn && (
        <div className="div-form">
          <div className="popup">
            <h3>Do you want Delete that Item?</h3>
            <div className="">
              <button
                className="delete-btn"
                aria-label="comfirm deleting"
                onClick={() => {
                  {
                    setArrEmp(
                      arrEmp.filter(function (_, index) {
                        return index !== deleteIndex;
                      })
                    );
                    setDelete(false);
                    setDeleteIndex(null);
                  }
                }}
              >
                Okay
              </button>
              <button
                className="edit-btn"
                aria-label="cancel deleting"
                onClick={() => {
                  setDelete(false);
                  setDeleteIndex(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// onClick={() => {
//   setArrEmp(
//     arrEmp.filter(function (_, i) {
//       setDelete(false);
//       return i !== indexDelete;
//     })
//   );
// }}

// onClick={() => {
//   setDelete(false);
//   setIndexDelete(null);
// }}
