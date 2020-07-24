import productList from './productList.js';
import detailModal from './detailModal.js';
import cartBtn from './cartBtn.js';
import cartList from './cartList.js';
import formCheck from './formCheck.js';
import zh_TW from './zh_TW.js'; // 匯入語系檔案

// 外部載入元件
Vue.component('loading', VueLoading); // 註冊全域元件
Vue.component('ValidationProvider', VeeValidate.ValidationProvider); // input驗證元件
Vue.component('ValidationObserver', VeeValidate.ValidationObserver); // 完整表單驗證元件
// 自定義元件
Vue.component('productList', productList); // 產品列表元件
Vue.component('detailModal', detailModal); // 產品細節元件
Vue.component('cartBtn', cartBtn); // 購物車按鈕元件
Vue.component('cartList', cartList); // 購物車清單元件
Vue.component('formCheck', formCheck); //表單驗證元件

// 表單驗證，Class 設定檔案
VeeValidate.configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
    }
});
// 將語系檔案加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);

new Vue({
    el: '#app',
    data: {
        user: {
            uuid: '822f665f-fdb8-48cd-a3c7-a13100ae246a',
            path: 'https://course-ec-api.hexschool.io'
        },
        form: {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: ''
        },
        isLoading: false,
        loadingItem: '',
        products: [], // AJAX取得的所有產品資料
        cart: [], // AJAX取得的購物車資料
        cartTotal: 0, // 購物車內總金額
        singleProduct: {
            imageUrl: [],
        } // 單一產品資料 -> "查看更多"時觸發
    },
    methods: {
        getProducts() {
            const vm = this;
            const url = `${vm.user.path}/api/${vm.user.uuid}/ec/products`;
            vm.isLoading = true;
            axios.get(url)
                .then(res => {
                    vm.products = res.data.data;
                    vm.isLoading = false;
                })
                .catch(err => {
                    console.log(err);
                    vm.isLoading = false;
                })
        },
        getCart() {
            const vm = this;
            const url = `${vm.user.path}/api/${vm.user.uuid}/ec/shopping`;
            vm.isLoading = true;
            axios.get(url)
                .then(res => {
                    vm.cart = res.data.data;
                    vm.cartTotal = 0; // 每次取得新的購物車資訊後，先將總金額歸零重新計算
                    vm.cart.forEach(item => {
                        vm.cartTotal += (item.quantity * item.product.price);
                    })
                    vm.isLoading = false;
                })
                .catch(err => {
                    console.log(err);
                    vm.isLoading = false;
                })
        },
        getDetail(id) {
            const vm = this;
            const url = `${vm.user.path}/api/${vm.user.uuid}/ec/product/${id}`;
            vm.loadingItem = id;
            axios.get(url)
                .then(res => {
                    vm.loadingItem = '';
                    vm.singleProduct = res.data.data;
                    vm.$set(vm.singleProduct, 'num', 0); // 因為傳回來的obj中沒有num欄位，在select的欄位中無法顯示預設值，故加入這行
                    console.log(vm.singleProduct);
                    $('#detailModal').modal('show');
                })
                .catch(err => {
                    vm.loadingItem = '';
                    console.log(err);
                })
        },
        addToCart(item, num = 1) {
            // POST api/{uuid}/ec/shopping
            const vm = this;
            const url = `${vm.user.path}/api/${vm.user.uuid}/ec/shopping`;
            const tempCart = {
                product: item.id,
                quantity: num
            }
            vm.loadingItem = item.id;
            axios.post(url, tempCart)
                .then(() => {
                    console.log('新增成功');
                    vm.loadingItem = '';
                    vm.getCart();
                    $('#detailModal').modal('hide');
                    Swal.fire({
                        toast: true,
                        title: '商品成功加入購物車!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        padding: '2rem'
                    })
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.status === 422) {
                        Swal.fire({
                            toast: true,
                            title: '該商品已在購物車中!',
                            icon: 'warning',
                            showConfirmButton: false,
                            timer: 1500,
                            padding: '2rem'
                        })
                    }
                    vm.loadingItem = '';
                    $('#detailModal').modal('hide');

                })
        },
        clearCart() {
            const vm = this;
            const url = `${vm.user.path}/api/${vm.user.uuid}/ec/shopping/all/product`;
            vm.isLoading = true;
            axios.delete(url)
                .then(() => {
                    // vm.isLoading = false;
                    vm.getCart();
                })
                .catch(err => {
                    console.log(err);
                    vm.isLoading = false;
                })
        },
        delCart(id) {
            const vm = this;
            const url = `${vm.user.path}/api/${vm.user.uuid}/ec/shopping/${id}`;
            vm.isLoading = true;
            axios.delete(url)
                .then(() => {
                    vm.getCart();
                    // vm.isLoading = false;
                })
                .catch(err => {
                    console.log(err);
                    vm.isLoading = false;
                })
        },
        updateCart(id, num) {
            const vm = this;
            const url = `${vm.user.path}/api/${vm.user.uuid}/ec/shopping`;
            const tempData = {
                product: id,
                quantity: num
            };
            vm.isLoading = true;
            axios.patch(url, tempData)
                .then(() => {
                    vm.getCart();
                    // vm.isLoading = false;
                })
                .catch(err => {
                    console.log(err);
                    vm.isLoading = false;
                })
        }
    },
    created() {
        this.getProducts();
        this.getCart();
    }
})