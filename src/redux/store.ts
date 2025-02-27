import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rtkQueryErrorLogger } from "./errorLogger.ts";
import { baseApi } from "./baseApi";
import { userSlice } from "./userSlice.ts";

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	users: userSlice.reducer,
});

const persistedReducer = persistReducer({ key: "root", whitelist: ["auth"], storage }, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(baseApi.middleware)
			.concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
