// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {InputType} from "../Form/InputType";
// import API from "./../../../services/API";
// import {toast} from "react-toastify";
//
//
// const Modal = () => {
//     const [inventoryType, setInventoryType] = useState("in");
//     const [bloodGroup, setBloodGroup] = useState("");
//     const [quantity, setQuantity] = useState(0);
//     const [email, setEmail] = useState("");
//     const { user } = useSelector((state) => state.auth);
//     // handle modal data
//     const handleModalSubmit = async () => {
//         try {
//             if (!bloodGroup || !quantity) {
//                 return toast("Please Provide All Fields");
//             }
//             const { data } = await API.post("/inventory/create-inventory", {
//                 email,
//                 organisation: user?._id,
//                 inventoryType,
//                 bloodGroup,
//                 quantity,
//             });
//             if (data?.success) {
//                 toast("New Record Created");
//                 window.location.reload();
//
//             }
//         } catch (error) {
//             alert(error.response.data.message);
//             // console.log(error);
//             window.location.reload();
//         }
//     };
//
//     return (
//         <>
//             {/* Modal */}
//             <div
//                 className="modal fade"
//                 id="staticBackdrop"
//                 data-bs-backdrop="static"
//                 data-bs-keyboard="false"
//                 tabIndex={-1}
//                 aria-labelledby="staticBackdropLabel"
//                 aria-hidden="true"
//             >
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                                 Manage Blood Record
//                             </h1>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                             />
//                         </div>
//                         <div className="modal-body">
//                             <div className="d-flex mb-3">
//                                 Blood Type: &nbsp;
//                                 <div className="form-check ms-3">
//                                     <input
//                                         type="radio"
//                                         name="inRadio"
//                                         defaultChecked
//                                         value={"in"}
//                                         onChange={(e) => setInventoryType(e.target.value)}
//                                         className="form-check-input"
//                                     />
//                                     <label htmlFor="in" className="form-check-label">
//                                         IN
//                                     </label>
//                                 </div>
//                                 <div className="form-check ms-3">
//                                     <input
//                                         type="radio"
//                                         name="inRadio"
//                                         value={"out"}
//                                         onChange={(e) => setInventoryType(e.target.value)}
//                                         className="form-check-input"
//                                     />
//                                     <label htmlFor="out" className="form-check-label">
//                                         OUT
//                                     </label>
//                                 </div>
//                             </div>
//                             <select
//                                 className="form-select"
//                                 aria-label="Default select example"
//                                 onChange={(e) => setBloodGroup(e.target.value)}
//                             >
//                                 <option defaultValue={"Open this select menu"}>
//                                     Open this select menu
//                                 </option>
//                                 <option value={"O+"}>O+</option>
//                                 <option value={"O-"}>O-</option>
//                                 <option value={"AB+"}>AB+</option>
//                                 <option value={"AB-"}>AB-</option>
//                                 <option value={"A+"}>A+</option>
//                                 <option value={"A-"}>A-</option>
//                                 <option value={"B+"}>B+</option>
//                                 <option value={"B-"}>B-</option>
//                             </select>
//                             <InputType
//                                 labelText={"Donor Email"}
//                                 labelFor={"donorEmail"}
//                                 inputType={"email"}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             <InputType
//                                 labelText={"Quantity (ML)"}
//                                 labelFor={"quantity"}
//                                 inputType={"Number"}
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(e.target.value)}
//                             />
//                         </div>
//                         <div className="modal-footer">
//                             <button
//                                 type="button"
//                                 className="btn btn-secondary"
//                                 data-bs-dismiss="modal"
//                             >
//                                 Close
//                             </button>
//                             <button
//                                 type="button"
//                                 className="btn btn-primary"
//                                 onClick={handleModalSubmit}
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export {Modal};



import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputType } from "../Form/InputType";
import API from "./../../../services/API";
import { toast } from "react-toastify";
import moment from "moment/moment";

const Modal = () => {
    const [inventoryType, setInventoryType] = useState("in");
    const [bloodGroup, setBloodGroup] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [email, setEmail] = useState("");
    const { user } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [records, setRecords] = useState([]); // Локальний стан для записів

    const handleModalSubmit = async () => {
        try {
            if (!bloodGroup || !quantity) {
                return toast("Please Provide All Fields");
            }
            const { data } = await API.post("/inventory/create-inventory", {
                email,
                organisation: user?._id,
                inventoryType,
                bloodGroup,
                quantity,
            });
            if (data?.success) {
                toast("New Record Created");
                const newRecord = { inventoryType, bloodGroup, quantity, email };
                setRecords([...records, newRecord]);
                setShowModal(false);
            }
        } catch (error) {
            alert(error.response.data.message);
            setShowModal(false);
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
            >
                Add Inventory
            </button>

            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block" }}
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-modal="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Manage Blood Record
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                />
                            </div>
                            <div className="modal-body">
                                {/* ... Код вмісту модального вікна ... */}
                                <div className="d-flex mb-3">
                                    Blood Type: &nbsp;
                                    <div className="form-check ms-3">
                                        <input
                                            type="radio"
                                            name="inRadio"
                                            defaultChecked
                                            value={"in"}
                                            onChange={(e) => setInventoryType(e.target.value)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="in" className="form-check-label">
                                            IN
                                        </label>
                                    </div>
                                    <div className="form-check ms-3">
                                        <input
                                            type="radio"
                                            name="inRadio"
                                            value={"out"}
                                            onChange={(e) => setInventoryType(e.target.value)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="out" className="form-check-label">
                                            OUT
                                        </label>
                                    </div>
                                </div>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                >
                                    <option defaultValue={"Open this select menu"}>
                                        Open this select menu
                                    </option>
                                    <option value={"O+"}>O+</option>
                                    <option value={"O-"}>O-</option>
                                    <option value={"AB+"}>AB+</option>
                                    <option value={"AB-"}>AB-</option>
                                    <option value={"A+"}>A+</option>
                                    <option value={"A-"}>A-</option>
                                    <option value={"B+"}>B+</option>
                                    <option value={"B-"}>B-</option>
                                </select>
                                <InputType
                                    labelText={"Donor Email"}
                                    labelFor={"donorEmail"}
                                    inputType={"email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <InputType
                                    labelText={"Quantity (ML)"}
                                    labelFor={"quantity"}
                                    inputType={"Number"}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleModalSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Виведення записів */}
            <div>
                <h4 className="ms-4">New Inventory Records</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Blood Group</th>
                        <th scope="col">Inventory Type</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Donor Email</th>
                        <th scope="col">Time & Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.bloodGroup}</td>
                            <td>{record.inventoryType}</td>
                            <td>{record.quantity} (ML)</td>
                            <td>{record.email}</td>
                            <td>
                                {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export { Modal };

