import React from 'react'
import {useSelector} from "react-redux";

import registerImage from "../../assets/images/banner2.jpeg"
import {Form} from "../../components/shared/Form/Form";
import {Spinner} from "../../components/shared/Spinner";


const Register = () =>{
    const{loading,error} = useSelector((state) => state.auth);
    return (
        <>
            {error && alert(error)}
            {loading ? (<Spinner/>) : (
                <div className="row g-0">
                    <div className="col-md-8 form-banner">
                        <img src={registerImage} alt="registerImage"/>
                    </div>
                    <div className="col-md-4 form-container">
                        <Form
                            formTitle={'Register'}
                            submitBtn={'Register'}
                            formType={'register'}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export {Register};