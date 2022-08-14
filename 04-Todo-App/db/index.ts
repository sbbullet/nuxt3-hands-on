interface TodoItem {
  id: string;
  item: string;
  completed: boolean;
}

export const db: {
  todos: TodoItem[];
} = {
  todos: [],
};
