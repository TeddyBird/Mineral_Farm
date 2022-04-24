<template>
    <div class="pagination">
        <ul>
            <li class="pre-page" :class="{disabledBtn:!pages.has_pre}" @click="changePage('prev')"><i class="fa-solid fa-angles-left"></i></li>
            <li v-for="page in pages.total_pages" :key="page+1" :class="{activePage: pages.current_page === page}"
            @click="$emit('get-page',page, category)">{{ page }}</li>
            <li class="next-page" :class="{disabledBtn:!pages.has_next}" @click="changePage('next')"><i class="fa-solid fa-angles-right"></i></li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['pages', 'category'],
  data () {
    return {
    }
  },
  methods: {
    changePage (move) {
      if (move === 'next') {
        this.$emit('get-page', this.pages.current_page + 1, this.category)
      } else if (move === 'prev') {
        this.$emit('get-page', this.pages.current_page - 1, this.category)
      }
    }
  }
}
</script>

<style lang="scss">
.pagination{
    display: flex;
    justify-content: center;
    font-size: 20px;
    padding: 0 0 50px 0;
    ul{
        display: flex;
        padding-left: 0;
        margin-bottom: 0;
        li{
          padding: 5px 10px;
          margin: 0 5px;
          cursor: pointer;
          color: rgb(107, 79, 43);
        }
        .activePage{
            color: white;
            background-color: rgb(107, 79, 43);
        }
        .disabledBtn{
            color: #ccc;
        }
    }
}
</style>
