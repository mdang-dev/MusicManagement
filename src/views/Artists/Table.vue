<script setup >
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
import Layout from '@/layout/Layout.vue'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import Toaster from '@/components/Toaster.vue'
import Spinner from '@/components/sections/Spinner.vue'

const artists = ref([]);
const isLoading = ref(true);
const routing = useRoute();
const router = useRouter();
const searchValue = ref('');

const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/artists`);
    setTimeout(() => {
      artists.value = response.data;
      isLoading.value = false;
    }, 100);
  }catch (err){
    console.log(err);
  }
}

function goToUpdate(artistId) {
  router.push((routing.path + '/' + artistId).replace('list', 'form'));
}

function startRemove(e){
  const id = e.target.closest('tr').querySelectorAll('td')[0].innerText;
  document.querySelectorAll('.btn-remove-genre')[0].setAttribute('data-id', id);
}

const filteredArtists = computed(() => {
  return artists.value.filter((artist) => artist?.artistName.toUpperCase().includes(searchValue.value.toUpperCase()));
});


function removeArtist(e) {
  artists.value =  artists.value.filter((genre) => genre.id !== e.currentTarget.getAttribute('data-id'));
  axios.delete(`http://localhost:4000/artists/${e.currentTarget.getAttribute('data-id')}`)
    .then(() => {
      fetchData();
    }).catch((error) => {
    console.log(error);
  });
}

onMounted(() => {
  fetchData();
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
        <ScrollAreaRoot class="w-full h-[76vh] rounded overflow-hidden shadow-md border border-gray-300">
          <ScrollAreaViewport class="w-full h-full">
            <table class="table">
              <thead class="sticky -top-1">
              <tr class="table-primary">
                <th scope="col">#</th>
                <th scope="col" class="text-center">Mã Nghệ Sĩ</th>
                <th scope="col" class="text-center">Tên Nghệ Sĩ</th>
                <th scope="col" class="text-center">Giới Tính</th>
                <th scope="col" class="text-center">Thông Tin Thêm</th>
                <th scope="col" class="text-center">Chỉnh Sửa</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(artist, index) in filteredArtists" :key="artist.id" class="text-center">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ artist.id }}</td>
                <td>{{ artist?.artistName }}</td>
                <td>{{ artist?.gender ? 'Nam' : 'Nữ' }}</td>
                <td>{{ artist.moreInfo }}</td>
                <td>
                  <div class="d-flex w-full gap-2 align-items-center justify-content-center">
                    <button type="button" class="btn btn-outline-primary" @click="goToUpdate(artist.id)"><i class="bi bi-pencil-square mr-1"></i>Chỉnh Sửa</button>
                    <button @click="startRemove" type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash3 mr-1"></i>Xóa</button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </ScrollAreaViewport>

          <ScrollAreaScrollbar orientation="vertical" class="scrollbar-track h-full w-2 bg-gray-200">
            <ScrollAreaThumb class="scrollbar-thumb w-full bg-gray-500 rounded-lg" />
          </ScrollAreaScrollbar>

          <ScrollAreaScrollbar orientation="horizontal" class="scrollbar-track h-2 w-full bg-gray-200">
            <ScrollAreaThumb class="scrollbar-thumb h-full bg-blue-500 rounded-lg" />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>
      </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Báo !</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Bạn có chắc chắn muốn xóa thông tin này không?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button type="button" @click="removeArtist" data-id id="btn-toast" class="btn btn-primary btn-remove-genre" data-bs-dismiss="modal">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>

    <Toaster message="Xóa thành công !" type="success"/>
  </Layout>

</template>
