<template>
    <Loading v-if="isLoading"/>
    <div class="container">
        <div class="text-end mt-4">
            <button class="btn btn-primary" type="button" @click="openCouponModal('create')">
            建立新的優惠券
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="coupon in coupons" :key="coupon.code">
                    <td>{{ coupon.title }}</td>
                    <td>{{ coupon.percent }}%</td>
                    <td>{{ new Date(coupon.due_date*1000).toLocaleDateString() }}</td>
                    <td>
                        <span v-if="coupon.is_enabled" class="text-success">啟用</span>
                        <span v-else class="text-muted">未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btn-outline-primary btn-sm"
                            @click="openCouponModal('update', coupon)"
                            >編輯</button>
                            <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="openDelCoupon(coupon)"
                            >刪除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
         <pagination :pages="paginationInfo" @get-page="getCoupons"/>
    </div>
    <CouponModal :coupon="tempCoupon" :action="action" @close-coupon="closeCouponModal" @get-coupons="getCoupons"/>
    <DelCouponModal :coupon="tempCoupon" @close-del="closeDelCoupon" @get-coupons="getCoupons"/>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelCouponModal from '@/components/DelCoupon.vue'
import { Modal } from 'bootstrap'
import Loading from '@/components/LoadingView.vue'

export default {
  data () {
    return {
      isLoading: false,
      couponModal: '',
      delCouponModal: '',
      paginationInfo: '',
      coupons: [],
      action: '',
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false
    }
  },
  components: {
    CouponModal,
    DelCouponModal,
    Loading
  },
  methods: {
    openCouponModal (action, coupon) {
      this.couponModal.show()
      if (action === 'create') {
        this.action = 'create'
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
      } else {
        this.tempCoupon = JSON.parse(JSON.stringify(coupon))
        this.action = 'update'
      }
    },
    closeCouponModal () {
      this.couponModal.hide()
    },
    openDelCoupon (coupon) {
      this.delCouponModal.show()
      this.tempCoupon = JSON.parse(JSON.stringify(coupon))
    },
    closeDelCoupon () {
      this.delCouponModal.hide()
    },
    getCoupons (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.coupons = res.data.coupons
          this.paginationInfo = res.data.pagination
          this.closeCouponModal()
          this.closeDelCoupon()
        })
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    this.couponModal = new Modal(document.querySelector('#couponModal'))
    this.delCouponModal = new Modal(document.querySelector('#delCouponModal'))
    this.getCoupons()
  }
}
</script>
