<template>
  <div v-if="!settings" class="h-screen p-14" style="background-color: #1a2751;">
    <img
      src="@/assets/HeaderLogo.jpg"
      alt="Logo"
      class="max-w-4xl align-center mx-auto"
      />
    <div class="grid grid-cols-5 gap-4 mb-5">
      <div class="text-white text-left col-span-2">
        <h1 class="text-6xl font-light">{{ date.toLocaleTimeString() }}</h1>
        <h2 class="text-3xl font-light text-gray-300 underline">{{ day }}, {{ month }} {{ date.getDate() }}</h2>
      </div>
      <div class="text-white text-right col-span-3">
        <h2 class="text-8xl">{{ selectedLocation }}</h2>
      </div>
    </div>

    <div class="max-h-[1200px] overflow-scroll scroll-smooth scroll-auto" id="scrollarea">
      <div class="text-white" v-for="presentation in presentations">
<!--        SCHEDULE -->
        <div class="pt-6 flex mt-2" v-if="new Date(presentation.time) < date && new Date(presentation.endtime) > date">
          <h2 class="text-3xl text-emerald-400 mx-5">In Progress</h2>
          <h2 class="text-3xl">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h2>
        </div>
        <div class="pt-6 flex mt-2" v-else-if="new Date(presentation.time) >= date && new Date(presentation.time).getDate() === date.getDate()">
          <h2 class="text-3xl mx-6">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h2>
        </div>
        <div class="text-white text-left mx-4 pb-1 border-b-2 border-slate-500"  v-if="new Date(presentation.endtime) >= date && new Date(presentation.time).getDate() === date.getDate()">
          <h2 class="text-5xl">{{ presentation.title }}</h2>
          <!--        <h2 class="text-4xl text-gray-300 font-normal">Presented by: {{ presentation.speaker }}</h2>-->
        </div>

<!--        CURRENT TALK ONLY -->
<!--        <div class="pt-6 flex mt-2" v-if="new Date(presentation.time) < date && new Date(presentation.endtime) > date">-->
<!--          <h2 class="text-3xl text-emerald-400 mx-5">In Progress</h2>-->
<!--          <h2 class="text-3xl">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h2>-->
<!--        </div>-->
<!--        <div class="text-white text-left mx-4 pb-1 border-b-2 border-slate-500"  v-if="new Date(presentation.time) < date && new Date(presentation.endtime) >= date && new Date(presentation.time).getDate() === date.getDate()">-->
<!--          <h2 class="text-5xl">{{ presentation.title }}</h2>-->
<!--          &lt;!&ndash;        <h2 class="text-4xl text-gray-300 font-normal">Presented by: {{ presentation.speaker }}</h2>&ndash;&gt;-->
<!--        </div>-->
      </div>
    </div>

    <div>
      <div class="absolute inset-x-0 bottom-10 p-3">
        <div class="flex flex-wrap">
          <img
              alt="Sponsor Logo"
              v-for="sponsor in selectedSponsors"
              :src="`${img_url}/images/sponsors/${sponsor.sponsor}`"
              class="max-h-40 align-center mx-auto"
          />
        </div>
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
      <div class="flex flex-wrap">
        <div v-for="sponsor in sponsors" :id="sponsor" class="m-2">
          <input type="checkbox" :name="sponsor.sponsor" :id="sponsor.sponsor" @click="sponsor.active = !sponsor.active" />
          <label
              :for="sponsor.sponsor"
              :class="{ 'border border-4 border-emerald-400 opacity-50': sponsor.active }"
              class="flex"
              :style="`background-image: url('${img_url}/images/sponsors/${sponsor.sponsor}'); display:inline-block;padding: 0 0 0 0px;`"
          ></label>
        </div>
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
const img_url = ref(import.meta.env.VITE_API_URL || "");
const settings = ref(true)

let selectedLocation = ref(null)
let selectedSponsors = ref([])

const date = ref(new Date());
const month = ref(null);
const day = ref(null);

let presentations = computed(() => presentationStore.getPresentationsAt(selectedLocation))

const intervalId = ref(null);

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
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
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
  width: 200px;
  height: 200px;
  display:inline-block;
  padding: 0 0 0 0;
  background-size: 100% 100%;
}

  /* Hide scrollbar for Chrome, Safari and Opera */
#scrollarea::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#scrollarea {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>