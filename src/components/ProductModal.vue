<template>
    <Loading v-if="isLoading"></Loading>
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span>新增產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="this.$emit('close-modal')"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">主要圖片</label>
                      <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="currentItem.imageUrl">
                    </div>
                    <img class="img-fluid" :src="currentItem.imageUrl" alt="">
                  </div>
                  <h5>多圖新增</h5>
                  <div class="mb-2" v-for="(image, index) in currentItem.imagesUrl" :key="index+1">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">圖片網址</label>
                      <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="currentItem.imagesUrl[index]">
                    </div>
                    <img class="img-fluid" :src="image" alt="">
                  </div>
                  <div>
                    <button class="btn btn-outline-primary btn-sm d-block w-100 mb-3" @click="addImage"
                    v-if="currentItem.imagesUrl === undefined || currentItem.imagesUrl[currentItem.imagesUrl.length - 1] || currentItem.imagesUrl.length === 0">
                      新增圖片
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="removeImage"
                    v-if="currentItem.imagesUrl !== undefined && currentItem.imagesUrl.length !== 0">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="currentItem.title">
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="currentItem.category">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="currentItem.unit">
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="currentItem.origin_price">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="currentItem.price">
                    </div>
                  </div>
                  <hr>

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" type="text" class="form-control"
                    placeholder="請輸入產品描述" v-model="currentItem.description">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" type="text" class="form-control"
                    placeholder="請輸入說明內容" v-model="currentItem.content">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">標籤</label>
                    <textarea id="description" type="text" class="form-control"
                    placeholder="請輸入標籤" v-model="currentItem.tag">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input id="is_enabled" class="form-check-input" type="checkbox"
                      :true-value="1" :false-value="0" v-model.number="currentItem.is_enabled">
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="this.$emit('close-modal')">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="action==='create'?createProduct():updateProduct()">
                確認
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/LoadingView.vue'

export default {
  props: ['currentProduct', 'action'],
  data () {
    return {
      isLoading: false,
      currentItem: {}
    }
  },
  components: {
    Loading
  },
  inject: ['emitter'],
  emits: ['get-data', 'close-modal'],
  methods: {
    createProduct () {
      const data = { data: this.currentItem }
      this.$http.post(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product`, data)
        .then((res) => {
          this.$emit('get-data')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '新增商品',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.$emit('close-modal')
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '新增商品',
            content: err.response.data.message
          })
        })
    },
    updateProduct () {
      const data = { data: this.currentItem }
      const id = this.currentItem.id
      this.$http.put(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product/${id}`, data)
        .then((res) => {
          this.$emit('get-data')
          this.emitter.emit('push-toast', {
            style: 'success',
            title: '更新商品',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.$emit('close-modal')
          this.emitter.emit('push-toast', {
            style: 'danger',
            title: '更新商品',
            content: err.response.data.message
          })
        })
    },
    addImage () {
      if (this.currentItem.imagesUrl === undefined) {
        this.currentItem.imagesUrl = []
        this.currentItem.imagesUrl.push('')
      } else {
        this.currentItem.imagesUrl.push('')
      }
    },
    removeImage () {
      this.currentItem.imagesUrl.pop()
    }
  },
  watch: {
    currentProduct (newvalue) {
      this.currentItem = JSON.parse(JSON.stringify(newvalue))
    }
  }
}
</script>
