<template>
    <div class="loading-bg">
        <div class="load-content">
            <div class="load-img">
                <img src="../assets/chicken.gif" alt="">
            </div>
            <div class="load-txt">
                <span style="--i:1">N</span>
                <span style="--i:2">o</span>
                <span style="--i:3">w</span>
                <span style="--i:4">&ensp;</span>
                <span style="--i:5">L</span>
                <span style="--i:6">o</span>
                <span style="--i:7">a</span>
                <span style="--i:8">d</span>
                <span style="--i:9">i</span>
                <span style="--i:10">n</span>
                <span style="--i:11">g</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.loading-bg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    .load-content{
        width: 150px;
        .load-img{
            width: 100%;
            margin-bottom: 10px;
            img{
                width: 100%;
                vertical-align: middle;
            }
        }
        .load-txt{
            display: flex;
            justify-content: center;
            span{
                font-size: 24px;
                color: black;
                font-weight: 900;
                animation: wave 1.5s ease-in-out infinite;
                animation-delay: calc(0.1s * var(--i));
            }
        }
    }
}
@keyframes wave{
  0%{
    transform: translateY(0px)
  }
  20%{
    transform: translateY(-10px)
  }
  40%, 100%{
    transform: translateY(0px)
  }
}
</style>
