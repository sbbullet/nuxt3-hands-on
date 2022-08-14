<script setup lang="ts">
import restaurants from "@/data.json";
import { useRoute } from "vue-router";
import { createError } from "h3";

const route = useRoute();

const restaurant = restaurants.find((r) => r.id.toString() === route.params.id);

if (!restaurant) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      {{ restaurant }}
    </NuxtLayout>
  </div>
</template>
