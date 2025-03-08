<script setup>
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import { onMounted } from 'vue'
  const routing = useRoute();
const router = useRouter();

  const getUrl = (url) => {

    if(url === "/users-management") return ['Người Dùng', 'Danh Sách'];
    if(url === "/songs-management/form") return ['Bài Hát', 'Thêm Mới'];
    if(url.includes("/songs-management/form")) return ['Bài Hát', 'Cập Nhật'];
    if(url === "/songs-management/list") return ['Bài Hát', 'Danh Sách'];
    if(url === "/genres-management/form") return ['Thể Loại', 'Thêm Mới'];
    if(url.includes("/genres-management/form")) return ['Thể Loại', 'Cập Nhật'];
    if(url === "/genres-management/list") return ['Thể Loại', 'Danh Sách'];
    if(url === "/artists-management/form") return ['Nghệ Sĩ', 'Thêm Mới'];
    if(url.includes("/artists-management/form")) return ['Nghệ Sĩ', 'Cập Nhật'];
    if(url === "/artists-management/list") return ['Nghệ Sĩ', 'Danh Sách'];
    if(url === "/admin-management/form") return ['Tài Khoản Quản Trị', 'Thêm Mới'];
    if(url.includes("/admin-management/form")) return ['Tài Khoản Quản Trị', 'Cập Nhật'];
    if(url === "/admin-management/list") return ['Tài Khoản Quản Trị', 'Danh Sách'];
    if(url === "/dashboard/plays") return ['Thống Kê', 'Lượt Nghe'];
    if(url === "/dashboard/liked") return ['Thống Kê', 'Lượt Yêu Thích'];
    return ['', ''];

  }

onMounted(() => {

  const user = localStorage.getItem('user');
  if(!user) router.push('/');

  (() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated');
      }, false)
    })
  })();
});

</script>

<template>

  <main class="d-flex h-screen gap-2 bg-gradient-to-r from-grass2 to-blue-200">
    <Sidebar/>
    <div class="mt-3 w-[90%]">
      <nav aria-label="breadcrumb" class="mt-1">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#"><RouterLink to="/">Home</RouterLink></a></li>

          <li class="breadcrumb-item" v-if="getUrl(routing.path)[0] !== ''"><span>{{ getUrl(routing.path)[0] }}</span></li>
          <li class="breadcrumb-item active" aria-current="page" v-if="getUrl(routing.path)[0] !== ''">{{ getUrl(routing.path)[1] }}</li>
        </ol>
      </nav>
        <slot/>
    </div>
  </main>

</template>

