// import { getCurrentUser, userLogin, userRegister } from "../redux/features/auth/authActions";
// import { store } from "../redux/store";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
//
// export const handleLogin = (e, email, password, role) => {
//     e.preventDefault();
//     try {
//         if (!role || !email || !password) {
//             toast.error("Please Provide All Fields");
//         }
//         store.dispatch(userLogin({ email, password }));
//     } catch (error) {
//         console.log(error);
//     }
// };
//
// export const handleRegister = async (
//     e,
//     name,
//     role,
//     email,
//     password,
//     phone,
//     organisationName,
//     address,
//     hospitalName,
//     website
// ) => {
//     e.preventDefault();
//     try {
//         if (!role || !email || !password || !phone || !address || !website || (!name && !organisationName && !hospitalName)) {
//             toast.error("Please Provide All Fields");
//         }
//
//         await store.dispatch(getCurrentUser());
//
//         const state = store.getState();
//         const users = state.auth.user;
//
//         if (users === null) {
//             toast.error("User data is still loading. Please try again.");
//             return;
//         }
//
//         const existingUser = users.find((user) => user.email === email);
//         if (existingUser) {
//             toast.error("This email is already registered");
//             return;
//         }
//
//         await store.dispatch(
//             userRegister({
//                 name,
//                 role,
//                 email,
//                 password,
//                 phone,
//                 organisationName,
//                 address,
//                 hospitalName,
//                 website,
//             })
//         );
//
//         toast.success("Registration successful!");
//
//         const navigate = useNavigate();
//         navigate("/login");
//     } catch (error) {
//         console.log(error);
//     }
// };


import { userLogin, userRegister } from "../redux/features/auth/authActions";
import {store} from "../redux/store";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const handleLogin = async (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!role || !email || !password) {
            return toast("Please Pride All Fields");
        }
        await store.dispatch(userLogin({ email, password, role }));
    } catch (error) {
        console.log(error);
    }
};

export const handleRegister = async (
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
        if (!role || !email || !password || !phone || !address || !website || (!name && !organisationName && !hospitalName)) {
            toast.error("Please Provide All Fields");
        }
        await store.dispatch(
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
        toast.success("Registration successful!");
       const navigate = useNavigate();
        navigate("/login");
    } catch (error) {
        console.log(error);
    }
};