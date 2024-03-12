import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast';
import { BASE_URL } from './../services/apis';

const initialState = {
    token: typeof window !== 'undefined' ? sessionStorage.getItem('token') : null,
    name: "",
    email: '',
    role: '',
    _id: '',
};

export const loginAdmin = createAsyncThunk(
    "admin/loginAdmin",
    async (user) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/adminsLogin`, {
                email: user.email,
                password: user.password
            });
            if (res.data.success) {
                toast.success("Login Successful")
                sessionStorage.setItem('token', res.data.token);
            }

            return res.data.token;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loadAdmin(state, action) {
            const token = state.token

            if (token) {
                const user = jwtDecode(token);

                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    role: user.role,
                };
            }
        },
        logoutAdmin(state, action) {
            sessionStorage.removeItem('token');

            return {
                ...state,
                token: "",
                name: "",
                email: '',
                role: '',
                _id: '',
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAdmin.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    role: user.role,
                }
            }
            else {
                return state
            }
        });
    }
});

export const { loadAdmin, logoutAdmin } = adminSlice.actions
export default adminSlice.reducer