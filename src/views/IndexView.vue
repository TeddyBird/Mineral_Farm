<template>
    <Loading v-if="isLoading"></Loading>
    <ScrollTop data-aos="fade-up" data-aos-offset="300"></ScrollTop>
    <div class="banner">
        <swiper
            :slides-per-view="1"
            :space-between="0"
            :modules="modules"
            :loop="true"
            :autoplay="{
            delay: 2500,
            }"
            :effect="'fade'"
        >
                <swiper-slide><img src="../assets/slide-img-g3ex.jpg" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/slide-img-o2ex.jpg" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/slide-img-s1ex.jpg" alt=""></swiper-slide>
            </swiper>
        <div class="banner-bg">
            <div class="banner-txt">
                <p>歡迎來到礦石牧場，<br>趕緊來體驗溫馨的牧場生活吧!</p>
            </div>
            <div class="banner-img">
                <img src="../assets/img-mv.png" alt="">
            </div>
        </div>
    </div>
    <section class="about">
        <h2 id="about-title">在礦石牧場裡，你可以...</h2>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-4">
                    <div class="about-item" data-aos="fade-up" data-aos-anchor="#about-title"  data-aos-anchor-placement="top-center">
                        <div class="about-img">
                            <img src="../assets/plant.jpg" alt="">
                        </div>
                        <div class="about-txt">
                            <h3>種植農作物!</h3>
                            <p>牧場的田地上，可以種植蔬菜及水果。天天照顧作物直到成熟，就可以採收併出貨囉!</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="about-item" data-aos="fade-up" data-aos-delay="500" data-aos-anchor="#about-title" data-aos-anchor-placement="top-center">
                        <div class="about-img">
                            <img src="../assets/husbandry.jpg" alt="">
                        </div>
                        <div class="about-txt">
                            <h3>飼養可愛動物!</h3>
                            <p>牧場裡可以飼養各種動物，用心照顧可以產出牛奶或雞蛋喔!</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="about-item" data-aos="fade-up" data-aos-delay="1000" data-aos-anchor="#about-title" data-aos-anchor-placement="top-center">
                        <div class="about-img">
                            <img src="../assets/fishing.jpg" alt="">
                        </div>
                        <div class="about-txt">
                            <h3>還有其他活動!</h3>
                            <p>礦石牧場還有許多其他有趣活動，等著你來體驗~</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="products-parallax">
        <div class="parallax-content">
            <p>覺得動物們很可愛? 那就帶一隻回家吧!</p>
            <button @click="this.$router.push('/products')">前往牧場商店</button>
        </div>
    </div>
    <section class="hot-products">
        <h2>熱銷商品</h2>
        <div class="container">
            <swiper
            :slides-per-view="1"
            :space-between="50"
            :modules="modules"
            navigation
            :loop="true"
            :pagination="{ clickable: true }"
            :breakpoints="{
                '992':{
                    slidesPerView: 4,
                    spaceBetween: 30
                },
                '768': {
                    slidesPerView: 2,
                    spaceBetween: 50
                }
            }">
                <swiper-slide v-for="item in getHotProducts" :key="item.id">
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
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/effect-fade/effect-fade.min.css'
import Loading from '@/components/LoadingView.vue'
import ScrollTop from '@/components/ScrollTop.vue'

export default {
  data () {
    return {
      isLoading: false,
      products: [],
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      favoriteId: [],
      favoriteList: []
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Loading,
    ScrollTop
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products/all`)
        .then(res => {
          this.isLoading = false
          this.products = res.data.products
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
  computed: {
    getHotProducts () {
      const hotProducts = this.products.filter(item => {
        return item.tag === '熱銷'
      })
      return hotProducts
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
.banner{
    width: 100%;
    position: relative;
    height: 80vh;
    .swiper{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -50;
        .swiper-slide{
            width: 100%;
            height: 100%;
            img{
                width: 100%;
                height: 100%;
                vertical-align: middle;
                object-fit: cover;
            }
        }
    }
    .banner-bg{
        background: linear-gradient(115deg, rgb(143, 200, 102) 50%, transparent 50%);
        height: 100%;
        display: flex;
        .banner-txt{
            height: 100%;
            width: 50%;
            position: relative;
            p{
                width: 60%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                font-size: 36px;
                font-weight: 600;
                line-height: 1.8;
                margin-bottom: 0;
                color: white;
            }

        }
        .banner-img{
            width: 50%;
            position: relative;
            img{
                position: absolute;
                top:50%;
                left: 50%;
                transform: translate(-50%,-50%);
                vertical-align: middle;
                max-width: 60%;
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .banner{
        .swiper{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -50;
            .swiper-slide{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                    object-fit: cover;
                }
            }
        }
        .banner-bg{
            background: transparent;
            display: flex;
            flex-direction: column-reverse;
            width: 100%;
            .banner-txt{
                width: 100%;
                height: auto;
                position: absolute;
                top: 60%;
                z-index: 5;
                p{
                    position: relative;
                    top: 0;
                    left: 0;
                    transform: translate(0,0);
                    width: 80%;
                    margin: auto;
                    background-color: rgb(143, 200, 102);
                    opacity: 0.95;
                    padding: 15px;
                    font-size: 30px;
                    border-radius: 10px;
                }

            }
            .banner-img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                img{
                    max-width: 70%;

                }
            }
        }
    }
}
.about{
    width: 100%;
    padding: 80px 0;
    background-color: rgb(233, 233, 233);
    background-image: url(../assets/bghorse2.png);
    h2{
        font-size: 36px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 50px;
    }
    .container{
        .col-12{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .col-md-4{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .about-item{
            padding: 0 35px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            .about-img{
                width: 100%;
                margin: auto;
                img{
                    width: 100%;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
            .about-txt{
                width: 100%;
                margin: auto;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                h3{
                    font-size: 24px;
                    font-weight: 600;
                    padding: 20px 0;
                    margin-bottom: 0;
                    color: rgb(143, 200, 102);
                }
                p{
                    font-size: 18px;
                    padding: 10px 0;
                    margin-bottom: 0;
                    flex-grow: 1;
                }
            }
        }
    }
}
@media screen and (max-width:992px) {
    .about{
        .container{
            .about-item{
                padding: 0 10px;
            }
        }
    }
}
@media screen and (max-width:768px) {
    .about{
        .container{
            .about-item{
                padding: 0 5px;
                flex-direction: row;
                margin-bottom: 30px;
                .about-img{
                    width: 40%;
                    margin: 0 15px 0 0;
                }
                .about-txt{
                    width: 60%;
                }
            }
        }
    }
}
@media screen and (max-width:576px) {
    .about{
        .container{
            .about-item{
                padding: 0 15px;
                flex-direction: column;
                margin-bottom: 30px;
                .about-img{
                    width: 80%;
                    margin: auto;
                }
                .about-txt{
                    width: 80%;
                }
            }
        }
    }
}
.products-parallax{
    background-image: url("../assets/hero-news-2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .parallax-content{
        p{
            text-align: center;
            font-size: 36px;
            padding: 15px;
            border-radius: 10px;
            font-weight: 600;
            background-color: rgba(255,255,255,0.3);
        }
        button{
            border: 5px solid white;
            border-radius: 10px 0 10px 0;
            padding: 8px 15px;
            display: block;
            margin: auto;
            font-size: 24px;
            color: white;
            background-color: rgb(185, 142, 81);
            &:hover{
                background-color: rgb(107, 79, 43);
            }
        }
    }
}
.hot-products{
    padding: 50px 0;
    background-image: url(../assets/bgalpaca.png);
    background-color: rgb(233, 233, 233);
    h2{
        font-size: 36px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 50px;
    }
    .container{
        position: relative;
        display: flex;
    }
    .swiper{
        padding: 20px;
        position: static;
    }
    .swiper-button-prev {
        left: -10px;
        &::after{
            content: '';
            background-image: url(../assets/prev.png);
            background-size: cover;
            background-position: center;
            width: 60px;
            height: 60px;
            position: absolute;
        }
    }
    .swiper-button-next {
        right: -10px;
        &::after{
            content: '';
            background-image: url(../assets/arrow.png);
            background-size: cover;
            background-position: center;
            width: 60px;
            height: 60px;
            position: absolute;
        }
    }
    .swiper-horizontal>.swiper-pagination-bullets{
        bottom: -20px;
    }
    .swiper-slide{
        display: flex;
        flex-direction: column;
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
@media screen and (max-width:576px) {
    .hot-products{
        .swiper-button-prev {
            left: 20px;
        }
        .swiper-button-next {
            right: 20px;
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
</style>
