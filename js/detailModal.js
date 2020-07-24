export default {
    template: `
    <div class="modal fade" id="detailModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header badge-primary">
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">
                            <img :src="productDetail.imageUrl[0]" class="img-fluid" alt=""/>
                        </div>
                        <div class="col-6">
                            <h4 class="modal-title text-primary font-weight-bold">{{productDetail.title}}</h4>
                            <div class="mt-3">
                                <div class="mb-2">
                                    <h6 class="text-primary border-bottom border-primary">描述</h6>
                                    <p style="font-size:.75rem">{{ productDetail.content }}</p>
                                </div>
                                <div class="mb-2">
                                    <h6 class="text-primary border-bottom border-primary">其他說明</h6>
                                    <p style="font-size:.75rem">{{ productDetail.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="!productDetail.price || productDetail.price === productDetail.origin_price" class="h5 text-right text-primary font-weight-bold">NT$ {{ productDetail.origin_price }}</div>
                    <div v-else class="text-right">
                        <del class="h6 text-muted">NT$ {{ productDetail.origin_price }}</del>
                        <div class="h5 text-primary font-weight-bold">
                            NT$ {{ productDetail.price }}
                        </div>
                    </div>
                    <select v-model="productDetail.num" class="form-control my-3">
                        <option value="0" disabled selected>請選擇數量</option>
                        <option v-for="num in 10" :key="num" :value="num">選購 {{ num }} {{ productDetail.unit }}</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div v-show="productDetail.num" class="text-muted text-nowrap">
                        小計
                        <strong>{{ productDetail.num * productDetail.price }}</strong> 元
                    </div>
                    <button type="button" @click="addToCart(productDetail,productDetail.num)" class="btn btn-primary ml-auto" :disabled="productDetail.num===0">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loadingItem===productDetail.id"></span>
                        加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>
    `,
    props: {
        productDetail: {},
        loadingItem: ''
    },
    methods: {
        addToCart(item, num) {
            this.$emit('shopping', item, num);
        }
    }
}