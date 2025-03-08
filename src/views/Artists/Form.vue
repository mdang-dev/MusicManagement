<script setup>
import Layout from '@/layout/Layout.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Toaster from '@/components/Toaster.vue'

const route = useRoute()
const message = ref('');
const artist = reactive({
  id: '',
  artistName: '',
  gender: true,
  moreInfo: '',
});

function resetArtist(){
  artist.id = '';
  artist.artistName = '';
  artist.gender = true;
  artist.moreInfo = ''
}


const fetchGenre = (artistId) => {
  if (artistId) {
    axios
      .get(`http://localhost:4000/artists/${artistId}`)
      .then((response) => {
        Object.assign(artist, response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch artist:', err);
      });
  } else {
    resetArtist();
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
    const url =  route.params?.id ? `http://localhost:4000/artists/${route.params.id}`
      : 'http://localhost:4000/artists';
    console.log(artist.gender);
    axios[method](url, {
      artistName: artist.artistName,
      gender: artist.gender,
      moreInfo: artist.moreInfo,
    })
      .catch((error) => {
        console.log(error)
      });
    if(method === 'post') {
      resetForm();
      resetArtist();
    }else {
      Object.assign(artist, artist);
    }
    showToast();
  }
}


</script>

<template>
  <Layout>
    <div class="card mt-5">
      <div class="card-body">
        <form class="needs-validation" @submit="onSubmit" novalidate>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Tên Nghệ Sĩ</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Tên nghệ sĩ"
              name="artistName"
              required
              v-model="artist.artistName"
            />
            <div class="invalid-feedback">
                Vui lòng nhập tên nghệ sĩ !
            </div>
          </div>
          <div>
            <label class="form-check-label block mb-2">Giới Tính</label>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="inlineRadio1"
                :value="true"
                v-model="artist.gender"
              />
              <label class="form-check-label" for="inlineRadio1">Nam</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="inlineRadio2"
                :value="false"
                v-model="artist.gender"
              />
              <label class="form-check-label" for="inlineRadio2">Nữ</label>
            </div>
          </div>
          <div class="mt-3">
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style="height: 100px; resize: vertical; max-height: 300px"
                name="moreInfo"
                v-model="artist.moreInfo"
              ></textarea>
              <label for="floatingTextarea2">Thêm Thông Tin</label>
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
