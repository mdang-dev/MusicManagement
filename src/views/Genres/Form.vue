<script setup>
import Layout from '@/layout/Layout.vue'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Toaster from '@/components/Toaster.vue'

const route = useRoute()
const genre = reactive({ id: '', genreName: '' });
const message = ref('');

const fetchGenre = (genreId) => {
  if (genreId) {
    axios
      .get(`http://localhost:4000/genres/${genreId}`)
      .then((response) => {
        Object.assign(genre, response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch genre:', err);
      });
  } else {
    genre.id = '';
    genre.genreName = '';
  }
};

onMounted(() => {
  const initialId = route.params.id;
  fetchGenre(initialId);
});

function resetForm(){
  setTimeout(() => {
    const forms = document.querySelectorAll('.needs-validation');
    for (const form of forms) {
      form.classList.remove('was-validated');
    }
  }, 1);
}

function showToast(){
  const toastLiveExample = document.getElementById('liveToast');
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      const toastBootstrap = new bootstrap.Toast(toastLiveExample)
        toastBootstrap.show()
    });
}
function checkValidate(){
  const forms = document.querySelectorAll('.needs-validation');
  for (const form of forms) {
    if (!form.checkValidity()) {
      return false;
    }
  }
  return true;
}

function handleClick(e) {
  if(checkValidate()){
    e.currentTarget.id = 'btn-toast'
  }else {
    e.currentTarget.id = ''
  }
}

watch(
  () => route.params.id,
  (newId) => {
    fetchGenre(newId);
  }
);

function onSubmit(e) {
  e.preventDefault();
  if(checkValidate()){
    const method = route.params?.id ? 'put' : 'post';
    message.value = method === 'post' ? 'Thêm Thành Công !' : 'Cập Nhật Thành Công !';
    const url =  route.params?.id ? `http://localhost:4000/genres/${route.params.id}`
      : 'http://localhost:4000/genres';
    axios[method](url, {
      genreName: genre.genreName,
    })
      .catch((error) => {
        console.log(error)
      });
    if(method === 'post') resetForm();
    genre.id = method === 'post' ? '' : genre.id;
    genre.genreName = method === 'post' ? '' : genre.genreName;
    showToast();
  }
}

</script>

<template>
  <Layout>
    <div class="card mt-5">
      <div class="card-body">
        <form id="formGenres" class="needs-validation" enctype="multipart/form-data" @submit="onSubmit" novalidate>
          <div class="mb-3">
            <label for="validationCustom01" class="form-label">Tên Thể Loại</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              placeholder="Tên Thể Loại"
              name="songName"
              v-model="genre.genreName"
              required
            />
            <div class="invalid-feedback">
              Vui lòng nhập tên thể loại !
            </div>
          </div>
          <div class="mt-3">
            <button type="submit" id class="btn btn-primary" @click="handleClick">Lưu</button>
          </div>
        </form>
      </div>
    </div>
    <Toaster :message="message" type="success" />
  </Layout>
</template>
