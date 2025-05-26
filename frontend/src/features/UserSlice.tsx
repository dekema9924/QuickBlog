
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: {
        _id: string | null;
        username: string | null;
        role: string;
        email: string | null;
        profilePicture: string | null;
        createdAt: string | null;
        updatedAt: string | null;
    } | null,
}

const initialState: UserState = {
    user: {
        _id: null,
        username: null,
        role: "standard",
        email: null,
        profilePicture: null,
        createdAt: null,
        updatedAt: null,
    },

};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;

        },
        clearUser: (state) => {
            state.user = null;

        },
    }


});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectUserRole = (state: { user: UserState }) => state.user.user?.role;
