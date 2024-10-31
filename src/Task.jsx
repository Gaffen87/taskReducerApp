import { useState } from "react";
import { useTasks } from "./context/useTasks";

const Task = ({ task }) => {
	const { handleEdit, handleDelete } = useTasks();
	const [editTask, setEditTask] = useState(task);
	const [edit, setEdit] = useState(false);

	return (
		<div
			className={`flex w-full justify-between items-center font-mono hover:bg-secondary hover:bg-opacity-10 transition-all duration-500 ${
				editTask.completed && !edit ? "opacity-40" : ""
			} ${edit ? "bg-secondary bg-opacity-5 py-5" : "mb-2 py-2"}`}
		>
			{edit ? (
				<>
					<input
						className="text-black w-1/6 p-1 mr-auto"
						value={editTask.title}
						onChange={(e) =>
							setEditTask({ ...editTask, title: e.target.value })
						}
						maxLength={15}
					/>
					<input
						className="text-black w-1/2 p-1"
						value={editTask.description}
						onChange={(e) =>
							setEditTask({ ...editTask, description: e.target.value })
						}
						maxLength={30}
					/>
				</>
			) : (
				<>
					<h3
						className={`font-bold w-3/12 pl-1 leading-4 mr-auto ${
							editTask.completed ? "line-through" : ""
						}`}
					>
						{editTask.title}
					</h3>
					<p
						className={`w-1/2 pl-1 opacity-70 ${
							editTask.completed ? "line-through" : ""
						}`}
					>
						{editTask.description}
					</p>
				</>
			)}

			<input
				className="scale-125 ml-auto mr-5"
				type="checkbox"
				checked={editTask.completed}
				onChange={() => {
					setEditTask({ ...editTask, completed: !editTask.completed });
					handleEdit({ ...editTask, completed: !editTask.completed });
				}}
			/>
			<div className="space-x-2">
				<button
					className={`text-black px-2 py-1 rounded font-bold cursor-pointer hover:bg-opacity-80 active:scale-90 ${
						edit ? "bg-danger" : "bg-secondary"
					}`}
					onClick={() => {
						setEdit(!edit);
						if (edit) {
							handleEdit(editTask);
						}
					}}
				>
					{edit ? "Save" : "Edit"}
				</button>
				<button
					className="bg-secondary text-black px-2 py-1 rounded font-bold cursor-pointer hover:bg-opacity-80 active:scale-90"
					onClick={() => {
						handleDelete(editTask.id);
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Task;
