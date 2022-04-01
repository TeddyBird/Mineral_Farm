<template>
    <div id="delCouponModal" ref="delCouponModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span>刪除優惠卷</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="this.$emit('close-del')"></button>
                </div>
                <div class="modal-body">
                是否刪除
                    <strong class="text-danger">{{currentItem.title}}</strong>優惠卷(刪除後將無法恢復)。
                </div>
                 <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="this.$emit('close-del')">
                    取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="deleteCoupon">
                    確認刪除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['coupon'],
  data () {
    return {
      currentItem: {}
    }
  },
  inject: ['emitter'],
  methods: {
    deleteCoupon () {
      const id = this.currentItem.id
      this.$http.delete(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`)
        .then((res) => {
          this.$emit('get-coupons')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '刪除優惠券',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '刪除優惠券',
            content: err.response.data.message
          })
        })
    }
  },
  watch: {
    coupon (newvalue) {
      this.currentItem = JSON.parse(JSON.stringify(newvalue))
    }
  }
}
</script>
