<template>
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span>刪除產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="this.$emit('close-del')"></button>
                </div>
                <div class="modal-body">
                是否刪除
                    <strong class="text-danger">{{currentItem.title}}</strong> 商品(刪除後將無法恢復)。
                </div>
                 <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="this.$emit('close-del')">
                    取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="deleteProduct()">
                    確認刪除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['currentProduct', 'action'],
  data () {
    return {
      currentItem: {}
    }
  },
  inject: ['emitter'],
  methods: {
    deleteProduct () {
      const id = this.currentItem.id
      this.$http.delete(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product/${id}`)
        .then((res) => {
          this.$emit('get-data')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '刪除商品',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.$emit('close-del')
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '刪除商品',
            content: err.response.data.message
          })
        })
    }
  },
  watch: {
    currentProduct (newvalue) {
      this.currentItem = JSON.parse(JSON.stringify(newvalue))
    }
  }
}
</script>
