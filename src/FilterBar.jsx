import { useTasks } from "./context/useTasks";

const FilterBar = () => {
	const { handleFilter } = useTasks();

	return (
		<div className="flex justify-center space-x-5 mb-5">
			<button
				className="bg-primary px-2 py-1 rounded font-bold cursor-pointer w-32"
				onClick={() => handleFilter("all")}
			>
				All
			</button>
			<button
				className="bg-primary px-2 py-1 rounded font-bold cursor-pointer w-32"
				onClick={() => handleFilter("completed")}
			>
				Completed
			</button>
			<button
				className="bg-primary px-2 py-1 rounded font-bold cursor-pointer w-32"
				onClick={() => handleFilter("incomplete")}
			>
				Incomplete
			</button>
		</div>
	);
};

export default FilterBar;
