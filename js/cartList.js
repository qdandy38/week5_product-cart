export default {
    template: `
    <div>
        <div class="text-right mb-2"><a href="#" @click.prevent="clearCart" :class="{disabled:cartData.length===0}" class="btn btn-sm btn-outline-danger">清空購物車</a></div> 
        <table class="table text-center border-0 cart-table">
            <thead class="border-0">
                <tr>
                    <th scope="col" width="10%">刪除</th>
                    <th scope="col">商品名稱</th>
                    <th scope="col" width="15%">數量</th>
                    <th scope="col" width="15%">單位</th>
                    <th scope="col" width="20%">單價</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cartData" :key="item.product.id">
                    <td><a href="#" @click.prevent="delCart(item.product.id)" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></a></td>
                    <td>{{item.product.title}}</td>
                    <td>
                        <div class="input-group ">
                            <div class="input-group-prepend">
                                <button @click="updateCart(item.product.id,item.quantity-1)" :disabled="item.quantity === 1" class="btn btn-outline-secondary" type="button" id="button-addon1">&hyphen;</button>
                            </div>
                            <input type="number" class="form-control" v-model="item.quantity">
                            <div class="input-group-append">
                                <button @click="updateCart(item.product.id,item.quantity+1)" class="btn btn-outline-secondary" type="button" id="button-addon2">&plus;</button>
                            </div>
                        </div>
                    </td>
                    <td>{{item.product.unit}}</td>
                    <td>{{item.product.price}}</td>
                </tr>
                <tr v-if="cartData.length>0" class="h5 font-weight-bold text-primary">
                    <td colspan="4" class="text-right">總計</td>
                    <td>{{cartTotal}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    `,
    data() {
        return {}
    },
    props: {
        cartData: {},
        user: {},
        isLoading: false,
        cartTotal: 0
    },
    methods: {
        clearCart() {
            this.$emit('clear');
        },
        delCart(id) {
            this.$emit('del', id);
        },
        updateCart(id, num) {
            this.$emit('update', id, num);
        }
    }
}