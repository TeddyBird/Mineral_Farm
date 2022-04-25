<template>
    <div class="products">
        <Loading v-if="isLoading"/>
        <div class="shop-sign" :class="{moveshopsign: !isLoading}">
            <img src="../../assets/shopsign.png" alt="牧場商店招牌">
        </div>
        <section class="product-sction">
            <div class="product-sort container">
                <ul>
                    <li @click = "getProducts(1,'')" :class="{activesort: tempCategory === ''}">全部商品
                        <img src="../../assets/koro-chara.png" alt="全部商品">
                    </li>
                    <li @click = "getProducts(1,'乳香世家')" :class="{activesort: tempCategory === '乳香世家'}">乳香世家
                        <img src="../../assets/cow.png" alt="乳香世家">
                    </li>
                    <li @click = "getProducts(1,'母雞咕咕')" :class="{activesort: tempCategory === '母雞咕咕'}">母雞咕咕
                        <img src="../../assets/chicken.png" alt="母雞咕咕">
                    </li>
                    <li @click = "getProducts(1,'軟綿綿')" :class="{activesort: tempCategory === '軟綿綿'}">軟綿綿
                        <img src="../../assets/rabbit.png" alt="軟綿綿">
                    </li>
                    <li @click = "getProducts(1,'可愛寵物')" :class="{activesort: tempCategory === '可愛寵物'}">可愛寵物
                        <img src="../../assets/momonosuke.png" alt="可愛寵物">
                    </li>
                    <li @click = "getProducts(1,'賽馬大會')" :class="{activesort: tempCategory === '賽馬大會'}">賽馬大會
                        <img src="../../assets/horse.png" alt="賽馬大會">
                    </li>
                </ul>
            </div>
            <div class="container">
                <select name="sort" id="sort" v-model="sort" @change="sortProducts">
                    <option disabled value="">商品排序</option>
                    <option value="asc">價格由低到高</option>
                    <option value="des">價格由高到低</option>
                </select>
                <ul class="product-area row">
                    <li class="product-card col-12 col-md-6 col-lg-3" v-for="item in products" :key="item.id">
                        <div class="product-item">
                            <router-link :to="`/product/${item.id}`">
                                <div class="tag" v-if="item.tag">{{ item.tag }}
                                    <div class="angle"></div>
                                </div>
                                <div class="product-img">
                                    <img :src="item.imageUrl" :alt="item.title">
                                </div>
                                <div class="product-txt">
                                    <div class="product-title">
                                        <h3>{{ item.title }}</h3>
                                        <span>{{ item.category }}</span>
                                    </div>
                                    <div class="product-price">
                                        <del v-if="item.origin_price !== item.price">{{ item.origin_price }} G</del>
                                        <p>{{ item.price }} G</p>
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
        </section>
        <pagination :category="tempCategory" :pages="paginationInfo" @get-page="getProducts"/>
    </div>
</template>

<script>
import pagination from '@/components/Pagination.vue'
import Loading from '@/components/LoadingView.vue'

export default {
  data () {
    return {
      isLoading: false,
      products: [],
      paginationInfo: '',
      tempCategory: '',
      sort: '',
      favoriteId: [],
      favoriteList: [],
      cartData: {
        carts: []
      }
    }
  },
  components: {
    pagination,
    Loading
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1, tempCategory = '') {
      this.isLoading = true
      this.tempCategory = tempCategory
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products?page=${page}&category=${this.tempCategory}`)
        .then(res => {
          this.isLoading = false
          this.products = res.data.products
          this.paginationInfo = res.data.pagination
          this.sort = ''
        })
    },
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
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
    sortProducts () {
      if (this.sort === 'asc') {
        this.products.sort((a, b) => {
          return a.price - b.price
        })
      } else if (this.sort === 'des') {
        this.products.sort((a, b) => {
          return b.price - a.price
        })
      }
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
    this.getProducts()
    this.favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || []
    this.favoriteId = JSON.parse(localStorage.getItem('favoriteId')) || []
  }
}
</script>

<style lang="scss">
.products{
    background-image: url(../../assets/bg_pattern_brick_pink.png);
    position: relative;
    z-index: 1;
    min-height: calc(100vh - 210px);
}
.shop-sign{
    width: 100%;
    margin: 0 0 100px 0;
    img{
        max-width: 40%;
        display: block;
        margin: auto;
    }
}
.moveshopsign{
    animation: sign 1s linear;
}
@media screen and (max-width:992px) {
    .shop-sign{
        img{
            max-width: 50%;
        }
    }
}
@media screen and (max-width:768px) {
    .shop-sign{
        margin: 0 0 50px 0;
        img{
            max-width: 70%;
        }
    }
}
@media screen and (max-width:375px) {
    .shop-sign{
        margin: 0 0 30px 0;
        img{
            max-width: 85%;
        }
    }
}
.product-sort{
    margin: 20px auto;
    ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border-bottom: 1px solid rgb(143, 1, 1);
        padding-left: 0;
        font-family: 'cwTeXYen', 'Noto Sans TC', sans-serif;
        li{
            border-radius: 10px 10px 0 0;
            width: 15%;
            padding: 10px;
            font-size: 28px;
            font-weight: 600;
            color: rgb(143, 1, 1);
            text-align: center;
            cursor: pointer;
            position: relative;
            img{
                width: 100px;
                position: absolute;
                top: -60px;
                left: 50%;
                transform: translate(-50%,-10px);
                z-index: -2;
                opacity: 0;
            }
            &:hover img{
                opacity: 1;
                animation: bounce2 0.2s ease-in-out;

            }
            &:hover{
                background-color: rgb(143, 1, 1);
                color: white;
            }
        }
        .activesort{
            background-color: rgb(143, 1, 1);
            color: white;
            img{
                opacity: 1;
            }
        }
    }
}
@media screen and (max-width:992px) {
    .product-sort{
        ul{
            justify-content: space-between;
            border: none;
            li{
                border-radius: 10px;
                border: 1px solid rgb(143, 1, 1);
                width: 30%;
                margin-bottom: 10px;
                img{
                    width: 70px;
                    top: -10px;
                    left: 95%;
                    z-index: 1;
                }
            }
        }
    }
}
@media screen and (max-width:768px) {
    .product-sort{
        ul{
            justify-content: space-between;
            border: none;
            li{
                width: 49%;
                margin-bottom: 10px;
                img{
                    width: 80px;
                    top: -10px;
                    left: 90%;
                }
            }
        }
    }
}
@media screen and (max-width:460px) {
    .product-sort{
        ul{
            li{
                padding: 5px;
                width: 85%;
                margin: 0 auto 10px;
                img{
                    width: 80px;
                    top: -10px;
                    left: 90%;
                }
            }
        }
    }
}
select{
    font-size: 20px;
    margin-bottom: 20px;
    margin-right: 0;
    margin-left: auto;
    display: block;
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
                background-color: rgb(185, 142, 81);
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
                    border-top: 9px solid rgb(107, 79, 43);
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
                    color: rgb(185, 142, 81);
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
@keyframes bounce1 {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes bounce2 {
  0% {
    transform: translate(-50%,0px);
  }
  50% {
    transform: translate(-50%,-10px);
  }
  100% {
    transform: translate(-50%,0px);
  }
}
@keyframes sign {
   0% {
    transform: translateY(-100%);
   }
   14.3% {
    transform: translateY(0);
   }
   28.5% {
    transform: translateY(-80px);
   }
   42.9% {
    transform: translateY(0);
   }
   57% {
    transform: translateY(-30px);
   }
   71.5% {
    transform: translateY(0);
   }
   85.7% {
    transform: translateY(-10px);
   }
   100% {
    transform: translateY(0);
   }
}
</style>
