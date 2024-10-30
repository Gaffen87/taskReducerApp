import { useState } from "react";

const TaskForm = ({ handleSubmit }) => {
	const [task, setTask] = useState({
		title: "",
		description: "",
		completed: false,
	});

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
				className="bg-primary p-1"
				type="text"
				placeholder="Title"
				minLength={3}
				value={task.title}
				onChange={(e) => {
					setTask({ ...task, title: e.target.value });
				}}
			/>
			<input
				className="bg-primary p-1"
				type="text"
				placeholder="Description"
				minLength={3}
				value={task.description}
				onChange={(e) => {
					setTask({ ...task, description: e.target.value });
				}}
			/>
			<button
				className="bg-danger text-black px-2 py-1 rounded font-bold cursor-pointer"
				type="submit"
			>
				Add Task
			</button>
		</form>
	);
};

export default TaskForm;
