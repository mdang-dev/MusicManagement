<script setup>
import Layout from '@/layout/Layout.vue'
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import { hashPassword } from '@/utils/EncryptPassword.js'
import Toaster from '@/components/Toaster.vue'

const route = useRoute()
const message = ref('');
const role = ref(true);
const admin = reactive({
  id: '',
  userName: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

function resetAdmin(){
  admin.id = '';
  admin.userName = '';
  admin.name = '';
  admin.email = '';
  admin.password = '';
  admin.confirmPassword = '';
}


const fetchAdmin = (adminId) => {
  if (adminId) {
    axios
      .get(`http://localhost:4000/users/${adminId}`)
      .then((response) => {
        Object.assign(admin, response.data);
        admin.confirmPassword = admin.password;
      })
      .catch((err) => {
        console.error('Failed to fetch artist:', err);
      });
  } else {
    resetAdmin();
  }
};

onMounted(() => {
  const initialId = route.params.id;
  fetchAdmin(initialId);
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
    fetchAdmin(newId);
  }
);

function onSubmit(e) {
  e.preventDefault();
  if(checkValidate()){
    const method = route.params?.id ? 'put' : 'post';
    message.value = method === 'post' ? 'Thêm Thành Công !' : 'Cập Nhật Thành Công !';
    const url =  route.params?.id ? `http://localhost:4000/users/${route.params.id}`
      : 'http://localhost:4000/users';
    axios[method](url, {
      userName: admin.userName,
      name: admin.name,
      email: admin.email,
      role: role.value,
      password: method === 'post' ? hashPassword(admin.password) : admin.password,
    })
      .catch((error) => {
        console.log(error)
      });
    if(method === 'post') {
      resetForm();
      resetAdmin()
    }else {
      Object.assign(admin, admin);
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
            <label for="userName" class="form-label">Tên Đăng Nhập</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              placeholder="Tên đăng nhập"
              name="userName"
              v-model="admin.userName"
              required
            />
            <div class="invalid-feedback">
              Vui lòng nhập tên đăng nhập !
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="name">Họ Tên</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Họ Tên"
              name="name"
              v-model="admin.name"
              required
            />
            <div class="invalid-feedback">
              Vui lòng nhập họ tên !
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              name="email"
              v-model="admin.email"
              required
            />
            <div class="invalid-feedback">
              Vui lòng nhập email !
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mật Khẩu</label>
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Mật Khẩu"
              aria-describedby="passwordHelpBlock"
              name="password"
              v-model="admin.password"
              required
            />
            <div class="invalid-feedback">
              Vui lòng nhập mật khẩu !
            </div>
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Xác Nhận Mật Khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              class="form-control"
              placeholder="Xác Nhận Mật Khẩu"
              aria-describedby="passwordHelpBlock"
              name="confirmPassword"
              v-model="admin.confirmPassword"
              required
            />
            <div class="invalid-feedback">
              Vui lòng xác nhận mật khẩu !
            </div>
          </div>

          <div class="mt-3">
            <button type="submit" id @click="handleClick" class="btn btn-primary">Lưu</button>
          </div>
        </form>
      </div>
    </div>

    <Toaster :message="message" type="success" />
  </Layout>
</template>
