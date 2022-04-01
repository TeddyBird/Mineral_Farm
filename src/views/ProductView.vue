<template>
  <Loading v-if="isLoading"></Loading>
  <div class="product">
    <div class="product-content">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-5">
            <div class="product-img">
              <div class="main-img">
                <img :src="product.imageUrl" ref="mainImg">
              </div>
              <div class="switch-imgs">
                <div class="switch-img" v-for="(img,index) in product.imagesUrl" :key="img+1" @click="changeImg(index)" :class="{tempimg: img === temImage}">
                  <img :src="img" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-7">
            <div class="product-txt">
              <span class="category">{{product.category}}</span>
              <h2>{{product.title}}</h2>
              <span class="description">【產品介紹】</span>
              <p>{{product.description}}</p>
              <span class="description">【生長週期】</span>
              <p>{{product.content}}</p>
              <div class="product-price">
                <del v-if="product.origin_price !== product.price">{{product.origin_price}} G</del>
                <p class="price">{{product.price}} G</p>
              </div>
              <div class="shopcart">
                <div class="counter">
                  <button class="minus" @click="minusNum" :disabled="qty === 1"><i class="fa-solid fa-minus"></i></button>
                  <input type="number" v-model.number="qty" disabled>
                  <button class="plus" @click="plusNum"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="add-cart" @click="addToCart(product.id)"><i class="fa-solid fa-cart-shopping"></i>加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative" v-if="relativeProducts.length !== 0">
      <h2>你可能也會喜歡...</h2>
      <div class="container">
          <ul class="product-area row">
              <li class="product-card col-12 col-md-6 col-lg-3" v-for="item in relativeProducts" :key="item.id">
                  <div class="product-item">
                      <router-link :to="`/product/${item.id}`">
                          <div class="tag" v-if="item.tag">{{item.tag}}
                              <div class="angle"></div>
                          </div>
                          <div class="product-img">
                              <img :src="item.imageUrl" alt="">
                          </div>
                          <div class="product-txt">
                              <div class="product-title">
                                  <h3>{{item.title}}</h3>
                                  <span>{{item.category}}</span>
                              </div>
                              <div class="product-price">
                                  <del v-if="item.origin_price !== item.price">{{item.origin_price}} G</del>
                                  <p>{{item.price}} G</p>
                              </div>
                          </div>
                          </router-link>
                      <div class="cart-btn">
                          <button @click = "addToCart(item.id)"><i class="fa-solid fa-cart-shopping"></i>加入購物車</button>
                      </div>
                      <div class="fav-heart" v-if="favoriteId.includes(item.id)" @click="removeFavorite(item)">
                          <i class="fa-solid fa-heart"></i>
                      </div>
                      <div class="fav-heart" @click="addFavorite(item)" v-else>
                          <i class="fa-regular fa-heart"></i>
                      </div>
                  </div>
              </li>
          </ul>
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
      product: '',
      category: '',
      temImage: '',
      qty: 1,
      relativeProducts: [],
      favoriteId: [],
      favoriteList: [],
      id: ''
    }
  },
  components: {
    Loading
  },
  inject: ['emitter'],
  methods: {
    getProduct () {
      this.isLoading = true
      this.relativeProducts = []
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.isLoading = false
          this.product = res.data.product
          this.category = res.data.product.category
          this.id = res.data.product.id
          this.temImage = res.data.product.imageUrl
          this.getRelative()
        })
    },
    getRelative () {
      this.isLoading = true
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products?category=${this.category}`)
        .then(res => {
          this.isLoading = false
          const arr = res.data.products.filter(item => item.category === this.category && item.id !== id)
          if (arr.length >= 4) {
            for (let i = 0; i < 4; i++) {
              this.relativeProducts.push(arr[i])
            }
          } else {
            for (let i = 0; i < arr.length; i++) {
              this.relativeProducts.push(arr[i])
            }
          }
        })
    },
    changeImg (idx) {
      this.$refs.mainImg.src = this.product.imagesUrl[idx]
      this.temImage = this.product.imagesUrl[idx]
    },
    plusNum () {
      this.qty++
    },
    minusNum () {
      this.qty--
    },
    addToCart (id) {
      const data = {
        product_id: id,
        qty: this.qty
      }
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then(() => {
          this.isLoading = false
          this.emitter.emit('push-cart')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '已加入購物車'
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '加入購物車失敗',
            content: err.response.data.message
          })
        })
    },
    addFavorite (item) {
      this.favoriteList.push(item)
      this.favoriteId.push(item.id)
      this.favoriteList = [...new Set(this.favoriteList)]
      this.favoriteId = [...new Set(this.favoriteId)]
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
      localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId))
    },
    removeFavorite (item) {
      this.favoriteList.forEach((i, index) => {
        if (i.id === item.id) {
          this.favoriteList.splice(index, 1)
          localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
        }
      })
      this.favoriteId.forEach((i, index) => {
        if (i === item.id) {
          this.favoriteId.splice(index, 1)
          localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId))
        }
      })
    }
  },
  watch: {
    $route (to) {
      this.id = to.params.id
      this.getProduct()
    }
  },
  mounted () {
    this.getProduct()
    this.favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || []
    this.favoriteId = JSON.parse(localStorage.getItem('favoriteId')) || []
  }
}
</script>

<style lang="scss">
.product{
    background-image: url(../assets/bg_pattern_brick_pink.png);
    position: relative;
    z-index: 1;
    min-height: 80vh;
}
.product-content{
  padding: 50px 0 0 0;
  .product-img{
    margin-bottom: 30px;
    .main-img{
      width: 100%;
      margin: 0 0 30px 0;
      background-image: url(../assets/bg-layer.png);
      background-color: rgb(74, 182, 74);
      position: relative;
      box-shadow: 8px 8px rgba(0, 0, 0, .2);
      &::before{
        content: '';
        width: 2.1vw;
        height: 3.3vw;
        position: absolute;
        background-image: url(../assets/img-pin.png);
        background-repeat: no-repeat;
        background-size: cover;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
      }
      img{
        width:100%;
        vertical-align: middle;
      }
    }
    .switch-imgs{
      display: flex;
      width: 100%;
      background-image: url(../assets/woodbg.png);
      background-size: cover;
      background-position: center;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 8px 8px rgba(0, 0, 0, .2);
      .switch-img{
        width:20%;
        background-image: url(../assets/bg-layer.png);
         background-color: rgb(74, 182, 74);
        img{
          width: 100%;
          vertical-align: middle;
        }
      }
      .tempimg{
        border: 3px solid red;
      }
    }
  }
  .product-txt{
    padding: 0 80px;
    .category{
      border-radius: 5px;
      background-color: rgb(143, 200, 102);
      color: white;
      font-size: 14px;
      align-self: flex-start;
      padding: 3px 10px;
      white-space:nowrap;
    }
    h2{
      padding: 20px 0;
      margin-bottom: 0;
      font-weight: 600;
      font-size: 36px;
      color: rgb(185, 142, 81);
    }
    .description{
      font-size: 20px;
      display: block;
    }
    p{
      padding: 20px 0;
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 0;
    }
    .product-price{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 60px;
      del{
        font-size: 18px;
        margin-right: 10px;
        color: rgb(122, 122, 122);
      }
      .price{
        padding: 0;
        font-size: 30px;
        font-weight: 600;
      }
    }
    .shopcart{
      display: flex;
      justify-content: space-between;
      .counter{
        width: 45%;
        display: flex;
        align-items: center;
        .minus{
          border-radius: 30px 0 0 30px;
          border: none;
          width: 20%;
          padding: 10px;
          background-color: rgb(143, 200, 102);
          color: white;
          &:hover{
            background-color: rgb(84, 117, 60);
          }
        }
        .plus{
          border-radius: 0 30px 30px 0;
          border: none;
          width: 20%;
          padding: 10px;
          background-color: rgb(143, 200, 102);
          color: white;
          &:hover{
            background-color: rgb(84, 117, 60);
          }
        }
        input{
          text-align: center;
          font-size: 20px;
          width: 60%;
          border: none;
          padding: 7px;
          background-color: #eee;
        }
      }
      .add-cart{
        width: 45%;
        border-radius: 30px;
        font-size: 20px;
        border: none;
        background-color: rgb(185, 142, 81);
        color: white;
        &:hover{
          background-color: rgb(107, 79, 43);
        }
        .fa-cart-shopping{
          margin-right: 10px;
        }
      }
    }
  }
}
@media screen and (max-width:992px) {
  .product-content{
    padding: 50px 0 0 0;
    .product-img{
      margin-bottom: 30px;
      .main-img{
        &::before{
          width: 4.2vw;
          height: 6.6vw;
        }
      }
    }
    .product-txt{
      padding: 0px;
      margin-bottom: 50px;
    }
  }
}
@media screen and (max-width:576px) {
  .product-content{
    .product-img{
      .main-img{
        &::before{
          width: 6.3vw;
          height: 9.9vw;
        }
      }
    }
  }
}
.relative{
  padding: 20px 0;
  h2{
    font-size: 36px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 50px;
    color: rgb(185, 142, 81);
  }
}
.product-area{
    padding-left: 0;
    margin-bottom: 0;
    .product-card{
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        a{
            text-decoration: none;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .product-item{
            border: 1px solid rgb(185, 142, 81);
            position: relative;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            &:hover{
                box-shadow: 8px 8px rgba(0, 0, 0, .2);
                transform: translateY(-8px);
                transition: 0.1s linear;
            }
            a{
                text-decoration: none;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
            }
            &:hover .product-img img{
                animation: bounce1 0.3s ease-in-out 3;
            }
            .tag {
                min-width: 70px;
                background-color: rgba(255, 154, 38);
                padding: 5px 10px;
                text-align: center;
                color: white;
                position: absolute;
                top: 5px;
                left: -10px;
                z-index: 50;
                font-size: 18px;
                .angle {
                    height: 0;
                    width: 0;
                    border-top: 9px solid rgb(143, 1, 1);
                    border-left: 9px solid transparent;
                    position: absolute;
                    left: 0;
                    bottom: -9px;
                }
            }
            .fav-heart{
                position: absolute;
                top: 0;
                right: 5px;
                .fa-heart{
                    font-size: 35px;
                    color: rgb(247, 108, 74);
                }
            }
            .product-img{
                overflow: hidden;
                background-image: url(../assets/bg-layer.png);
                background-color: white;
                img{
                    width: 100%;
                    vertical-align: middle;
                }
            }
            .product-txt{
                padding: 0 10px;
                background-color: #eee;
                position: relative;
                z-index: 2;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                .product-title{
                    display: flex;
                    justify-content: space-between;
                    padding: 5px 0;
                    flex-grow: 1;
                    h3{
                        margin-bottom: 0;
                        font-size: 24px;
                        font-weight: 600;
                        color: rgb(185, 142, 81);
                    }
                    span{
                        border-radius: 5px;
                        background-color: rgb(143, 200, 102);
                        color: white;
                        font-size: 14px;
                        align-self: flex-start;
                        padding: 0 8px;
                        white-space:nowrap;
                    }
                }
                .product-price{
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    padding: 5px 0;
                    del{
                        font-size: 14px;
                        margin-right: 15px;
                        color: rgb(122, 122, 122);
                    }
                    p{
                        margin-bottom: 0;
                        font-size: 20px;
                        color: rgb(49, 49, 49);
                    }
                }
            }
            .cart-btn{
                position: relative;
                z-index: 50;
                button{
                    padding: 5px 0;
                    border: none;
                    width: 100%;
                    color: white;
                    font-size: 20px;
                    background-color: rgb(185, 142, 81);
                    .fa-cart-shopping{
                        margin-right: 10px;
                    }
                    &:hover{
                        background-color: rgb(107, 79, 43);
                    }
                }
            }
        }
    }
}
</style>
