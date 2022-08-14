<script setup lang="ts">
const { supabase } = useSupabase();
const { user } = useAuth();

const notesResponse = ref();

if (process.client) {
  (async () => {
    notesResponse.value = await supabase
      .from("notes")
      .select()
      .eq("user_id", user.value.id);
  })();
}

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="container">
    <h3>My Notes</h3>

    <NotesForm></NotesForm>

    <div class="card-container" v-if="notesResponse?.data">
      <NCard class="card" v-for="note in notesResponse.data" :key="note.id">
        <h2>{{ note.title }}</h2>
        <p>{{ note.body }}</p>
      </NCard>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 50%;
  margin: 0 auto;
  height: 90vh;
  margin-top: 2rem;
}

h3 {
  font-size: 2rem;
}

.card {
  padding: 1rem;
  margin-top: 0.5rem;
}

.card h2 {
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 1rem;
}

.card-container {
  margin-top: 1.5rem;
}
</style>
