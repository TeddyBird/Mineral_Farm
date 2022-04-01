<template>
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span v-if="action === 'create'">新增優惠卷</span>
                    <span v-if="action === 'update'">編輯優惠卷</span>
                     </h5>
                    <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Close" @click="this.$emit('close-coupon')"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="title">標題</label>
                         <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題" v-model="currentItem.title">
                    </div>
                    <div class="mb-3">
                        <label for="coupon_code">優惠碼</label>
                        <input type="text" class="form-control" id="coupon_code"
                        placeholder="請輸入優惠碼" v-model="currentItem.code">
                    </div>
                    <div class="mb-3">
                        <label for="due_date">到期日</label>
                        <input type="date" class="form-control" id="due_date" v-model="date">
                    </div>
                    <div class="mb-3">
                        <label for="price">折扣百分比</label>
                        <input type="number" class="form-control" id="price" min="0"
                         placeholder="請輸入折扣百分比" v-model.number="currentItem.percent">
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            id="is_enabled"
                            v-model="currentItem.is_enabled">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="this.$emit('close-coupon')">Close</button>
                    <button type="button" class="btn btn-primary" @click="action==='create'?createCoupon():updateCoupon(currentItem.id)">{{action==='create'?'新增優惠卷':'編輯優惠卷'}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['coupon', 'action'],
  data () {
    return {
      currentItem: {},
      date: ''
    }
  },
  inject: ['emitter'],
  methods: {
    createCoupon () {
      const data = { ...this.currentItem }
      this.$http.post(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/coupon`, { data })
        .then((res) => {
          this.$emit('get-coupons')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '新增優惠券',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.$emit('close-coupon')
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '新增優惠券',
            content: err.response.data.message
          })
        })
    },
    updateCoupon (id) {
      const data = { ...this.currentItem }
      this.$http.put(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`, { data })
        .then((res) => {
          this.$emit('get-coupons')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '編輯優惠券',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '編輯優惠券',
            content: err.response.data.message
          })
        })
    }
  },
  watch: {
    coupon (newvalue) {
      this.currentItem = JSON.parse(JSON.stringify(newvalue))
      this.date = new Date(newvalue.due_date * 1000).toISOString().slice(0, 10)
    },
    date () {
      this.currentItem.due_date = Math.floor(new Date(this.date) / 1000)
    }
  }
}
</script>
