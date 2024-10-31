import { TaskContext } from "./taskContext";
import { useContext } from "react";

export const useTasks = () => {
	return useContext(TaskContext);
};
