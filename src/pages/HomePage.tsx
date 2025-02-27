import { Button, Flex, Group, Title } from "@mantine/core";
import { UserForm, UserList } from "../components";
import { IconUserPlus } from "@tabler/icons-react";
import { useRef } from "react";
import { modals } from "@mantine/modals";

const HomePage = () => {
	const createUserModalRef = useRef<string>("");

	const openCreateModal = () => {
		createUserModalRef.current = modals.open({
			title: <Title order={2}>Create User</Title>,
			centered: true,
			children: <UserForm onClose={() => modals.close(createUserModalRef.current)} />,
		});
	};

	return (
		<>
			<Flex gap="md" justify="center" align="center" direction="column">
				<Group align="center" justify="space-between">
					<Title order={1}>User Lists</Title>
					<Button variant="filled" leftSection={<IconUserPlus size={14} />} onClick={openCreateModal}>
						Add User
					</Button>
				</Group>
				<UserList></UserList>
			</Flex>
		</>
	);
};

export default HomePage;
