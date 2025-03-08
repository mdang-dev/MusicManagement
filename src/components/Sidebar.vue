<script setup>
import { inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginState = inject('loginState')
const user = JSON.parse(localStorage.getItem('user'));
const logOut = () => {
  loginState?.logOut()
  router.push('/')
}

onMounted(() => {
  function show(e) {
    e.currentTarget.classList.toggle('collapsed')
    const classlist = e.target.closest('.accordion-item').querySelector('.accordion-body')
      .parentElement.classList
    if (classlist.contains('h-0')) {
      classlist.replace('h-0', 'h-max')
    } else {
      classlist.replace('h-max', 'h-0')
    }
  }

  document.querySelectorAll('.accordion-button').forEach((button) => {
    button.addEventListener('click', show)
  })
})

</script>

<template>
  <i
    class="bi bi-list text-6xl"
    data-bs-toggle="offcanvas"
    href="#offcanvasExample"
    role="button"
    aria-controls="offcanvasExample"
  ></i>

  <div
    class="offcanvas offcanvas-start"
    style="width: 300px"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body">
      <div class="d-flex flex-column flex-shrink-0 p-3 h-full">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <i class="bi bi-vinyl text-[4rem] mr-2"></i>
          <span class="fs-4 font-Jaro">SoundCloudNine</span>
        </a>
        <hr />

        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed !h-10" type="button">Người Dùng</button>
            </h2>
            <div class="h-0 overflow-y-hidden">
              <div class="accordion-body d-grid place-content-start !h-12">
                <span class="hover:underline"
                  ><RouterLink
                    to="/users-management"
                    class="!text-left text-decoration-none text-black"
                  >
                    Danh Sách
                  </RouterLink></span
                >
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed !h-10" type="button">
                Quản Lý Bài Hát
              </button>
            </h2>
            <div class="h-0 overflow-y-hidden">
              <div class="accordion-body py-2 px-4">
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    class="text-decoration-none text-gray-800"
                    to="/songs-management/form"
                    >Thêm Mới</RouterLink
                  ></span
                >
                <div class="h-[1px] my-1 w-full bg-gray-400"></div>
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    class="text-decoration-none text-gray-800"
                    to="/songs-management/list"
                    >Danh Sách</RouterLink
                  ></span
                >
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed !h-10" type="button">
                Quản Lý Thể Loại
              </button>
            </h2>
            <div class="h-0 overflow-y-hidden">
              <div class="accordion-body py-2 px-4">
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    class="text-decoration-none text-gray-800"
                    to="/genres-management/form"
                    >Thêm Mới</RouterLink
                  ></span
                >
                <div class="h-[1px] my-1 w-full bg-gray-400"></div>
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    class="text-decoration-none text-gray-800"
                    to="/genres-management/list"
                    >Danh Sách</RouterLink
                  ></span
                >
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed !h-10" type="button">
                Quản Lý Nghệ Sĩ
              </button>
            </h2>
            <div class="h-0 overflow-y-hidden">
              <div class="accordion-body py-2 px-4">
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    class="text-decoration-none text-gray-800"
                    to="/artists-management/form"
                    >Thêm Mới</RouterLink
                  ></span
                >
                <div class="h-[1px] my-1 w-full bg-gray-400"></div>
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    class="text-decoration-none text-gray-800"
                    to="/artists-management/list"
                    >Danh Sách</RouterLink
                  ></span
                >
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed !h-10" type="button">
                Tài Khoản Quản Trị
              </button>
            </h2>
            <div class="h-0 overflow-y-hidden">
              <div class="accordion-body py-2 px-4">
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    class="text-decoration-none text-gray-800"
                    to="/admin-management/form"
                    >Thêm Mới</RouterLink
                  ></span
                >
                <div class="h-[1px] my-1 w-full bg-gray-400"></div>
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    class="text-decoration-none text-gray-800"
                    to="/admin-management/list"
                    >Danh Sách</RouterLink
                  ></span
                >
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed !h-10" type="button">Thống Kê</button>
            </h2>
            <div class="h-0 overflow-y-hidden">
              <div class="accordion-body py-2 px-4">
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    to="/dashboard/plays"
                    class="!text-left text-decoration-none text-black"
                  >
                    Lượt Nghe
                  </RouterLink></span
                >
                <div class="h-[1px] my-1 w-full bg-gray-400"></div>
                <span class="cursor-pointer hover:underline"
                  ><RouterLink
                    to="/dashboard/liked"
                    class="!text-left text-decoration-none text-black"
                  >
                    Lượt Yêu Thích
                  </RouterLink></span
                >
              </div>
            </div>
          </div>
        </div>

        <hr class="mt-auto" />
        <div class="dropdown mt-auto">
          <a
            href="#"
            class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="fw-bold mr-2">Xin Chào:</span>
            <span>{{ user?.name }}</span>
          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1" >Đăng Xuất</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel1">Thông Báo !</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Bạn có chắc chắn muốn đăng xuất không?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="logOut" data-bs-dismiss="modal">Đăng Xuất</button>
        </div>
      </div>
    </div>
  </div>
</template>
