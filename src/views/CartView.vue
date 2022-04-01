<template>
  <div class="cart">
    <Loading v-if="isLoading"></Loading>
      <ol class="cart-progress">
          <li class="cur-step"><span>step 1</span>確認清單</li>
          <li><span>step 2</span>填寫資料</li>
          <li><span>step 3</span>確認付款</li>
          <li><span>step 4</span>完成訂單</li>
      </ol>
      <div class="container">
          <div class="row">
              <div class="col-12 col-md-7">
                  <table class="cart-content">
                      <thead>
                          <tr>
                              <th>品名</th>
                              <th>數量</th>
                              <th>單位</th>
                              <th>小計</th>
                              <th>刪除</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-if ="cartData.carts.length === 0">
                            <td class="no-item" colspan="5">
                              您的購物車內還沒有商品，趕快前往<router-link to="/products">商店</router-link>吧!
                            </td>
                          </tr>
                          <tr v-for="item in cartData.carts" :key="item.id">
                              <td>
                                  <img :src="item.product.imageUrl" alt="">
                                  <span>{{item.product.title}}</span>
                              </td>
                              <td><input min="1" type="number" v-model.number="item.qty" @change = "updateCart(item)"></td>
                              <td>{{item.product.unit}}</td>
                              <td>{{item.total}} G</td>
                              <td><button @click="removeCart(item.id)"><i class="fa-solid fa-trash"></i></button></td>
                          </tr>
                          <tr>
                            <td colspan="5">
                                <button @click="removeAllCart" class="remove-btn"><i class="fa-solid fa-trash"></i>刪除全部</button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div class="col-12 col-md-5">
                  <div class="cart-total">
                      <h3>訂單總額</h3>
                      <div class="total money" v-if="couponUsed">
                        <span>小計</span><p>{{cartData.total}} G</p>
                      </div>
                      <div class="discount money" v-if="couponUsed">
                        <span>折扣</span><p>- {{cartData.total - cartData.final_total}} G</p>
                      </div>
                      <div class="finall-total money">
                        <span>總計</span><p>{{cartData.final_total}} G</p>
                      </div>
                      <div class="coupon-btn" v-if="cartData.carts.length !== 0">
                        <input type="text" placeholder="小遊戲可取得優惠碼喔" v-model="couponCode">
                        <button type="button" @click="useCoupon">使用</button>
                      </div>
                      <div class="step-btn">
                          <button @click="this.$router.push('/products')">回到商店</button>
                          <button class="to-order" @click="this.$router.push('/order')" v-if="cartData.carts.length !== 0">下一步</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Loading from '@/components/LoadingView.vue'

export default {
  data () {
    return {
      isLoading: false,
      cartData: {
        carts: []
      },
      couponCode: '',
      couponUsed: false
    }
  },
  components: {
    Loading
  },
  inject: ['emitter'],
  methods: {
    getCartData () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.isLoading = false
          this.cartData = res.data.data
        })
    },
    updateCart (item) {
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoading = true
      this.$http.put(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data })
        .then(() => {
          this.getCartData()
          this.isLoading = false
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '已更新購物車'
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '更新購物車失敗',
            content: err.response.data.message
          })
        })
    },
    removeCart (id) {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then(() => {
          this.getCartData()
          this.isLoading = false
          this.emitter.emit('push-cart')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '已移除商品'
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '移除商品失敗',
            content: err.response.data.message
          })
        })
    },
    removeAllCart () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/carts`)
        .then(() => {
          this.getCartData()
          this.isLoading = false
          this.emitter.emit('push-cart')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '已清空購物車'
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '清空購物車失敗',
            content: err.response.data.message
          })
        })
    },
    useCoupon () {
      const data = { code: this.couponCode }
      this.$http.post(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/coupon`, { data })
        .then(res => {
          this.getCartData()
          this.couponUsed = res.data.success
          console.log(res.data)
        })
    }
  },
  mounted () {
    this.getCartData()
  }
}
</script>

<style lang="scss">
.cart{
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
.cart-content{
    width: 100%;
    margin-bottom: 20px;
    thead{
        background-color: rgb(143, 200, 102);
        tr{
            th{
                text-align: center;
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
            border-bottom: 1px solid rgb(143, 200, 102);
            td{
                width: 15%;
                text-align: center;
                font-size: 18px;
                color: rgb(49, 49, 49);
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
                button{
                  border: none;
                  color: rgb(49, 49, 49);
                  background-color: transparent;
                  &:hover{
                    color: rgb(143, 200, 102);
                  }
                }
                .remove-btn{
                    display: block;
                    margin-left: auto;
                    border: none;
                    color: rgb(49, 49, 49);
                    background-color: transparent;
                    padding: 20px;
                    .fa-trash{
                        margin-right: 5px;
                    }
                }
            }
            .no-item{
                padding: 40px 0;
                a{
                  text-decoration: none;
                  color: rgb(143, 200, 102);
                  font-weight: 600;
                  font-size: 18px;
                }
            }
        }
    }
}

.cart-total{
    border: 1px solid rgb(143, 200, 102);
    background-color: rgba(255,255,255, 0.9);
    border-radius: 10px;
    padding: 20px;
    position: sticky;
    top: 100px;
    h3{
        font-size: 24px;
        font-weight: 600;
        color: rgb(49, 49, 49);
        margin-bottom: 10px;
    }
    .money{
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        font-size: 18px;
        color: rgb(49, 49, 49);
        p{
          margin-bottom: 0;
        }
    }
    .finall-total{
      font-size: 24px;
      font-weight: 600;
    }
    .coupon-btn{
      padding: 20px 0;
      border-bottom: 1px solid rgb(143, 200, 102);
        input{
          width: 70%;
          padding: 5px 10px;
          border-radius: 5px 0 0 5px;
          border: 1px solid rgb(143, 200, 102);
          font-size: 18px;
          outline: none;
        }
        button{
            width: 30%;
            border: none;
            font-size: 18px;
            border-radius: 0 5px 5px 0;
            padding: 6px 10px;
            background-color: rgb(143, 200, 102);
            color: white;
            &:hover{
              background-color: rgb(84, 117, 60);
            }
        }
    }
    .step-btn{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
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
        .to-order{
          background-color: rgb(143, 200, 102);
          color: white;
          &:hover{
            background-color: rgb(84, 117, 60);
          }
        }
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
              top: 50%;
              left: -100px;
              z-index: -2;
          }
      }
  }
}
@media screen and (max-width:430px) {
  .cart-progress{
      li{
          span{
              display: block;
              padding: 5px 10px;
          }
          & + li span::before{
              content: '';
              width: 50px;
              top: 50%;
              left: -50px;
              z-index: -2;
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
  .cart-content{
      tbody{
          tr{
              td{
                  font-size: 16px;
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
