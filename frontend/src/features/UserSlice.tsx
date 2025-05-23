
import { createSlice } from "@reduxjs/toolkit";


interface UserState {
    user: {
        _id: string;
        username: string;
        role: string
        email: string;
        profilePicture: string;
        createdAt: string;
        updatedAt: string;
    } | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    }


});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectUserRole = (state: { user: UserState }) => state.user.user?.role;
