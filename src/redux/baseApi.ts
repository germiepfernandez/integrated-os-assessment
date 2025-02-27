import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	CreateUserRequest,
	CreateUserResponse,
	GetUserListResponse,
	GetUserResponse,
	UpdateUserRequest,
	UpdateUserResponse,
	User,
} from "../schema/User";

const BASE_URL = "https://reqres.in/api/users";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getUsers: builder.query<GetUserListResponse, void>({
			query: () => ({
				url: "",
				method: "GET",
			}),
		}),
		getUser: builder.query<User, number>({
			query: (id) => ({
				url: `/${id}`,
				method: "GET",
			}),
			transformResponse: (response: GetUserResponse) => {
				return response.data;
			},
		}),
		createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
			query: (body) => ({
				url: "",
				method: "POST",
				body,
			}),
		}),
		updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
			query: ({ id, ...body }) => ({
				url: `/${id}`,
				method: "PUT",
				body,
			}),
		}),
		deleteUser: builder.mutation<void, number>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = baseApi;
