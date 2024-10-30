import { useEffect, useReducer, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { taskReducer } from "./reducers/taskReducer";

const initialState = {
	tasks: [],
	filter: "all",
};

function App() {
	const [state, dispatch] = useReducer(taskReducer, initialState);
	const [isLoading, setIsLoading] = useState(true);

	const filteredTasks = state.tasks.filter((task) => {
		if (state.filter === "completed") return task.completed;
		if (state.filter === "incomplete") return !task.completed;
		return true;
	});

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
		setIsLoading(true);
		const response = await addTaskToDb(newTask);
		const data = await response.json();
		if (response.statusText === "Created") {
			dispatch({ type: "addTask", payload: data.task });
		}
		setIsLoading(false);
	};
	const handleEdit = async (updatedTask) => {
		setIsLoading(true);
		const response = await updateTaskInDb(updatedTask);
		if (response.statusText === "OK") {
			const data = await response.json();
			dispatch({ type: "updateTask", payload: data.task });
		}
		setIsLoading(false);
	};
	const handleDelete = async (taskId) => {
		setIsLoading(true);
		const response = await deleteTaskFromDb(taskId);
		if (response.statusText === "No Content") {
			dispatch({ type: "deleteTask", payload: taskId });
		}
		setIsLoading(false);
	};
	const handleFilter = (filter) => {
		dispatch({ type: "setFilter", payload: filter });
	};

	useEffect(() => {
		const getTasks = async () => {
			const response = await fetch("api/tasks");
			const data = await response.json();
			if (state.tasks.length === 0) {
				dispatch({ type: "setTasks", payload: data.tasks });
			}
		};
		getTasks();
		setIsLoading(false);
	}, [state.tasks.length]);

	return (
		<div className="flex flex-col items-center p-10">
			<div className="w-7/12">
				<h1 className="text-3xl font-semibold mb-10 text-center">
					TASK MANAGER
				</h1>
				<TaskForm handleSubmit={handleSubmit} isLoading={isLoading} />
				<div className="flex justify-center space-x-5 mb-5">
					<button
						className="bg-primary px-2 py-1 rounded font-bold cursor-pointer"
						onClick={() => handleFilter("all")}
					>
						All
					</button>
					<button
						className="bg-primary px-2 py-1 rounded font-bold cursor-pointer"
						onClick={() => handleFilter("completed")}
					>
						Completed
					</button>
					<button
						className="bg-primary px-2 py-1 rounded font-bold cursor-pointer"
						onClick={() => handleFilter("incomplete")}
					>
						Incomplete
					</button>
				</div>
				<hr className="h-3" />
				<TaskList
					tasks={filteredTasks}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
			</div>
		</div>
	);
}

export default App;
