<script setup>
import { useRouter } from 'vue-router'
import { inject, ref } from 'vue'


const playlists = ([
  { name: 'Top Hits 2024', image: '../../../public/images/bai_nay_chill_phet.jpg' },
  { name: 'Chill Vibes', image: '../../../public/images/honesty.jpg' },
  { name: 'Workout Energy', image: '../../../public/images/call_out_my_name.jpg' },
  { name: 'Classic Favorites', image: '../../../public/images/i_love_you_3000.jpg' },
  { name: 'Relaxing Tunes', image: '../../../public/images/open_arms.jpg' },
  { name: 'Summer Vibes', image: '../../../public/images/we_dont_talk_anymore.jpg' },
]);

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem('user')) || null);
const loginState = inject('loginState');
const navigateTo = (page) => {
  router.push(`/${page}`);
};
const logOut = () => {
  user.value = null;
  loginState?.logOut()
}
</script>

<template>

  <div class="home-page w-full bg-gradient-to-r from-gray-800 to-black overflow-hidden">
    <div v-if="user" class="flex w-full justify-content-end">
      <div class="dropdown m-3 text-white">
        <a
          href="#"
          class="d-flex align-items-center link-white text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="fw-bold mr-2 text-white">Xin Chào:</span>
          <span class="text-white">{{ user?.name }}</span>
        </a>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li><a class="dropdown-item" type="button" @click="logOut" >Đăng Xuất</a></li>
        </ul>
      </div>
    </div>
    <section class=" text-gray-200 py-24">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-6 text-teal-400">Your Gateway to Endless Music Bliss 🎵</h1>
        <p class="text-lg mb-8 text-gray-300">Stream, explore, and connect with music like never before.</p>
        <div class="space-x-4">
          <button class="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-lg">
            Get Started
          </button>
          <button class="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-lg">
            Explore Now
          </button>
        </div>
      </div>
    </section>

    <section class="py-20 text-gray-200 text-center w-full">
      <h2 class="text-3xl font-semibold mb-10 text-teal-400 animate-fade-in">Why Choose Us?</h2>
      <div class="row mx-4">
        <div class="col-md-3 hover:shadow-xl transform hover:scale-105 transition-all max-md:mb-3">
          <div class="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full animate-slide-up">
            <i class="text-4xl text-teal-400 mb-4 "></i>
            <h3 class="text-xl font-semibold text-teal-300">Stream Anytime</h3>
            <p class="text-gray-400">Play your favorite tracks on any device, anytime.</p>
          </div>
        </div>
        <div class="col-md-3 hover:shadow-xl transform hover:scale-105 transition-all max-md:mb-3">
          <div class="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full animate-slide-up">
            <i class="text-4xl text-teal-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-teal-300">Personalized Playlists</h3>
            <p class="text-gray-400">Discover music tailored just for you.</p>
          </div>
        </div>
        <div class="col-md-3 hover:shadow-xl transform hover:scale-105 transition-all max-md:mb-3">
          <div class="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full animate-slide-up">
            <i class="text-4xl text-teal-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-teal-300">Connect with Others</h3>
            <p class="text-gray-400">Share playlists and engage with music lovers.</p>
          </div>
        </div>
        <div class="col-md-3 hover:shadow-xl transform hover:scale-105 transition-all">
          <div class="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full animate-slide-up">
            <i class="text-4xl text-teal-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-teal-300">Offline Mode</h3>
            <p class="text-gray-400">Download your favorites for offline listening.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 text-center">
      <h2 class="text-3xl font-bold mb-10 text-teal-400">Featured Playlists</h2>
      <div class="flex justify-center flex-wrap gap-10 mx-3">
        <div
          v-for="(playlist, index) in playlists"
          :key="index"
          class="playlist bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all animate-slide-up"
        >
          <img :src="playlist.image" :alt="playlist.name" class="w-full h-48 object-cover rounded-t-xl" />
          <h3 class="p-4 text-xl font-semibold text-teal-300">{{ playlist.name }}</h3>
        </div>
      </div>
    </section>

    <section v-if="!user" class="text-center py-10">
      <h2 class="text-3xl font-bold mb-8 text-teal-400">Ready to Dive into the World of Music?</h2>
      <button
        @click="navigateTo('account')"
        class="px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-gray-900 font-semibold transition-all"
      >
        Sign Up Now
      </button>
    </section>
    </div>
</template>

