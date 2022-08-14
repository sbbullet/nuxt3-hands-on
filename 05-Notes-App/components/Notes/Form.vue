<script setup lang="ts">
const { supabase } = useSupabase();
const { user } = useAuth();

interface NoteFormFields {
  title: string;
  body: string;
}
const form = reactive<NoteFormFields>({
  title: "",
  body: "",
});

const addNote = async () => {
  if (!(form.title.trim() && form.body.trim())) {
    return;
  }

  await supabase.from("notes").insert({
    title: form.title,
    body: form.body,
    user_id: user.value.id,
  });

  form.title = "";
  form.body = "";
};
</script>

<template>
  <NCard class="card">
    <input class="input" type="text" placeholder="Title" v-model="form.title" />
    <textarea
      class="input"
      placeholder="My note"
      v-model="form.body"
    ></textarea>
    <NButton @click.stop="addNote">Save Note</NButton>
  </NCard>
</template>

<style scoped>
.card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.input {
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  border-radius: 0.2rem;
  padding: 0.5rem;
}
</style>
