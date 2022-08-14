export function useTodos() {
  const { data: todos, refresh: refetchTodos } = useFetch("/api/todo");

  const addTodo = async (input: string) => {
    if (!input.trim()) {
      alert("Input can not be empty");
      return;
    }

    await $fetch("/api/todo", {
      method: "post",
      body: {
        item: input,
      },
    });

    refetchTodos();
  };

  const updateTodo = async (id) => {
    await $fetch(`/api/todo/${id}`, { method: "put" });
    refetchTodos();
  };

  const deleteTodo = async (id) => {
    await $fetch(`/api/todo/${id}`, { method: "delete" });
    refetchTodos();
  };

  return { todos, addTodo, updateTodo, deleteTodo };
}
