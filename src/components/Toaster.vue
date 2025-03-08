<script setup>
import { defineProps, ref, onMounted } from 'vue'
import  Warning  from '../../public/images/warning.png';
import Success  from '../../public/images/success.png';

defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    validator: (value) => ['warning', 'success'].includes(value),
  },
})

const time = ref('')
const date = new Date()
onMounted(() => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  time.value = `${hours}:${minutes}`
})

onMounted(() => {
  const toastTrigger = document.getElementById('btn-toast')
  const toastLiveExample = document.getElementById('liveToast')

  if (toastTrigger) {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      const toastBootstrap = new bootstrap.Toast(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    })
  }
})
</script>

<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img :src="type === 'warning' ? Warning : Success" class="rounded me-2 w-5 h-5" alt="..." />
        <strong class="me-auto">Thông Báo !</strong>
        <small>{{ time }}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ message }}
      </div>
    </div>
  </div>
</template>
