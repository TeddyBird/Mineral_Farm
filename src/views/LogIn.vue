<template>
    <Header/>
    <div class="log-in">
        <div class="log-area">
            <h2>管理員登入</h2>
            <form>
                <div class="form-group">
                    <label for="email">信箱</label>
                    <input type="email" id="email" v-model = "user.username">
                </div>
                <div class="form-group">
                    <label for="psw">密碼</label>
                    <input type="password" name="" id="psw" v-model = "user.password">
                </div>
                <button type="button" @click="logIn">登入</button>
            </form>
        </div>
    </div>
    <Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    Header,
    Footer
  },
  inject: ['emitter'],
  methods: {
    logIn () {
      this.$http.post(`${process.env.VUE_APP_API}v2/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `token=${token};expires=${new Date(expired)}; path=/`
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '登入成功',
            content: res.data.message
          })
          this.$router.push('/admin')
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '登入失敗',
            content: err.response.data.message
          })
          this.user = { username: '', password: '' }
        })
    }
  }
}
</script>

<style lang="scss">
    .log-in{
        background-image: url(../assets/bg02.png);
        background-size: cover;
        background-position: bottom;
        min-height: calc(100vh - 210px);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        .log-area{
            width: 500px;
            margin: auto;
            background-color: rgba($color: #ffffff, $alpha: 0.9);
            border-radius: 10px;
            padding: 20px;
            h2{
                font-size: 30px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 20px;
                color: rgb(49, 49, 49);
            }
            form{
                color: rgb(49, 49, 49);
                .form-group{
                    width: 80%;
                    margin: auto;
                    margin-bottom: 20px;
                    label{
                        display: block;
                        width: 100%;
                        font-size: 18px;
                        margin-bottom: 5px;
                    }
                    input{
                        display: block;
                        width: 100%;
                        font-size: 18px;
                        padding: 0 5px;
                    }
                }
                button{
                    width: 150px;
                    margin: 0 auto 10px;
                    display: block;
                    font-size: 18px;
                    border: none;
                    border-radius: 10px;
                    padding:5px 10px;
                    background-color: rgb(143, 200, 102);
                    color: white;
                    &:hover{
                        background-color: rgb(84, 117, 60);
                    }
                }
            }
        }
    }
</style>
