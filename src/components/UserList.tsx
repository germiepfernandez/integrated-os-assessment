import { Container, Grid, LoadingOverlay } from "@mantine/core";
import UserCard from "./UserCard";
import { useGetUsersQuery } from "../redux/baseApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../redux/hooks";
import { selectUserList, setUserList } from "../redux/userSlice";

const UserList = () => {
	const dispatch = useDispatch();
	const { users } = useSelector(selectUserList);
	const { data, isFetching } = useGetUsersQuery();

	useEffect(() => {
		if (data) dispatch(setUserList({ users: data?.data }));
	}, [data]);

	return (
		<Container style={{ width: "100%" }}>
			<LoadingOverlay visible={isFetching} zIndex={1000} overlayProps={{ blur: 2 }} loaderProps={{ size: 50 }} />
			<Grid>
				{users?.map((user) => (
					<Grid.Col span={4}>
						<UserCard user={user} />
					</Grid.Col>
				))}
			</Grid>
		</Container>
	);
};

export default UserList;
