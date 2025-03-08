<script setup>
import { RouterView } from 'vue-router'
import { provide, reactive } from 'vue'
const loginState = reactive({
  logOut: () => {
    localStorage.removeItem('user');
  }
});
provide('loginState', loginState);
</script>

<template>
  <RouterView />
</template>
