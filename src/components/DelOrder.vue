<template>
  <div class="modal fade" id="delOrderModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close" @click="this.$emit('close-del')"></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">訂單{{currentItem.id}}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal" @click="this.$emit('close-del')">取消
          </button>
          <button type="button" class="btn btn-danger"
          @click="deleteOrder(currentItem)"
          >確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data () {
    return {
      currentItem: {}
    }
  },
  inject: ['emitter'],
  methods: {
    deleteOrder (currentItem) {
      this.$http.delete(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/order/${currentItem.id}`)
        .then((res) => {
          this.$emit('get-orders')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '刪除訂單',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '刪除訂單',
            content: err.response.data.message
          })
        })
    }
  },
  watch: {
    order (newvalue) {
      this.currentItem = JSON.parse(JSON.stringify(newvalue))
    }
  }
}
</script>
