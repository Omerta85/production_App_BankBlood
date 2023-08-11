// import React, { useState } from "react";
// import {InputType} from "./InputType";
// import { Link } from "react-router-dom";
// import { handleLogin, handleRegister } from "../../../services/authService";
//
// const Form = ({ formType, submitBtn, formTitle }) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [role, setRole] = useState("donor");
//     const [name, setName] = useState("");
//     const [organisationName, setOrganisationName] = useState("");
//     const [hospitalName, setHospitalName] = useState("");
//     const [website, setWebsite] = useState("");
//     const [address, setAddress] = useState("");
//     const [phone, setPhone] = useState("");
//     return (
//         <div>
//             <form
//                 onSubmit={(e) => {
//                     if (formType === "login")
//                         return handleLogin(e, email, password);
//                     else if (formType === "register")
//                         return handleRegister(
//                             e,
//                             name,
//                             role,
//                             email,
//                             password,
//                             phone,
//                             organisationName,
//                             address,
//                             hospitalName,
//                             website
//                         );
//                 }}
//             >
//                 <h1 className="text-center">{formTitle}</h1>
//                 <hr />
//                 <div className="d-flex mb-3">
//                     <div className="form-check">
//                         <input
//                             type="radio"
//                             className="form-check-input"
//                             name="role"
//                             id="donorRadio"
//                             value={"donor"}
//                             onChange={(e) => setRole(e.target.value)}
//                             defaultChecked
//                         />
//                         <label htmlFor="adminRadio" className="form-check-label">
//                             Donor
//                         </label>
//                     </div>
//                     <div className="form-check ms-2">
//                         <input
//                             type="radio"
//                             className="form-check-input"
//                             name="role"
//                             id="adminRadio"
//                             value={"admin"}
//                             onChange={(e) => setRole(e.target.value)}
//                         />
//                         <label htmlFor="adminRadio" className="form-check-label">
//                             Admin
//                         </label>
//                     </div>
//                     <div className="form-check ms-2">
//                         <input
//                             type="radio"
//                             className="form-check-input"
//                             name="role"
//                             id="hospitalRadio"
//                             value={"hospital"}
//                             onChange={(e) => setRole(e.target.value)}
//                         />
//                         <label htmlFor="hospitalRadio" className="form-check-label">
//                             Hospital
//                         </label>
//                     </div>
//                     <div className="form-check ms-2">
//                         <input
//                             type="radio"
//                             className="form-check-input"
//                             name="role"
//                             id="organisationRadio"
//                             value={"organisation"}
//                             onChange={(e) => setRole(e.target.value)}
//                         />
//                         <label htmlFor="organisationRadio" className="form-check-label">
//                             Organisation
//                         </label>
//                     </div>
//                 </div>
//                 {/* switch statement */}
//                 {(() => {
//                     //eslint-disable-next-line
//                     switch (true) {
//                         case formType === "login": {
//                             return (
//                                 <>
//                                     <InputType
//                                         labelText={"email"}
//                                         labelFor={"forEmail"}
//                                         inputTape={"email"}
//                                         name={"email"}
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                     <InputType
//                                         labelText={"Password"}
//                                         labelFor={"forPassword"}
//                                         inputTape={"password"}
//                                         name={"password"}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </>
//                             );
//                         }
//                         case formType === "register": {
//                             return (
//                                 <>
//                                     {(role === "admin" || role === "donor") && (
//                                         <InputType
//                                             labelText={"Name"}
//                                             labelFor={"forName"}
//                                             inputTape={"text"}
//                                             name={"name"}
//                                             value={name}
//                                             onChange={(e) => setName(e.target.value)}
//                                         />
//                                     )}
//                                     {role === "organisation" && (
//                                         <InputType
//                                             labelText={"Organisation Name"}
//                                             labelFor={"forOrganisationName"}
//                                             inputTape={"text"}
//                                             name={"organisationName"}
//                                             value={organisationName}
//                                             onChange={(e) => setOrganisationName(e.target.value)}
//                                         />
//                                     )}
//                                     {role === "hospital" && (
//                                         <InputType
//                                             labelText={"Hospital Name"}
//                                             labelFor={"forHospitalName"}
//                                             inputTape={"text"}
//                                             name={"hospitalName"}
//                                             value={hospitalName}
//                                             onChange={(e) => setHospitalName(e.target.value)}
//                                         />
//                                     )}
//
//                                     <InputType
//                                         labelText={"email"}
//                                         labelFor={"forEmail"}
//                                         inputTape={"email"}
//                                         name={"email"}
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                     <InputType
//                                         labelText={"Password"}
//                                         labelFor={"forPassword"}
//                                         inputTape={"password"}
//                                         name={"password"}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <InputType
//                                         labelText={"website"}
//                                         labelFor={"forWebsite"}
//                                         inputTape={"text"}
//                                         name={"website"}
//                                         value={website}
//                                         onChange={(e) => setWebsite(e.target.value)}
//                                     />
//                                     <InputType
//                                         labelText={"Address"}
//                                         labelFor={"forAddress"}
//                                         inputTape={"text"}
//                                         name={"address"}
//                                         value={address}
//                                         onChange={(e) => setAddress(e.target.value)}
//                                     />
//                                     <InputType
//                                         labelText={"Phone"}
//                                         labelFor={"forPhone"}
//                                         inputTape={"text"}
//                                         name={"phone"}
//                                         value={phone}
//                                         onChange={(e) => setPhone(e.target.value)}
//                                     />
//                                 </>
//                             );
//                         }
//                     }
//                 })()}
//
//                 <div className="d-flex flex-row justify-content-between">
//                     {formType === "login" ? (
//                         <p>
//                             Not registered yet ? Register
//                             <Link to="/register"> Here !</Link>
//                         </p>
//                     ) : (
//                         <p>
//                             Already User Please
//                             <Link to="/login"> Login !</Link>
//                         </p>
//                     )}
//                     <button className="btn btn-primary" type="submit">
//                         {submitBtn}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };
//
// export {Form};
import React, { useState } from "react";
import { InputType } from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("donor");
    const [name, setName] = useState("");
    const [organisationName, setOrganisationName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (formType === "login") {
                        handleLogin(e, email, password);
                    } else if (formType === "register") {
                        handleRegister(
                            e,
                            name,
                            role,
                            email,
                            password,
                            phone,
                            organisationName,
                            address,
                            hospitalName,
                            website
                        );
                    }
                }}
            >
                <h1 className="text-center">{formTitle}</h1>
                <hr />
                {/* Render role selection for registration */}
                {formType === "register" && (
                    <div className="d-flex mb-3">
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="role"
                                id="donorRadio"
                                value={"donor"}
                                onChange={handleRoleChange}
                                defaultChecked
                            />
                            <label htmlFor="donorRadio" className="form-check-label">
                                Donor
                            </label>
                        </div>
                        {/* Render other role options similarly */}
                    </div>
                )}

                {/* Render additional fields based on role */}
                {(formType === "register" && (role === "admin" || role === "donor")) && (
                    <InputType
                        labelText={"Name"}
                        labelFor={"forName"}
                        inputTape={"text"}
                        name={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                {formType === "register" && role === "organisation" && (
                    <InputType
                        labelText={"Organisation Name"}
                        labelFor={"forOrganisationName"}
                        inputTape={"text"}
                        name={"organisationName"}
                        value={organisationName}
                        onChange={(e) => setOrganisationName(e.target.value)}
                    />
                )}
                {formType === "register" && role === "hospital" && (
                    <InputType
                        labelText={"Hospital Name"}
                        labelFor={"forHospitalName"}
                        inputTape={"text"}
                        name={"hospitalName"}
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                    />
                )}

                {/* Render common fields */}
                <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputTape={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputTape={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputType
                    labelText={"website"}
                    labelFor={"forWebsite"}
                    inputTape={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
                <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputTape={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputTape={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <div className="d-flex flex-row justify-content-between">
                    {formType === "login" ? (
                        <p>
                            Not registered yet? Register
                            <Link to="/register"> Here!</Link>
                        </p>
                    ) : (
                        <p>
                            Already a user? Please
                            <Link to="/login"> Login!</Link>
                        </p>
                    )}
                    <button className="btn btn-primary" type="submit">
                        {submitBtn}
                    </button>
                </div>
            </form>
        </div>
    );
};

export { Form };
