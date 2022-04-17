<template>
    <div class="favorite">
        <Loading v-if="isLoading"/>
        <div class="container">
            <div class="title">
                <h2>您的追蹤清單</h2>
                <span>共 {{favoriteList.length}} 項</span>
            </div>
            <ul class="product-area row">
                <li class="product-card col-12 col-md-6 col-lg-3" v-for="item in favoriteList" :key="item.id">
                    <div class="product-item">
                        <router-link :to="`/product/${item.id}`">
                            <div class="tag" v-if="item.tag">{{item.tag}}
                                <div class="angle"></div>
                            </div>
                            <div class="product-img">
                                <img :src="item.imageUrl" :alt="item.title">
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
                            <button type="button" @click = "addToCart(item.id)"><i class="fa-solid fa-cart-shopping"></i>加入購物車</button>
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
</template>

<script>
import Loading from '@/components/LoadingView.vue'

export default {
  data () {
    return {
      isLoading: false,
      favoriteId: [],
      favoriteList: []
    }
  },
  components: {
    Loading
  },
  inject: ['emitter'],
  methods: {
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
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
  mounted () {
    this.favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || []
    this.favoriteId = JSON.parse(localStorage.getItem('favoriteId')) || []
  }
}
</script>

<style lang="scss">
.favorite{
    min-height: calc(100vh - 225px);
    background-image: url(../../assets/bg_pattern_brick_pink.png);
    padding: 25px 0;
    .title{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-bottom: 1px solid rgb(185, 142, 81);
        color: rgb(185, 142, 81);
        margin-bottom: 30px;
        padding: 10px 0;
        h2{
            font-size: 36px;
            font-weight: 600;
        }
        span{
            display: block;
            font-size: 20px;
            font-weight: 600;
        }
    }
}
.product-area{
    padding-left: 0;
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
                background-image: url(../../assets/bg-layer.png);
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
                        color: black;
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
