import { useState } from "react";
// import { useEffect } from "react";
export default function CRM() {
  let [click, setClick] = useState(false);
  let [edit, setEdit] = useState(null);
  
  let [deleteBtn, setDelete] = useState(false);
  let [indexDelete, setIndexDelete] = useState(null);
  let [emp, setEmp] = useState({
    name: "",
    email: "",
    number: "",
    company: "",
  }); // ? object

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
          }}
        >
          Add Customer
        </button>
      </div>
      {click && (
        <div className="div-form">
          <div className="popup">
            <div className="title-and-button">
              <h3>Add New Customer</h3>
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
                console.log(emp.name);
                console.log(emp.email);
                console.log(emp.number);
                console.log(emp.company);
                setArrEmp([...arrEmp, emp]);
                e.preventDefault();
                setEmp({
                  name: "",
                  email: "",
                  number: "",
                  company: "",
                });
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
              <button type="submit" className="btnOp add">
                Add Customer
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
                        // onClick={() => {
                        //   setEdit(index);
                        //   setEmp(arrEmp[index]);
                        //   setClick(true);
                        // }}
                      >
                        edit
                      </button>
                      <button
                        className="delete-btn"
                        aria-label="delete employee from table"
                        onClick={() => {
                          setDelete(true);
                          setIndexDelete(index);
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
                // onClick={() => {
                //   setArrEmp(
                //     arrEmp.filter(function (_, i) {
                //       setDelete(false);
                //       return i !== indexDelete;
                //     })
                //   );
                // }}
              >
                Okay
              </button>
              <button
                className="edit-btn"
                aria-label="cancel deleting"
                // onClick={() => {
                //   setDelete(false);
                //   setIndexDelete(null);
                // }}
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
