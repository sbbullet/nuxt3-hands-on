import { db } from "../../../db";

const todoNotFoundError = createError({
  statusCode: 404,
  statusMessage: "Todo not found",
});

const findTodoById = (todoId: string) => {
  let index = -1;
  const todo = db.todos.find((t, i) => {
    if (t.id === todoId) {
      index = i;
      return true;
    } else {
      return false;
    }
  });

  return {
    todo,
    index,
  };
};

export default defineEventHandler((e) => {
  const method = e.req.method;
  const { id } = e.context.params;

  const { todo, index } = findTodoById(id);
  if (!todo) {
    return sendError(e, todoNotFoundError);
  }

  if (method === "PUT") {
    db.todos[index].completed = !db.todos[index].completed;
    return db.todos[index];
  }

  if (method === "DELETE") {
    db.todos.splice(index, 1);
    return {
      message: "Todo item deleted",
    };
  }
});
