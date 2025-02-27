import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from "../schema/User";

interface UserState {
	users: User[];
}

const initialState: UserState = {
	users: [],
};

export const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserList: (state, action: PayloadAction<Partial<UserState>>) => {
			const { users } = action.payload;
			state.users = users ?? state.users;
		},
	},
});

export const { setUserList } = userSlice.actions;

export default userSlice.reducer;

export const selectUserList = (state: RootState) => state.users;
