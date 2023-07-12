import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {InputType} from "../Form/InputType";
import API from "../../../services/API";


const Modal = () => {
    const [inventoryType, setInventoryType] = useState("вхід");
    const [bloodGroup, setBloodGroup] = useState('');
    const [quantity, setQuantity] = useState('0');
    const [email, setEmail] = useState('');
    const{user} = useSelector((state) => state.auth);

    //handle modal data
    const handleModalSubmit = async () =>{
        try {
            if(!bloodGroup || !quantity){
                return alert('Please Provide All Fields');
            }
            const {data} = await API.post('/inventory/create-inventory',{
                email,
                organization: user?._id,
                inventoryType,
                bloodGroup,
                quantity
            })
            if(data?.success){
                alert ("New Record Created")
                window.location.reload();
            }
        } catch (error) {
            alert(error.response.data.message)
            console.log(error)
            window.location.reload();
        }
    }
    return (
        <>
            {/* Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                               Manage Blood Record
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                Blood Type: &nbsp;
                                <div className="for-check ms-3">
                                    <input type='radio'
                                           name='inRadio'
                                           value={'вхід'}
                                           onChange={(e) => setInventoryType(e.target.value)}
                                           className='form-check-input' />
                                    <label htmlFor='вхід' className='for-check-label'>
                                        Вхід
                                    </label>
                                </div>
                                <div className="for-check ms-3">
                                    <input type='radio'
                                           name='inRadio'
                                           value={'вихід'}
                                           onChange={(e) => setInventoryType(e.target.value)}
                                           className='form-check-input' />
                                    <label htmlFor='вихід' className='for-check-label'>
                                       Вихід
                                    </label>
                                </div>
                            </div>
                            <select className="form-select" aria-label="Default select example"
                                    onChange={(e) => setBloodGroup(e.target.value)}
                            >
                                <option defaultValue="Open this select menu">
                                    Open this select menu
                                </option>
                                <option value={'I(0+)'}>I(0+)</option>
                                <option value={'I(0-)'}>I(0-)</option>
                                <option value={'II(A+)'}>II(A+)</option>
                                <option value={'II(A-)'}>II(A-)</option>
                                <option value={'III(B+)'}>III(B+)</option>
                                <option value={'III(B-)'}>III(B-)</option>
                                <option value={'IV(AB-)'}>IV(AB-)</option>
                                <option value={'IV(AB+)'}>IV(AB+)</option>
                            </select>
                            <InputType labelText={'Donor Email'}
                                       labelFor={'donorEmail'}
                                       inputType={'email'}
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            <InputType labelText={'Quantity (ML)'}
                                       labelFor={'quantity'}
                                       inputType={'Number'}
                                       value={quantity}
                                       onChange={(e) => setQuantity(e.target.value)}/>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export {Modal};