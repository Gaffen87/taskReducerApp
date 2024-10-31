import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";
import { useTasks } from "./context/useTasks";

function App() {
	const { state, getTasks } = useTasks();
	const [isLoading, setIsLoading] = useState(true);
	const filteredTasks = state.tasks.filter((task) => {
		if (state.filter === "completed") return task.completed;
		if (state.filter === "incomplete") return !task.completed;
		return true;
	});

	useEffect(() => {
		getTasks();
		setIsLoading(false);
	}, [getTasks]);

	return (
		<div className="flex flex-col items-center p-10 bg-secondary bg-opacity-5 shadow-xl w-2/3 h-screen mx-auto">
			<div className="w-10/12">
				<h1 className="text-3xl font-semibold mb-10 text-center">
					TASK MANAGER
				</h1>
				<TaskForm isLoading={isLoading} />
				<FilterBar />
				<hr className="h-3" />
				<TaskList tasks={filteredTasks} />
			</div>
		</div>
	);
}

export default App;
