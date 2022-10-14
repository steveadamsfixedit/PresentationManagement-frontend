<template>
  <div v-if="!settings" class="bg-zinc-800 h-screen">
    <div class="grid grid-cols-6 gap-4 mb-16">
      <div class="mt-16 text-white text-right col-span-2 pt-4">
        <h1 class="text-6xl font-light">{{ date.toLocaleTimeString() }}</h1>
        <h2 class="text-4xl font-light text-gray-300 underline">{{ day }}, {{ month }} {{ date.getDate() }}</h2>
      </div>
      <div class="mt-16 text-white text-left col-span-4">
        <h2 class="text-9xl">{{ selectedLocation }}</h2>
      </div>
    </div>
    <div class="mt-8 grid grid-cols-6 gap-x-6 grid-rows-auto" v-for="presentation in presentations" >
      <div class="text-white text-right col-span-2">
        <div class="pt-3" v-if="new Date(presentation.time) < date && new Date(presentation.endtime) > date">
          <h2 class="text-3xl text-emerald-400">In Progress</h2>
          <h3 class="text-2xl">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h3>
        </div>
        <div class="pt-3" v-else-if="new Date(presentation.endtime) < date">
          <h2 class="text-3xl text-sky-500">Completed</h2>
          <h3 class="text-2xl">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h3>
        </div>
        <div class="pt-6" v-else>
          <h3 class="text-3xl">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h3>
        </div>
      </div>
      <div class="text-white text-left col-span-4">
        <h2 class="text-5xl">{{ presentation.title }}</h2>
        <h2 class="text-3xl text-gray-300 font-normal">Presented by: {{ presentation.speaker }}</h2>
      </div>
    </div>

    <div class="h-100">
      <div class="absolute inset-x-0 bottom-0 h-100 p-10">
        <img
            v-for="sponsor in selectedSponsors"
            :src="`http://localhost:8085/api/images/sponsors/${sponsor.sponsor}`"
            class="max-h-100"
        />
      </div>
    </div>
  </div>
  <div class="m-10" v-else>
    <h1 class="text-2xl">Digital Display Setup</h1>
    <br>
    <form>
      <label for="room">Selection which location this display is located at: </label>
      <select id="room" name="room" v-model="selectedLocation">
        <option v-for="location in locations" :id="location.id" :value="location">{{ location }}</option>
      </select>
      <br>
      <br>

      <h1 class="text-lg">Select the sponsors you want to appear on this display:</h1>
      <div v-for="sponsor in sponsors" :id="sponsor">
        <input type="checkbox" :name="sponsor.sponsor" :id="sponsor.sponsor" @click="sponsor.active = !sponsor.active" />
        <label
            :for="sponsor.sponsor"
            :class="{ 'border border-4 border-emerald-400 opacity-50': sponsor.active }"
            :style="`background-image: url('http://localhost:8085/api/images/sponsors/${sponsor.sponsor}'); height: 100px; width: 100px; display:inline-block;padding: 0 0 0 0px;`"
        ></label>
      </div>

      <br><br>
      <button type="submit" class="text-white font-light focus:ring-4 focus:ring-zinc-800 font-medium rounded-md text-sm px-5 py-2.5 m-2 mx-auto bg-zinc-500 hover:text-emerald-500 hover:bg-zinc-800 hover:border-emerald-500 transition duration-200 " @click="onSubmit">Save Settings</button>
    </form>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
library.add(faCalendar);

// STORES
import { usePresentationStore } from '@/stores/presentations.js';

const presentationStore = usePresentationStore();
presentationStore.updateDB()

let locations = computed(() => presentationStore.getLocation);
let sponsors = computed(() => presentationStore.getSponsors);

import { ref } from 'vue';
const settings = ref(true)

let selectedLocation = ref(null)
let selectedSponsors = ref([])

const date = ref(new Date());
const month = ref(null);
const day = ref(null);

let presentations = computed(() => presentationStore.getPresentationsAt(selectedLocation))

function onSubmit() {
  if(selectedLocation.value != null){
    sponsors.value.forEach((sponsor) => {
      if(sponsor.active){
        selectedSponsors.value.push(sponsor)
      }
    })
    settings.value = false
    console.log(selectedSponsors.value)
  }else{
    alert("Location must be selected.")
  }
}

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

const days = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
}


setInterval(() => {
  date.value = new Date()
  day.value = days[date.value.getDay()]
  month.value = months[date.value.getMonth()]
}, 1000)

</script>

<style scoped>
li{
  cursor: pointer;
}

input[type=checkbox] {
  display:none;
}

input[type=checkbox] + label{
  height: 100px;
  width: 100px;
  display:inline-block;
  padding: 0 0 0 0px;
}
</style>