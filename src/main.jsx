import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import makeServer from "./api/mockApi";
import { TaskProvider } from "./context/taskContext.jsx";

makeServer();

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<TaskProvider>
		<App />
	</TaskProvider>
	// </StrictMode>
);
