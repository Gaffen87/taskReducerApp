import Task from "./Task";

const TaskList = ({ tasks, handleEdit, handleDelete }) => {
	return tasks.map((task) => (
		<Task
			key={task.id}
			task={task}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	));
};

export default TaskList;
