import { Avatar, Button, Card, Group, Text, Center, Title, LoadingOverlay } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { User } from "../schema/User";
import { modals } from "@mantine/modals";
import UserForm from "./UserForm";
import { useRef } from "react";
import UserDetail from "./UserDetail";
import { useDeleteUserMutation } from "../redux/baseApi";
import { useDispatch, useSelector } from "../redux/hooks";
import { selectUserList, setUserList } from "../redux/userSlice";
import { showNotification } from "@mantine/notifications";

interface UserCardProps {
	user: User;
}

const UserCard = ({ user }: UserCardProps) => {
	const editUserModalRef = useRef<string>("");
	const viewUserModalRef = useRef<string>("");

	const dispatch = useDispatch();
	const { users } = useSelector(selectUserList);
	const [deleteUser, { isLoading }] = useDeleteUserMutation();

	const openEditModal = () => {
		editUserModalRef.current = modals.open({
			title: <Title order={2}>Edit User</Title>,
			centered: true,
			children: <UserForm user={user} onClose={() => modals.close(editUserModalRef.current)} />,
		});
	};

	const openViewModal = () => {
		viewUserModalRef.current = modals.open({
			title: "User Details",
			centered: true,
			size: "sm",
			children: <UserDetail id={user.id} />,
		});
	};

	const openDeleteConfirmModal = () => {
		modals.openConfirmModal({
			title: "Delete Category",
			children: (
				<Text size="sm">
					This will delete user {<strong>{`${user.first_name} ${user.last_name}`}</strong>}. Would you like to continue?
				</Text>
			),
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onConfirm: async () => {
				try {
					await deleteUser(user.id).unwrap();
					const updateUserList = users.reduce<User[]>((a, c) => {
						if (c.id !== user.id) {
							a.push(c);
						}
						return a;
					}, []);

					showNotification({
						color: "green",
						title: "Delete User",
						message: `Successfully deleted user : ${name}`,
					});
					dispatch(setUserList({ users: updateUserList }));
				} catch (e) {
					console.log(e);
					showNotification({
						color: "red",
						title: "Delete User",
						message: `Error encountered. Please try again`,
					});
				}
			},
		});
	};

	return (
		<Card shadow="sm" padding="md" radius="md" withBorder>
			<LoadingOverlay visible={isLoading} overlayProps={{ blur: 2, center: true }} />
			<Card.Section>
				<Center>
					<Avatar src={user.avatar} alt={user.id + "_avatar"} size={100} style={{ margin: "15px" }} />
				</Center>
			</Card.Section>

			<Text fw={500}>{`${user.first_name} ${user.last_name}`}</Text>

			<Text size="sm" c="dimmed">
				{user.email}
			</Text>

			<Group gap={6}>
				<Button color="blue" mt="md" radius="md" onClick={openViewModal}>
					View
				</Button>
				<Button color="blue" mt="md" radius="md" leftSection={<IconEdit size={14} />} onClick={openEditModal}>
					Edit
				</Button>
				<Button color="red" mt="md" radius="md" leftSection={<IconTrash size={14} />} onClick={openDeleteConfirmModal}>
					Delete
				</Button>
			</Group>
		</Card>
	);
};

export default UserCard;
