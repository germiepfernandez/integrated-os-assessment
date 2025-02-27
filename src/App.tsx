import { Provider } from "react-redux";
import { store } from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { Router } from "./Router";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";

const persistor = persistStore(store);

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<MantineProvider>
					<ModalsProvider>
						<Notifications position="top-right" />
						<Router />
					</ModalsProvider>
				</MantineProvider>
			</PersistGate>
		</Provider>
	);
}

export default App;
