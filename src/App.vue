<template>
  <Toast/>
  <RouterView/>
</template>

<script>
import emitter from '@/methods/mitt'
import Toast from '@/components/ToastView.vue'

export default {
  components: {
    Toast
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap";
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100&display=swap');
@import url(https://fonts.googleapis.com/earlyaccess/cwtexyen.css);

body {
  font-family: 'Noto Sans TC', sans-serif;
}
</style>
