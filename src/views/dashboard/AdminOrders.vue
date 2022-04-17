<template>
    <Loading v-if="isLoading"/>
    <div class="container">
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>購買時間</th>
                    <th>Email</th>
                    <th>購買款項</th>
                    <th>應付金額</th>
                    <th>是否付款</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(order, key) in orders" :key="key">
                    <tr v-if="orders.length" :class="{ 'text-secondary': !order.is_paid }">
                        <td>{{new Date(order.create_at*1000).toLocaleDateString()}}</td>
                        <td><span v-if="order.user">{{order.user.email}}</span></td>
                        <td>
                            <ul class="list-unstyled">
                            <li v-for="(product, i) in order.products" :key="i">
                                {{ product.product.title }} 數量：{{ product.qty }}
                                {{ product.product.unit }}
                            </li>
                            </ul>
                        </td>
                        <td class="text-right">{{ order.total }}</td>
                        <td>
                            <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                :id="`paidSwitch${order.id}`"
                                v-model="order.is_paid"
                                @change="updatePaid(order)"
                            />
                            <label class="form-check-label" :for="`paidSwitch${order.id}`">
                                <span v-if="order.is_paid">已付款</span>
                                <span v-else>未付款</span>
                            </label>
                            </div>
                        </td>
                        <td>
                            <div class="btn-group">
                            <button
                                class="btn btn-outline-primary btn-sm"
                                type="button" @click="openOrderModal(order)">
                                檢視
                            </button>
                            <button
                                class="btn btn-outline-danger btn-sm"
                                type="button"
                                @click="openDelOrderModal(order)">
                                刪除
                            </button>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <OrderModal :order="tempOrder" @close-modal="closeOrderModal" @update-paid="updatePaid"/>
        <DelOrderModal :order="tempOrder" @close-del="closeDelOrderModal" @get-orders="getOrders(); closeDelOrderModal()"/>
        <pagination :pages="paginationInfo" @get-page="getOrders"/>
    </div>
</template>

<script>
import pagination from '@/components/Pagination.vue'
import OrderModal from '@/components/OrderModal.vue'
import DelOrderModal from '@/components/DelOrder.vue'
import Loading from '@/components/LoadingView.vue'
import { Modal } from 'bootstrap'

export default {
  data () {
    return {
      isLoading: false,
      orderModal: '',
      delOrderModal: '',
      orders: [],
      paginationInfo: '',
      tempOrder: {}
    }
  },
  components: {
    pagination,
    OrderModal,
    DelOrderModal,
    Loading
  },
  inject: ['emitter'],
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.orders = res.data.orders
          this.paginationInfo = res.data.pagination
        })
    },
    openOrderModal (order) {
      this.orderModal.show()
      this.tempOrder = JSON.parse(JSON.stringify(order))
    },
    closeOrderModal () {
      this.orderModal.hide()
    },
    openDelOrderModal (order) {
      this.delorderModal.show()
      this.tempOrder = JSON.parse(JSON.stringify(order))
    },
    closeDelOrderModal () {
      this.delorderModal.hide()
    },
    updatePaid (item) {
      const paid = { is_paid: item.is_paid }
      this.isLoading = true
      this.$http.put(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`, { data: paid })
        .then((res) => {
          this.isLoading = false
          this.getOrders()
          this.closeOrderModal()
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '更新付款狀態',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '更新付款狀態',
            content: err.response.data.message
          })
        })
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    this.orderModal = new Modal(document.querySelector('#orderModal'))
    this.delorderModal = new Modal(document.querySelector('#delOrderModal'))
    this.getOrders()
  }
}
</script>
