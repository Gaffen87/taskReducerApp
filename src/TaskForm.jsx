import { useState } from "react";
import { useTasks } from "./context/useTasks";

const TaskForm = () => {
	const [task, setTask] = useState({
		title: "",
		description: "",
		completed: false,
	});
	const { handleSubmit } = useTasks();

	return (
		<form
			className="space-x-3 mb-5 flex justify-center"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(task);
				setTask({ title: "", description: "", completed: false });
			}}
		>
			<input
				className="bg-primary bg-opacity-30 p-1"
				type="text"
				placeholder="Title"
				value={task.title}
				onChange={(e) => {
					setTask({ ...task, title: e.target.value });
				}}
			/>
			<input
				className="bg-primary bg-opacity-30 p-1"
				type="text"
				placeholder="Description"
				value={task.description}
				onChange={(e) => {
					setTask({ ...task, description: e.target.value });
				}}
			/>
			<button
				className="bg-danger border-4 border-black text-black px-2 py-1 rounded font-bold cursor-pointer"
				type="submit"
			>
				Add Task
			</button>
		</form>
	);
};

export default TaskForm;
