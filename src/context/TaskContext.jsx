import { createContext, useReducer } from "react";
import { taskReducer } from "../reducers/taskReducer";

const TaskContext = createContext(null);

const initialState = {
	tasks: [],
	filter: "all",
};

const TaskProvider = ({ children }) => {
	const [state, dispatch] = useReducer(taskReducer, initialState);

	const getTasks = async () => {
		const response = await fetch("api/tasks");
		const data = await response.json();
		if (state.tasks.length === 0) {
			dispatch({ type: "setTasks", payload: data.tasks });
		}
	};
	const addTaskToDb = async (newTask) => {
		return await fetch("api/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTask),
		});
	};
	const updateTaskInDb = async (updatedTask) => {
		return await fetch(`api/tasks/${updatedTask.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTask),
		});
	};
	const deleteTaskFromDb = async (taskId) => {
		return await fetch(`api/tasks/${taskId}`, {
			method: "DELETE",
		});
	};
	const handleSubmit = async (newTask) => {
		const response = await addTaskToDb(newTask);
		const data = await response.json();
		if (response.statusText === "Created") {
			dispatch({ type: "addTask", payload: data.task });
		}
	};
	const handleEdit = async (updatedTask) => {
		const response = await updateTaskInDb(updatedTask);
		if (response.statusText === "OK") {
			const data = await response.json();
			dispatch({ type: "updateTask", payload: data.task });
		}
	};
	const handleDelete = async (taskId) => {
		const response = await deleteTaskFromDb(taskId);
		if (response.statusText === "No Content") {
			dispatch({ type: "deleteTask", payload: taskId });
		}
	};
	const handleFilter = (filter) => {
		dispatch({ type: "setFilter", payload: filter });
	};

	return (
		<TaskContext.Provider
			value={{
				state,
				handleSubmit,
				handleEdit,
				handleDelete,
				handleFilter,
				getTasks,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export { TaskProvider, TaskContext };
