<template>
  <div class="order">
    <Loading v-if="isLoading"></Loading>
      <ol class="cart-progress">
          <li><span>step 1</span>確認清單</li>
          <li class="cur-step"><span>step 2</span>填寫資料</li>
          <li><span>step 3</span>確認付款</li>
          <li><span>step 4</span>完成訂單</li>
      </ol>
      <div class="check-form">
          <Form v-slot = {errors}>
              <div class="form-group">
                  <label for="name">姓名</label>
                  <span>必填</span>
                  <Field id="name" name="姓名" rules="required" type="text" placeholder="請填寫姓名" v-model="form.user.name"></Field>
                  <error-message name="姓名" class="err-msg"></error-message>
              </div>
              <div class="form-group">
                  <label for="email">信箱</label>
                  <span>必填</span>
                  <Field id="email" name="email" rules="email|required" type="email" placeholder="請填寫信箱" v-model="form.user.email"></Field>
                  <error-message name="email" class="err-msg"></error-message>
              </div>
              <div class="form-group">
                  <label for="tel">電話</label>
                  <span>必填</span>
                  <Field id="tel" name="電話" type="tel" rules="required|numeric|min:10" placeholder="請填寫電話" v-model="form.user.tel"></Field>
                  <error-message name="電話" class="err-msg"></error-message>
              </div>
              <div class="form-group">
                  <label for="address">地址</label>
                  <span>必填</span>
                  <Field id="address" name="地址" rules="required" type="text" placeholder="請填寫地址" v-model="form.user.address"></Field>
                  <error-message name="地址" class="err-msg"></error-message>
              </div>
              <div class="form-group">
                  <label for="msg">備註</label>
                  <textarea id="msg" placeholder="有特別事項請輸入在這" v-model="form.message"></textarea>
              </div>
              <div class="form-btn">
                  <button @click="this.$router.push('/cart')">上一步</button>
                  <button  class="to-pay" type="button" @click="createOrder" v-if = "Object.keys(errors).length === 0">下一步</button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import Loading from '@/components/LoadingView.vue'

export default {
  data () {
    return {
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  components: {
    Loading
  },
  inject: ['emitter'],
  methods: {
    createOrder () {
      const data = { ...this.form }
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/order`, { data })
        .then((res) => {
          this.isLoading = false
          localStorage.setItem('orderId', JSON.stringify(res.data.orderId))
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '已建立訂單'
          })
          this.$router.push('/pay')
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '訂單建立失敗',
            content: err.response.data.message
          })
        })
    }
  }
}
</script>

<style lang="scss">
.order{
  background-image: url(../assets/mainbg-s.jpg);
  background-size: cover;
  background-position-y: bottom;
  padding: 50px 0;
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 225px);
}
.cart-progress{
    display: flex;
    justify-content: space-between;
    max-width: 640px;
    margin: 50px auto;
    padding: 0 20px;
    li{
      text-align: center;
      font-size: 16px;
      color: rgb(49, 49, 49);
        span{
            display: block;
            border: 1px solid rgb(185, 142, 81);
            text-align: center;
            border-radius: 20px;
            padding: 5px 20px;
            margin-bottom: 5px;
            position: relative;
            background-color: rgb(185, 142, 81);
            color: white;
            font-size: 16px;
        }
        & + li span::before{
            content: '';
            width: 150px;
            height: 2px;
            background-color: rgb(185, 142, 81);
            position: absolute;
            top: 50%;
            left: -120px;
            z-index: -2;
        }
    }
    .cur-step{
        span{
            color: white;
            background-color: rgb(107, 79, 43);
            border: 1px solid rgb(107, 79, 43);
            &::after{
                content: '';
                background-image: url(../assets/racehorse.png);
                background-size: cover;
                width: 57px;
                height: 48px;
                position: absolute;
                top: -50px;
                right: 10px;
                animation: horserun 0.5s linear infinite;
            }
        }
    }
}
.check-form{
    border: 1px solid rgb(143, 200, 102);
    border-radius: 10px;
    background-color: rgba(255,255,255, 0.9);
    max-width: 800px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    form{
        width: 100%;
        .form-group{
            width: 100%;
            margin-bottom: 10px;
            label{
                display: inline-block;
                margin-bottom: 5px;
                font-size: 18px;
            }
            span{
                font-size: 14px;
                padding: 2px;
                background-color: rgb(236, 35, 35);
                color: white;
                border-radius: 5px;
                margin: 0 0 5px 15px;
            }
            input{
                width: 100%;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 5px;
                font-size: 18px;
            }
            textarea{
                width: 100%;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 5px;
                font-size: 18px;
            }
            .err-msg{
                background-color: white;
                color: red;
                margin: 0;
            }
        }
        .form-btn{
            display: flex;
            justify-content: space-between;
            button{
                border: none;
                font-size: 18px;
                border-radius: 5px;
                padding: 5px 10px;
                background-color: #eee;
                &:hover{
                  background-color: #ccc;
                }
            }
            .to-pay{
                background-color: rgb(143, 200, 102);
                color: white;
                &:hover{
                  background-color: rgb(84, 117, 60);
                }
            }
        }
    }
}
@media screen and (max-width:800px) {
  .check-form{
      max-width: 800px;
      margin: 0 20px;
  }
}
@keyframes horserun {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
