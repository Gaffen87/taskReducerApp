import Task from "./Task";

const TaskList = ({ tasks }) => {
	return tasks.map((task) => <Task key={task.id} task={task} />);
};

export default TaskList;
