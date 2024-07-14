import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        username: '',
        phone: '',
        email: '',
        role: ''
    },
    reducers: {
        setUser(state, user) {
            state.id = user.payload.id;
            state.username = user.payload.username;
            state.phone = user.payload.phone;
            state.email = user.payload.email;
            state.role = user.payload.role;
        },
        removeUser(state) {
            state.id = '';
            state.username = '';
            state.phone = '';
            state.email = '';
            state.role = '';
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;