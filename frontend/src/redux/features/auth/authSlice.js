// import { createSlice } from "@reduxjs/toolkit";
// import { getCurrentUser, userLogin, userRegister } from "./authActions";
//
// const token = localStorage.getItem("token")
//     ? localStorage.getItem("token")
//     : null;
//
// const initialState = {
//     loading: false,
//     user: null,
//     token,
//     error: null,
// };
//
// const authSlice = createSlice({
//     name: "auth",
//     initialState: initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         // login user
//         builder.addCase(userLogin.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(userLogin.fulfilled, (state, { payload }) => {
//             state.loading = false;
//             state.user = payload.user;
//             state.token = payload.token;
//         });
//         builder.addCase(userLogin.rejected, (state, { payload }) => {
//             state.loading = false;
//             state.error = payload;
//         });
//         // REGISTER user
//         builder.addCase(userRegister.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(userRegister.fulfilled, (state, { payload }) => {
//             state.loading = false;
//             state.user = payload.user;
//         });
//         builder.addCase(userRegister.rejected, (state, { payload }) => {
//             state.loading = false;
//             state.error = payload;
//         });
//         // CURRENT user
//         builder.addCase(getCurrentUser.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
//             state.loading = false;
//             state.user = payload.user;
//         });
//         builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
//             state.loading = false;
//             state.error = payload;
//         });
//     },
// });
//
// export {authSlice};

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";

const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

const initialState = {
    loading: false,
    user: null,
    token,
    error: null,
};

// Створіть асинхронний thunk для реєстрації користувача
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, thunkAPI) => {
        // Отримати поточний стан аутентифікації з Redux Store
        const { auth } = thunkAPI.getState();

        // Перевірте, чи існує користувач з такою ж поштою
        if (auth.user && auth.user.email === userData.email) {
            // Якщо так, поверніть помилку дубльованої реєстрації
            throw new Error("User with this email already exists");
        }

        // В іншому випадку виконайте реєстрацію як зазвичай
        const response = await userRegister(userData);

        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // login user
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token;
        });
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        // REGISTER user
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
        });
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        // CURRENT user
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
        });
        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        // Register user (custom async thunk)
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
        });
        builder.addCase(registerUser.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        });
    },
});

export { authSlice };
