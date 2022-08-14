import { randomUUID } from "crypto";
import { db } from "../../../db";

export default defineEventHandler(async (e) => {
  if (e.req.method === "GET") {
    return db.todos;
  }

  if (e.req.method === "POST") {
    const body = await useBody(e.req);
    if (!body?.item.trim()) {
      return sendError(
        e,
        createError({
          statusCode: 400,
          statusMessage: "Item cannot be empty",
        })
      );
    }

    const newTodo = {
      id: randomUUID(),
      item: body.item,
      completed: false,
    };

    db.todos.push(newTodo);

    return newTodo;
  }
});
