<template>
    <header>
        <div class="burger" @click="toggleMenu = !toggleMenu" :class="{toggleburger: toggleMenu}">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <h1 class="logo">
            <router-link to="/" @click="toggleMenu = !toggleMenu">
                <img src="../assets/logo.png" alt="">
            </router-link>
        </h1>
        <nav :class="{togglenav: toggleMenu}">
            <ul>
                <li><router-link to="/products" @click="toggleMenu = !toggleMenu">牧場商店</router-link></li>
                <li><router-link to="/game" @click="toggleMenu = !toggleMenu">女神小遊戲</router-link></li>
            </ul>
        </nav>
        <div class="nav-icon">
                <router-link to="/favorite">
                    <i class="fa-solid fa-heart"></i>
                </router-link>
                <router-link to="/cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <div class="shopcart-alert" v-if="cartData.carts.length !== 0">{{cartData.carts.length}}</div>
                </router-link>
                <router-link to="/admin">
                    <i class="fa-solid fa-user-gear"></i>
                </router-link>
        </div>
    </header>
</template>

<script>
export default {
  data () {
    return {
      toggleMenu: false,
      cartData: {
        carts: []
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getCartData () {
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
    }
  },
  mounted () {
    this.getCartData()
    this.emitter.on('push-cart', () => {
      this.getCartData()
    })
  }
}
</script>

<style lang="scss">
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    background-color: rgb(49, 49, 49);
    position: sticky;
    top: 0;
    z-index: 99;
    height: 95px;
    .logo{
        margin-bottom: 0;
        width: 150px;
        a{
            img{
                vertical-align: bottom;
                width: 100%;
            }
        }
    }
    .burger{
        width: 50px;
        height: 50px;
        border-radius: 5px;
        background-color: rgb(185, 142, 81);
        display: none;
        align-items: center;
        position: relative;
        z-index: 99;
        span{
            width: 40px;
            height: 3px;
            background-color: white;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            transition: top 0.5s 0.2s, bottom 0.5s 0.2s, opacity 0.5s 0.2s,
            transform 0.2s;
            &:first-child{
                top: 10px;
                transform: rotate(0deg);
            }
            &:last-child{
                bottom: 10px;
                transform: rotate(0deg);
            }
            &:nth-child(2){
                bottom: 0px;
                top: 0px;
                opacity: 1;
            }
        }
    }
    nav{
        display: flex;
        align-items: center;
        ul{
            display: flex;
            margin-bottom: 0;
            padding-left: 0;
            li{
                padding: 10px 20px;
                a{
                    text-decoration: none;
                    font-size: 24px;
                    color: white;
                    &:hover{
                        color:rgb(143, 200, 102);
                    }
                }
            }
        }
    }
    .nav-icon{
        display: flex;
        align-items: center;
        a{
            text-decoration: none;
            font-size: 24px;
            color: white;
            position: relative;
            &:first-child{
                margin:0 20px 0 0;
            }
            &:nth-child(2){
                margin:0 20px 0 0;
            }
            &:hover{
                color:rgb(143, 200, 102);
            }
            .shopcart-alert{
                width: 20px;
                height: 20px;
                border-radius: 90%;
                background-color: red;
                text-align: center;
                line-height: 16px;
                font-size: 16px;
                color: white;
                text-decoration: none;
                position: absolute;
                top: -7px;
                right: -7px;
            }
        }
    }
}
@media screen and (max-width:1200px) {
    header{
        padding: 15px 20px;
        .logo{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .burger{
            display: flex;
        }
        .toggleburger{
            span{
                &:first-child{
                    transform: rotate(45deg);
                    top: 23px;
                    transition: transform 0.2s 0.5s, top 0.5s;
                }
                &:last-child{
                    transform: rotate(-45deg);
                    bottom: 23px;
                    transition: transform 0.2s 0.5s, bottom 0.5s;
                }
                &:nth-child(2){
                    opacity: 0;
                    transition: opacity 0.5s;
                }

            }
        }
        nav{
            position: absolute;
            background-color: rgb(75, 75, 75);
            top: 100%;
            left: 0;
            width: 100%;
            transition: 0.3s linear;
            max-height: 0px;
            overflow: hidden;
            ul{
                flex-direction: column;
                width: 100%;
                li{
                    width: 100%;
                }
                li + li {
                    border-top: 1px solid #fff;
                }
            }
        }
        .togglenav{
            max-height: 150px;
            transition: 0.3s linear;
        }
    }
}
@media screen and (max-width: 460px) {
    header{
        .nav-icon{
            a{
                font-size: 18px;
                &:first-child{
                    margin:0 10px 0 0;
                }
                &:nth-child(2){
                    margin:0 10px 0 0;
                }
            }
        }
    }
}
@media screen and (max-width: 375px) {
    header{
        padding: 15px 10px;
    }
}
</style>
