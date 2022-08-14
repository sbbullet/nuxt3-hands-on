<script setup lang="ts">
const config = useRuntimeConfig();
const cookie = useCookie("city");
if (!cookie.value) {
  cookie.value = "Butwal";
}

let searchTerm = ref(cookie.value);
let input = ref("");
const background = ref("");

const goBack = () => {
  searchTerm.value = cookie.value;
};

const { data: city } = useAsyncData(
  "city",
  async () => {
    let response;
    try {
      response = await $fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm.value}`,
        {
          params: {
            units: "metric",
            appid: config.OPEN_WEATHER_MAP_API_KEY,
          },
        }
      );

      cookie.value = searchTerm.value;
      const temp = response.main.temp;

      if (temp <= -10) {
        background.value =
          "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
      } else if (temp > -10 && temp <= 0) {
        background.value =
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
      } else if (temp > 0 && temp <= 10) {
        background.value =
          "https://images.unsplash.com/photo-1560258018-c7db7645254e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4032&q=80";
      } else {
        background.value =
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3546&q=80";
      }

      return response;
    } catch (err) {
      return response;
    }
  },
  {
    watch: [searchTerm],
  }
);

const handleClick = () => {
  const formattedSearch = encodeURIComponent(input.value.trim());
  searchTerm.value = formattedSearch;
  input.value = "";
};
</script>

<template>
  <div v-if="city" class="h-screen relative overflow-hidden">
    <img :src="background" />
    <div class="absolute w-full h-full top-0 overlay" />
    <div class="absolute w-full h-full top-0 p-48">
      <div class="flex justify-between">
        <div>
          <h1 class="text-9xl text-white font-light">{{ city.name }}</h1>
          <p class="font-light text-2xl mt-2 text-white">
            {{
              new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            }}
          </p>
          <img
            :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`"
            class="w-56 icon"
          />
        </div>
        <div>
          <p class="text-9xl text-white font-extralight">
            {{ city.main.temp.toFixed(1) }}°
          </p>
        </div>
      </div>
      <div class="mt-20">
        <input
          type="text"
          class="w-1/2 h-10"
          placeholder="Search a city..."
          v-model="input"
          @keyup.enter="handleClick"
        />
        <button
          class="bg-sky-400 w-20 text-white h-10"
          @click.stop="handleClick"
        >
          Search
        </button>
      </div>
    </div>
  </div>
  <div v-else class="p-10">
    <h1 class="text-7xl">Oops, we can't find that city</h1>
    <button class="mt-5 bg-sky-400 px-10 w-50 text-white h-10" @click="goBack">
      Go Back
    </button>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
.icon {
  margin-left: -2.75rem;
  margin-top: -2.75rem;
}
</style>
