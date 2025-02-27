import { Button, Group, LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { User, UserFormValues } from "../schema/User";
import { useCreateUserMutation, useUpdateUserMutation } from "../redux/baseApi";
import { showNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "../redux/hooks";
import { selectUserList, setUserList } from "../redux/userSlice";

interface UserFormProps {
	onClose: () => void;
	user?: User;
}

const UserForm = ({ user, onClose }: UserFormProps) => {
	const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();
	const [createUser, { isLoading: isCreateUserLoading }] = useCreateUserMutation();

	const dispatch = useDispatch();
	const { users } = useSelector(selectUserList);

	const form = useForm<UserFormValues>({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			first_name: "",
			last_name: "",
			job: "",
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	useEffect(() => {
		if (user) form.setValues(user);
	}, [user]);

	const handleFormSubmit = async (values: UserFormValues) => {
		try {
			const name = `${values.first_name} ${values.last_name}`;
			let updateUserList = [...users];
			if (user) {
				await updateUser({ name: name, id: user.id, job: values.job }).unwrap();
				updateUserList = updateUserList.reduce<User[]>((a, c) => {
					if (c.id === user.id) {
						a.push({ ...user, first_name: values.first_name, last_name: values.last_name, email: values.email });
					} else a.push(c);
					return a;
				}, []);
			} else {
				const data = await createUser({ name: name, job: values.job }).unwrap();
				updateUserList.push({
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					id: data.id,
					avatar: "",
				});
			}

			dispatch(setUserList({ users: updateUserList }));
			showNotification({
				color: "green",
				title: user ? "Create User" : "Update User",
				message: `Successfully ${user ? "created" : "updated"} user : ${name}`,
			});
			onClose();
		} catch (e) {
			console.log(e);
			showNotification({
				color: "red",
				title: user ? "Create User" : "Update User",
				message: `Error encountered. Please try again`,
			});
		}
	};

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)}>
			<LoadingOverlay
				visible={isUpdateUserLoading || isCreateUserLoading}
				zIndex={1000}
				overlayProps={{ blur: 2 }}
				loaderProps={{ size: 50 }}
			/>

			<Stack>
				<TextInput
					key={form.key("first_name")}
					{...form.getInputProps("first_name")}
					required
					label="First name"
					placeholder="Please input your first name"
				/>
				<TextInput
					key={form.key("last_name")}
					{...form.getInputProps("last_name")}
					required
					label="Last name"
					placeholder="Please input your last name"
				/>
				<TextInput
					key={form.key("email")}
					{...form.getInputProps("email")}
					required
					label="Email"
					placeholder="Please input your email"
				/>
				<TextInput key={form.key("job")} {...form.getInputProps("job")} required label="Job" placeholder="Please input your job" />
				<Group justify="flex-end" mt="md">
					<Button color="gray" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">Submit</Button>
				</Group>
			</Stack>
		</form>
	);
};

export default UserForm;
