import { Avatar, Center, LoadingOverlay, Stack, Text } from "@mantine/core";
import { useGetUserQuery } from "../redux/baseApi";

const UserDetail = ({ id }: { id: number }) => {
	const { data: user, isFetching } = useGetUserQuery(id);

	return (
		<Center>
			<LoadingOverlay visible={isFetching} zIndex={1000} overlayProps={{ blur: 10 }} />

			<Avatar src={user?.avatar} alt={user?.id + "_avatar"} size={100} style={{ margin: "15px" }} />
			<Stack>
				<Text fw={500}>{`${user?.first_name} ${user?.last_name}`}</Text>
				<Text size="sm" c="dimmed">
					{user?.email}
				</Text>
			</Stack>
		</Center>
	);
};

export default UserDetail;
