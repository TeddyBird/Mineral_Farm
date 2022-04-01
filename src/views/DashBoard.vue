<template>
    <DashHeader></DashHeader>
    <router-view v-if="checkSuccess"></router-view>
</template>

<script>
import DashHeader from '@/components/DashHeader.vue'

export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    DashHeader
  },
  inject: ['emitter'],
  methods: {
    checkLog () {
      this.$http.post(`${process.env.VUE_APP_API}v2/api/user/check`)
        .then((res) => {
          this.checkSuccess = true
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '登入驗證通過',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.checkSuccess = false
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '請重新登入',
            content: err.response.data.message
          })
          this.$router.push('/log-in')
        })
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    this.checkLog()
  }
}
</script>
