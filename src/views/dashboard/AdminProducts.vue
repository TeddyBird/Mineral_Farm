<template>
    <Loading v-if="isLoading"/>
    <div class="container">
        <div class="text-end mt-4">
          <button type="button" class="btn btn-primary" @click ="toggleProductModal('create')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in products" :key = "item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.origin_price }}</td>
              <td>{{ item.price }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" @click="toggleProductModal('update'); clickUpdate(item)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="toggleDelMoadal(item, 'delete')">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination :pages="paginationInfo" @get-page="getData"/>
    </div>
    <ProductModal :current-product="currentProduct" :action="action" @get-data="getData" @close-modal="toggleProductModal('close')"/>
    <DelModal :current-product="currentProduct" :action="action" @get-data="getData" @close-del="toggleDelMoadal('', 'close')"/>
</template>

<script>
import { Modal } from 'bootstrap'
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import pagination from '@/components/Pagination.vue'
import Loading from '@/components/LoadingView.vue'

export default {
  data () {
    return {
      isLoading: false,
      delModal: '',
      productModal: '',
      products: [],
      action: '',
      currentProduct: {
        imagesUrl: []
      },
      paginationInfo: ''
    }
  },
  components: {
    ProductModal,
    DelModal,
    pagination,
    Loading
  },
  methods: {
    getData (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.products = res.data.products
          this.paginationInfo = res.data.pagination
          this.productModal.hide()
          this.delModal.hide()
        })
    },
    toggleProductModal (action) {
      if (action === 'create') {
        this.currentProduct = {}
        this.action = 'create'
        this.productModal.show()
      } else if (action === 'update') {
        this.action = 'update'
        this.productModal.show()
      } else {
        this.currentProduct = {}
        this.action = ''
        this.productModal.hide()
      }
    },
    toggleDelMoadal (item, action) {
      if (action === 'delete') {
        this.currentProduct = JSON.parse(JSON.stringify(item))
        this.delModal.show()
      } else {
        this.currentProduct = {}
        this.delModal.hide()
      }
    },
    clickUpdate (item) {
      this.currentProduct = JSON.parse(JSON.stringify(item))
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    this.productModal = new Modal(document.querySelector('#productModal'))
    this.delModal = new Modal(document.querySelector('#delProductModal'))
    this.getData()
  }
}
</script>
