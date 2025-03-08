<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import Toaster from '@/components/Toaster.vue'
import { hashPassword, isMathPassword } from '@/utils/EncryptPassword.js'
import { useRouter } from 'vue-router'

const users = ref([]);
const message = ref('');
const type = ref('');
const router = useRouter();

const user = JSON.parse(localStorage.getItem('user'));
const loginUser = reactive({
  email: '',
  password: '',
})
const registerUser = reactive({
  userName: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

function resetRegisterUser(){
  registerUser.userName = '';
  registerUser.name = '';
  registerUser.email = '';
  registerUser.password = '';
  registerUser.confirmPassword = '';
}

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:4000/users');
    users.value = response.data;
  }catch(err) {
    console.log(err);
  }
}

function checkValidateFormLogin(){
  const forms = document.querySelector('#formLogin');
  return forms.checkValidity();
}

function resetForm(){
  setTimeout(() => {
    const forms = document.querySelectorAll('.needs-validation');
    for (const form of forms) {
      form.classList.remove('was-validated');
    }
  }, 1);
}

function checkValidateFormRegister(){
  const forms = document.querySelector('#formRegister');
  return forms.checkValidity();
}

function showToast(){
  const toastLiveExample = document.getElementById('liveToast');
  import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
    const toastBootstrap = new bootstrap.Toast(toastLiveExample)
    toastBootstrap.show()
  });
}

function handlingError(){
  message.value = 'Sai email hoặc mật khẩu !';
  type.value = 'warning';
  showToast();
}

function checkUserNameEmail(){
  for (const user of users.value){
    if(registerUser.email === user?.email){
      message.value = 'Email đã tồn tại !';
      type.value = 'warning';
      showToast();
      return false;
    }else if(registerUser.userName === user?.userName){
      message.value = 'Tên đăng nhập đã tồn tại !';
      type.value = 'warning';
      showToast();
      return false;
    }
  }
  return true;
}

const login = () => {
    if(checkValidateFormLogin()){
      const user = users.value.find(user => user?.email === loginUser.email);
      if(user){
        isMathPassword(loginUser.password, user?.password).then((result) => {
           if(result){
             localStorage.setItem('user', JSON.stringify({role: user?.role, id: user.id, userName: user?.userName, name: user.name, email: user?.email}));
               router.push(user?.role ? '/dashboard/plays' : '/');
           }else handlingError();
         })
      }else handlingError();
    }
}

async  function register(e) {
  e.preventDefault();
  if(checkValidateFormRegister() && checkUserNameEmail()){
    type.value = 'success';
    message.value = 'Đăng Kí Tài Khoản Thành Công !';
   await axios.post(`http://localhost:4000/users`, {
      userName: registerUser.userName,
      name: registerUser.name,
      email: registerUser.email,
      role: false,
      password: hashPassword(registerUser.password)
    }).then(() => {
       showToast();
       resetRegisterUser();
       resetForm();
       fetchUsers();
    }).catch((error) => {
        console.log(error);
      });
  }
}



onMounted(() => {
    if(user){
      router.push('/dashboard/plays');
    }
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
  fetchUsers();
})

</script>

<template>

  <div class="container-fluid w-full min-h-screen bg-gradient-to-r from-gray-800 to-blue-950 d-grid place-items-center">
      <div class="container row d-flex align-items-center justify-content-center min-h-screen">

       <div class="col-lg-6 d-grid place-items-center">
         <div class="rounded-2xl bg-gradient-to-r from-pink-900 to-emerald-900  border-2 border-solid border-gray-800 shadow-lg shadow-black d-flex align-items-center justify-content-center">
          <img src="../../../public/images/bg-img-rm.png" class="object-fit-cover object-center w-full h-full" >
         </div>
       </div>
        <div class="col-lg-6">
          <div class="row justify-content-center">
            <div class="w-full">
              <div class="card bg-transparent shadow-lg shadow-cyan-950">
                <div class="card-body">
                  <ul class="nav nav-tabs mb-3" id="authTabs" role="tablist">

                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="login-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#login"
                        type="button"
                        role="tab"
                        aria-controls="login"
                        aria-selected="true"
                      >
                        Đăng Nhập
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="register-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#register"
                        type="button"
                        role="tab"
                        aria-controls="register"
                        aria-selected="false"
                      >
                        Tài Khoản Mới
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content text-white" id="authTabsContent">

                    <div
                      class="tab-pane fade show active"
                      id="login"
                      role="tabpanel"
                      aria-labelledby="login-tab"
                    >
                      <form class="needs-validation" id="formLogin" @submit.prevent="login" novalidate>
                        <div class="mb-3">
                          <label for="loginEmail" class="form-label">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="loginEmail"
                            v-model="loginUser.email"
                            placeholder="Enter your email"
                            required
                          />
                          <div class="invalid-feedback">
                            Vui lòng nhập email !
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="loginPassword" class="form-label">Mật Khẩu</label>
                          <input
                            type="password"
                            class="form-control"
                            id="loginPassword"
                            placeholder="Enter your password"
                            v-model="loginUser.password"
                            required
                          />
                          <div class="invalid-feedback">
                            Vui lòng nhập password !
                          </div>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>
                      </form>
                    </div>
                    <!-- Register Form -->
                    <div
                      class="tab-pane fade"
                      id="register"
                      role="tabpanel"
                      aria-labelledby="register-tab"
                    >
                      <form @submit="register" id="formRegister" class="needs-validation" novalidate>

                        <div class="mb-3">
                          <label for="registerName" class="form-label">Tên Đăng Nhập</label>
                          <input
                            type="text"
                            class="form-control"
                            id="registerName"
                            placeholder="Enter your user name"
                            v-model="registerUser.userName"
                            required
                          />
                          <div class="invalid-feedback">
                            Vui lòng nhập tên đăng nhập !
                          </div>
                        </div>

                        <div class="mb-3">
                          <label for="registerName" class="form-label">Họ Tên</label>
                          <input
                            type="text"
                            class="form-control"
                            id="registerName"
                            placeholder="Enter your name"
                            v-model="registerUser.name"
                            required
                          />
                          <div class="invalid-feedback">
                            Vui lòng nhập họ tên !
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="registerEmail" class="form-label">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="registerEmail"
                            placeholder="Enter your email"
                            v-model="registerUser.email"
                            required
                          />
                          <div class="invalid-feedback">
                            Vui lòng nhập email !
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="registerPassword" class="form-label">Mật Khẩu</label>
                          <input
                            type="password"
                            class="form-control"
                            id="registerPassword"
                            placeholder="Create a password"
                            v-model="registerUser.password"
                            required
                          />
                          <div class="invalid-feedback">
                            Vui lòng nhập mật khẩu !
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="registerConfirmPassword" class="form-label">Xác Nhận Mật Khẩu</label>
                          <input
                            type="password"
                            class="form-control"
                            id="registerConfirmPassword"
                            placeholder="Confirm your password"
                            v-model="registerUser.confirmPassword"
                            required
                          />
                          <div class="invalid-feedback">
                            Vui lòng xác nhận mật khẩu !
                          </div>
                        </div>
                        <button type="submit" class="btn btn-success w-100">Đăng Kí</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>


<Toaster :message="message" :type="type"  />
</template>

<style scoped>

</style>
