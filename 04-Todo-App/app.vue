<script setup lang="ts">
import { useTodos } from "./composables/useTodos";

const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
const input = ref<string>("");
</script>

<template>
  <div class="container">
    <NCard class="cards">
      <h1>My Todos</h1>
      <div class="add-todo">
        <input
          placeholder="Add a new todo..."
          v-model="input"
          @keyup.enter="
            () => {
              addTodo(input);
              input = '';
            }
          "
        />
        <NButton @click.stop="addTodo">Add</NButton>
      </div>
      <NCard class="card" v-for="todo in todos" :key="todo.id">
        <h4
          @click.stop="updateTodo(todo.id)"
          :class="todo.completed ? 'complete' : null"
        >
          {{ todo.item }}
        </h4>
        <p @click.stop="deleteTodo(todo.id)">x</p>
      </NCard>
    </NCard>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 50%;
}
.cards {
  padding: 2rem;
}
input {
  outline: none;
}
.add-todo {
  display: flex;
  justify-content: space-between;
}
.card {
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.complete {
  text-decoration: line-through;
}
</style>
