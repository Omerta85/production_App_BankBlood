import { userLogin, userRegister } from "../redux/features/auth/authActions";
import {store} from "../redux/store";
import {toast} from "react-toastify";

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if ( !email || !password) {
            return toast("Please Pride All Fields");
        }
        store.dispatch(userLogin({ email, password }));
    } catch (error) {
        console.log(error);
    }
};

export const handleRegister = (
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
) => {
    e.preventDefault();
    try {
        if (!role || !email || !password || !phone || !address ||!website || (!name && !organisationName && !hospitalName)) {
            return toast("Please Pride All Fields");
        }
        store.dispatch(
            userRegister({
                name,
                role,
                email,
                password,
                phone,
                organisationName,
                address,
                hospitalName,
                website,
            })
        );
    } catch (error) {
        console.log(error);
    }
};