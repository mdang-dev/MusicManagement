<script setup>
import Layout from '@/layout/Layout.vue'
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import Multiselect from 'vue-multiselect'
import axios from 'axios'
import Toaster from '@/components/Toaster.vue'

const route = useRoute()
const song = reactive({
    id: '',
    songName: '',
    artists: [],
    genre: null,
    duration: 0,
    releaseDate: new Date(),
    coverPhoto: '',
    filePath: ''
});

const artists = ref([]);
const genres = ref([]);

const fetchArtists = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/artists`);
    artists.value = response.data;
  }catch (error) {
    console.log(error);
  }
}

const fetchGenres = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/genres`);
    genres.value = response.data;
  }catch (error) {
    console.log(error);
  }
}

const message = ref('');

function resetSong(){
  song.id = '';
  song.songName = '';
  song.artists = null;
  song.genre = null;
  song.duration = 0;
  song.releaseDate = new Date();
  song.coverPhoto = '';
  song.filePath = '';
  const inputFile = document.querySelectorAll('.fileInput');
  for (const file of inputFile) {
    file.value = '';
  }
}

const fetchSong = (songId) => {
  if (songId) {
    axios
      .get(`http://localhost:4000/songs/${songId}`)
      .then((response) => {
        Object.assign(song, response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch genre:', err);
      });
  } else {
    resetSong();
  }
};

onMounted(() => {
  const initialId = route.params.id;
  fetchSong(initialId);
  fetchArtists();
  fetchGenres();
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

function selectedFileImage(e){
  const file = e.target.files[0];
  if(file){
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      song.coverPhoto = e.target.result;
    }
    fileReader.readAsDataURL(file);
  }
}

function selectedFileAudio(e){
  const file = e.target.files[0];
  if(file){
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      const audio = new Audio();
      audio.src = e.target.result;
      song.filePath = e.target.result;
      audio.onloadedmetadata = () => {
        const inputDuration = document.querySelector('#innerDuration');
        inputDuration.value = Math.floor(audio.duration);
        song.duration = Number(inputDuration.value);
      }
    }
    fileReader.readAsDataURL(file);
  }
}

watch(
  () => route.params.id,
  (newId) => {
    fetchSong(newId);
  }
);

function onSubmit(e) {
  e.preventDefault();
  if(checkValidate()){
    const method = route.params?.id ? 'put' : 'post';
    message.value = method === 'post' ? 'Thêm Thành Công !' : 'Cập Nhật Thành Công !';
    const url =  route.params?.id ? `http://localhost:4000/songs/${route.params.id}`
      : 'http://localhost:4000/songs';
    axios[method](url, {
      songName: song.songName,
      artists: song.artists,
      genre: song.genre,
      duration: song.duration,
      releaseDate: song.releaseDate,
      coverPhoto: song.coverPhoto,
      filePath: song.filePath,
    })
      .catch((error) => {
        console.log(error)
      });
    if(method === 'post'){ resetForm(); resetSong(); }
    else Object.assign(song, song);
    showToast();
  }
}
function addTag(newTag){
   {
    const tag = {
      artistsName: newTag.artistsName,
      id: newTag.id,
    }
    this.artists.push(tag)
    this.value.push(tag)
  }
}
</script>

<template>
  <Layout>
    <div class="card mt-5 w-full">
      <div class="card-body">
        <form class="needs-validation" @submit="onSubmit" novalidate>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Tên Bài Hát</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Tên bài hát"
              v-model="song.songName"
              name="songName"
              required
            />
            <div class="invalid-feedback">
              Vui lòng nhập tên bài hát !
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Nghệ Sĩ</label>
            <multiselect v-model="song.artists" tag-placeholder="Chọn nghệ sĩ" placeholder="Tìm kiếm nghệ sĩ" label="artistName"
                         track-by="id" :options="artists" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
            <input required v-model="song.artists" class="w-0 h-0 opacity-0 absolute" />
            <div class="invalid-feedback mt-2">
              Vui lòng chọn nghệ sĩ !
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-sm-9">
              <label for="selectGenre" class="form-label">Thể Loại</label>
              <select id="selectGenre" class="form-select" size="2" v-model="song.genre" aria-label="Default select example" required>
                <option :selected="genre.id === song.genre?.id" v-for="genre in genres" :value="genre" :key="genre.id">{{ genre.genreName }}</option>
              </select>
              <div class="invalid-feedback">
                Vui lòng chọn thể loại !
              </div>
            </div>
            <div class="col-sm-3">
              <label for="exampleFormControlInput3" class="form-label">Ngày Phát Hành</label>
              <input
                type="date"
                class="form-control h-14"
                aria-label="State"
                id="exampleFormControlInput3"
                name="releaseDate"
                v-model="song.releaseDate"
                required
              />
              <div class="invalid-feedback">
                Vui lòng chọn ngày phát hành !
              </div>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-sm-6">
              <label for="exampleFormControlInput1" class="form-label">Ảnh Bìa</label>
              <input
                type="file"
                class="form-control fileInput"
                accept="image/*"
                id="exampleFormControlInput1"
                placeholder="Ảnh Bìa"
                @change="selectedFileImage"
                :required="!route.params.id"
              />
              <div v-if="route.params.id" class="text-danger mt-2">
                Nếu không chọn file sẽ lấy file hiện tại !
              </div>
              <div class="invalid-feedback">
                Vui lòng chọn ảnh bìa !
              </div>
            </div>
            <div class="col-sm-4">
              <div>
                <label for="choosenFile" class="form-label">File Âm Thanh</label>
                <input
                  type="file"
                  class="form-control fileInput"
                  placeholder="Chọn File Âm Thanh"
                  accept="audio/*"
                  @change="selectedFileAudio"
                  :required="!route.params.id"
                />
                <div v-if="route.params.id" class="text-danger mt-2">
                  Nếu không chọn file sẽ lấy file hiện tại !
                </div>
                <div class="invalid-feedback">
                  Vui lòng chọn file âm thanh !
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="mb-2">
                <label for="innerDuration" class="form-label">Thời Lượng</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="00:00"
                  id="innerDuration"
                  v-model="song.duration"
                  name="duration"
                />
              </div>
            </div>
          </div>

          <div class="hidden" id="selectArtists"></div>

          <div class="mt-3">
            <button type="submit" id="" class="btn btn-primary" @click="handleClick">Lưu</button>
          </div>
        </form>
      </div>
    </div>
    <Toaster :message="message" type="success" />
  </Layout>
</template>
