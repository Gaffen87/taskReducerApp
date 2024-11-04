export const taskReducer = (state, action) => {
	switch (action.type) {
		case "setTasks": {
			return { ...state, tasks: action.payload };
		}
		case "addTask": {
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};
		}
		case "updateTask": {
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id ? action.payload : task
				),
			};
		}
		case "deleteTask": {
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		}
		case "setFilter": {
			return { ...state, filter: action.payload };
		}
	}
};
