import { userLogin, userRegister } from "../redux/features/auth/authActions";
import {store} from "../redux/store";
import {toast} from "react-toastify";

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if ( !role || !email || !password) {
            return toast("Please Pride All Fields");
        }
        store.dispatch(userLogin({ email, password }));
    } catch (error) {
        console.log(error);
    }
};

// export const handleRegister = (
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
//         if (!role || !email || !password || !phone || !address ||!website || (!name && !organisationName && !hospitalName)) {
//             return toast("Please Pride All Fields");
//         }
//         store.dispatch(
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
//     } catch (error) {
//         console.log(error);
//     }
// };
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
            return toast("Please Provide All Fields");
        }

        // Check if the email is already registered
        const state = store.getState(); // Get the current state from the Redux store
        const users = state.auth.users; // Assuming you have a "users" property in your Redux state

        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            return toast("This email is already registered");
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

        toast("Registration successful!");
    } catch (error) {
        console.log(error);
    }
};