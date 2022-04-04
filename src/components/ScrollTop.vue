<template>
    <div class="to-top" @click="goTop">
        <div class="to-top-img">
            <img src="../assets/cow.gif" alt="">
        </div>
        <span>回到頁首</span>
    </div>
</template>

<script>
export default {
  methods: {
    goTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss">
.to-top{
    position: fixed;
    bottom: 50px;
    right: 20px;
    width: 85px;
    z-index: 80;
    border-radius: 10px;
    cursor: pointer;
    .to-top-img{
        width: 100%;
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
    span{
        display: block;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        color: rgb(49, 49, 49);
    }
}
@media screen and (max-width:576px) {
  .to-top{
    display: none;
  }
}
</style>
