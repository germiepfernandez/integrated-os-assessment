export interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

export interface UserFormValues {
	first_name: string;
	last_name: string;
	email: string;
	job: string;
}

export interface GetUserListResponse {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: User[];
}

export interface GetUserResponse {
	data: User;
}

export interface UpdateUserRequest {
	id: number;
	name: string;
	job: string;
}
export interface UpdateUserResponse {
	name: string;
	job: string;
	updatedAt: string;
}

export interface CreateUserRequest {
	name: string;
	job: string;
}
export interface CreateUserResponse {
	id: number;
	name: string;
	job: string;
	updatedAt: string;
}
