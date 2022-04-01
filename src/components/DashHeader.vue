<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/admin">礦石牧場後台</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to ="/admin">產品管理</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to ="/admin/orders">訂單管理</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to ="/admin/coupons">優惠卷管理</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to ="/">回到前台</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link active" aria-current="page" @click.prevent="logOut">登出</a>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
</template>

<script>
export default {
  inject: ['emitter'],
  methods: {
    logOut () {
      this.$http.post(`${process.env.VUE_APP_API}/v2/logout`)
        .then((res) => {
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '登出成功',
            content: res.data.message
          })
          this.$router.push('/')
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '登出失敗',
            content: err.response.data.message
          })
        })
    }
  }
}
</script>
