<template>
    <div class="pay">
        <Loading v-if="isLoading"/>
        <ol class="cart-progress">
            <li><span>step 1</span>確認清單</li>
            <li><span>step 2</span>填寫資料</li>
            <li class="cur-step"><span>step 3</span>確認付款</li>
            <li><span>step 4</span>完成訂單</li>
        </ol>
        <div class="container">
            <table class="order-list">
                <thead>
                    <tr>
                        <th>品名</th>
                        <th>數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in orderInfo.products" :key="item.id">
                        <td>
                            <img :src="item.product.imageUrl" :alt="item.product.title">
                            <span>{{item.product.title}}</span>
                        </td>
                        <td>
                            {{item.qty}}
                            {{item.product.unit}}
                        </td>
                        <td>{{item.final_total}} G</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>總計</td>
                        <td>{{orderInfo.total}} G</td>
                    </tr>
                </tbody>
            </table>
            <table class="customer-info">
                <thead>
                    <tr>
                        <th colspan="2">收件人資訊</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>姓名</td>
                        <td>{{user.name}}</td>
                    </tr>
                    <tr>
                        <td>信箱</td>
                        <td>{{user.email}}</td>
                    </tr>
                    <tr>
                        <td>電話</td>
                        <td>{{user.tel}}</td>
                    </tr>
                    <tr>
                        <td>地址</td>
                        <td>{{user.address}}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="pay-btn" @click="payOrder">確認付款</button>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/LoadingView.vue'

export default {
  data () {
    return {
      isLoading: false,
      orderInfo: '',
      user: ''
    }
  },
  components: {
    Loading
  },
  inject: ['emitter'],
  methods: {
    getOrder () {
      const id = JSON.parse(localStorage.getItem('orderId'))
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/order/${id}`)
        .then((res) => {
          this.isLoading = false
          this.orderInfo = res.data.order
          this.user = res.data.order.user
        })
    },
    payOrder () {
      const id = this.orderInfo.id
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/pay/${id}`)
        .then(() => {
          this.isLoading = false
          this.$router.push('/finish')
          localStorage.removeItem('orderId')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '付款成功'
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '付款失敗',
            content: err.response.data.message
          })
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>

<style lang="scss">
.pay{
  background-image: url(../../assets/mainbg-s.jpg);
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
                background-image: url(../../assets/racehorse.png);
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
.order-list{
    width: 80%;
    margin: auto;
    margin-bottom: 50px;
    text-align: center;
    thead{
        background-color: rgb(143, 200, 102);
        tr{
            th{
                padding: 5px 0;
                color: white;
                font-size: 20px;
                font-weight: 600;
                &:first-child{
                    border-radius: 10px 0 0 0;
                }
                &:last-child{
                    border-radius: 0 10px 0 0;
                }
            }
        }
    }
    tbody{
        background-color: rgba(255,255,255, 0.9);
        tr{
            border-bottom: 1px solid #ccc;
            td{
                width: 30%;
                font-size: 18px;
                img{
                    width: 50%;
                }
                &:first-child{
                    width: 40%;
                }
                &:first-child span{
                    text-align: center;
                    display: inline-block;
                    width: 50%;
                }
                input{
                    width: 80%;
                    margin: auto;
                    text-align: center;
                }
            }
            &:last-child{
                td{
                    font-size: 24px;
                    font-weight: 600;
                }
            }
        }
    }
}
.customer-info{
    width: 80%;
    margin: auto;
    text-align: center;
    margin-bottom: 50px;
    white-space: pre-wrap;
    thead{
        background-color: rgb(143, 200, 102);
        tr{
            th{
                padding: 5px 0;
                color: white;
                font-size: 20px;
                font-weight: 600;
                border-radius: 10px 10px 0 0;
            }
        }
    }
    tbody{
        background-color: rgba(255,255,255, 0.9);
        tr{
            td{
                font-size: 18px;
                padding: 5px 0;
            }
            td:first-child{
                width: 30%;
            }
            td:last-child{
                width: 70%;
            }
            &:nth-child(even){
                background-color: rgba(194, 194, 194, 0.9);
            }
        }
    }
}
.pay-btn{
    border: none;
    border-radius: 5px;
    width: 200px;
    padding: 5px 0;
    margin: 0 auto 60px;
    font-size: 18px;
    display: block;
    background-color: rgb(143, 200, 102);
    color: white;
    &:hover{
        background-color: rgb(84, 117, 60);
    }
}
@media screen and (max-width:992px) {
    .order-list{
        width: 100%;
    }
    .customer-info{
        width: 100%;
    }
}
@media screen and (max-width:500px) {
  .cart-progress{
      li{
          span{
              display: block;
          }
          & + li span::before{
              content: '';
              width: 100px;
              left: -100px;
          }
      }
  }
}
@media screen and (max-width:430px) {
  .cart-progress{
      li{
          span{
              padding: 5px 10px;
          }
          & + li span::before{
              content: '';
              width: 50px;
              left: -50px;
          }
      }
      .cur-step{
        span{
            &::after{
                right: -2px;
            }
        }
    }
  }
}
@media screen and (max-width:470px) {
    .order-list{
        tbody{
            tr{
                td{
                    img{
                        display: none;
                    }
                    &:first-child span{
                        width: 100%;
                    }
                }
            }
        }
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
