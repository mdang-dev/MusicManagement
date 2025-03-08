<script setup>
import Layout from '@/layout/Layout.vue'
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import Spinner from '@/components/sections/Spinner.vue'

const users = ref([])
const isLoading = ref(true);
const searchValue = ref('');

onMounted(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users`);
      setTimeout(() =>{
        users.value = response.data.filter(user => user.role === false);
        isLoading.value = false;
      }, 100);
    } catch (err) {
      console.log(err)
    }
  }
  fetchData().catch((err) => console.log(err));
})

const filteredUsers = computed(() => {
  return users.value.filter((user) => user?.userName.toUpperCase().includes(searchValue.value.toUpperCase()));
});
</script>

<template>
  <Layout>
    <Spinner v-if="isLoading" />
    <div v-if="!isLoading" class="card mr-4">
      <div class="card-body">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" v-model="searchValue"  placeholder="Tìm kiếm" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <ScrollAreaRoot
          class="w-full h-[76vh] rounded overflow-hidden shadow-md border border-gray-300"
        >
          <ScrollAreaViewport class="w-full h-full">
            <table class="table">
              <thead class="sticky -top-1">
                <tr class="table-primary">
                  <th scope="col">#</th>
                  <th scope="col" class="text-center">Mã Người Dùng</th>
                  <th scope="col" class="text-center">Tên Đăng Nhập</th>
                  <th scope="col" class="text-center">Tên Người Dùng</th>
                  <th scope="col" class="text-center">Email</th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="(user, index) in filteredUsers" :key="user.id" class="text-center">
                  <th scope="row">{{ index + 1}}</th>
                  <td>{{ user.id}}</td>
                  <td>{{ user.userName}}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                </tr>

              </tbody>
            </table>
          </ScrollAreaViewport>

          <ScrollAreaScrollbar
            orientation="vertical"
            class="scrollbar-track h-full w-2 bg-gray-200"
          >
            <ScrollAreaThumb class="scrollbar-thumb w-full bg-gray-500 rounded-lg" />
          </ScrollAreaScrollbar>

          <ScrollAreaScrollbar
            orientation="horizontal"
            class="scrollbar-track h-2 w-full bg-gray-200"
          >
            <ScrollAreaThumb class="scrollbar-thumb h-full bg-blue-500 rounded-lg" />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>
      </div>
    </div>
  </Layout>
</template>
