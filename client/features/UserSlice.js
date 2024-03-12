import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import toast from 'react-hot-toast';
import { BASE_URL } from './../services/apis';

const initialState = {
    token: typeof window !== 'undefined' ? sessionStorage.getItem('userToken') : null,
    name: "",
    email: '',
    _id: '',
};

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (user) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/userLogin`, {
                email: user.email,
                password: user.password
            });
            // console.log(res.data);
            if (res.data.success) {
                toast.success("Login Successful")
                sessionStorage.setItem('userToken', res.data.token);
            }

            return res.data.token;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token

            if (token) {
                const user = jwtDecode(token);

                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    hasSubscription: user.hasSubscription,
                };
            }
        },
        logoutUser(state, action) {
            sessionStorage.removeItem('userToken');

            return {
                ...state,
                token: "",
                name: "",
                email: '',
                hasSubscription: '',
                _id: '',
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    hasSubscription: user.hasSubscription,
                }
            }
            else {
                return state
            }
        });
    }
});

export const { loadUser, logoutUser } = userSlice.actions
export default userSlice.reducer