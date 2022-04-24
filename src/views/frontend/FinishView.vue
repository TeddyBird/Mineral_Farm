<template>
    <div class="finish">
        <ol class="cart-progress">
            <li><span>step 1</span>確認清單</li>
            <li><span>step 2</span>填寫資料</li>
            <li><span>step 3</span>確認付款</li>
            <li class="cur-step"><span>step 4</span>完成訂單</li>
        </ol>
        <div class="container">
            <div class="finish-content">
                <div class="finish-txt">
                    <p>感謝您的購買!!</p>
                    <button type="button" @click="this.$router.push('/products')">繼續購買</button>
                </div>
                <div class="finish-img">
                    <img src="../../assets/peat.png" alt="牧場主人">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.finish{
  background-image: url(../../assets/bg-tokuten.jpg);
  background-size: cover;
  background-position-y: top;
  padding: 50px 0;
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 210px);
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
.finish-content{
    max-width: 800px;
    margin: auto;
    position: relative;
    .finish-img{
        width: 60%;
        margin-left: auto;
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
    .finish-txt{
        position: absolute;
        top: 10%;
        left: 10%;
        p{
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        button{
            border: none;
            border-radius: 5px;
            padding: 5px 20px;
            font-size: 24px;
            display: block;
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
