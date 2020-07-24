export default {
    template: `
    <div class="row list">
        <div class="col-md-4 mb-3" v-for="item in products" :key="item.id">
            <div class="card h-100 box-shadow">
                <div class="card-header p-0 bg-cover" style="height:200px" :style="{backgroundImage:'url('+item.imageUrl[0]+')'}">
                </div>
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="card-title text-primary font-weight-bold mb-0">{{ item.title }}</h5>
                        <span class="badge badge-secondary mb-0">{{ item.category }}</span>
                    </div>
                    <p class="card-text text-secondary font-weight-bold" style="font-size:.75rem; text-overflow:ellipsis;">
                        {{ item.content }}
                    </p>
                    <div v-if="!item.price || item.price === item.origin_price" class="h5 text-right text-primary font-weight-bold">NT$ {{ item.origin_price }}</div>
                    <div v-else class="d-flex justify-content-between align-items-baseline">
                        <del class="h6 text-muted">NT$ {{ item.origin_price }}</del>
                        <div class="h5 text-primary font-weight-bold">
                            NT$ {{ item.price }}
                        </div>
                    </div>
                </div>
                <div class="card-footer px-2 py-3 bg-second d-flex">
                    <a href="#" class="btn  btn-info" @click.prevent="checkDetail(item.id)">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loadingItem===item.id"></span>
                        查看更多
                    </a>
                    <a href="#" class="btn  btn-primary ml-auto" @click.prevent="addToCart(item)">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loadingItem===item.id"></span>
                        加入購物車
                    </a>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {}
    },
    props: {
        products: {},
        loadingItem: ''
    },
    methods: {
        checkDetail(id) {
            this.$emit('detail', id);
        },
        addToCart(item, num = 1) {
            this.$emit('shopping', item, num);
        }
    }
}