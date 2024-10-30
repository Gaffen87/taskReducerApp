import { createServer, Model } from "miragejs";

export default function makeServer() {
	createServer({
		models: {
			task: Model,
		},

		seeds(server) {
			server.create("task", {
				title: "Tasks med reducer",
				description: "Task manager exercise",
				completed: false,
			});
			server.create("task", {
				title: "Filter til tasks",
				description: "Task manager exercise",
				completed: false,
			});
			server.create("task", {
				title: "Implementer context",
				description: "Task manager exercise",
				completed: false,
			});
		},

		routes() {
			this.get("/api/tasks", (schema) => {
				return schema.tasks.all();
			});

			this.get("/api/tasks/completed", (schema) => {
				return schema.tasks.where({ completed: true });
			});

			this.post("/api/tasks", (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				return schema.tasks.create(attrs);
			});

			this.put("/api/tasks/:id", (schema, request) => {
				const id = request.params.id;
				const attrs = JSON.parse(request.requestBody);
				const task = schema.tasks.find(id);
				return task.update(attrs);
			});

			this.delete("/api/tasks/:id", (schema, request) => {
				const id = request.params.id;
				schema.tasks.find(id).destroy();
			});
		},
	});
}
