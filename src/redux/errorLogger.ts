import { isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
	if (isRejectedWithValue(action)) {
		console.warn("We got a rejected action!");
		console.log(api);
	}

	return next(action);
};
