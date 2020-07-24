export default {
    template: `
    <div class="row justify-content-center my-5">
        <validation-observer v-slot="{ invalid }" class="col-md-6">
            <form @submit.prevent="createOrder">
                <div class="form-group">
                    <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                        <label for="name">收件人姓名</label>
                        <input id="name" type="text" name="姓名" v-model="form.name" class="form-control" :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
                <div class="form-group">
                    <validation-provider rules="required|email" v-slot="{ errors, classes, passed }">
                        <label for="email">Email</label>
                        <input id="email" type="email" name="email" v-model="form.email" class="form-control" :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
                <div class="form-group">
                    <validation-provider rules="required|min:8" v-slot="{ errors, classes, passed }">
                        <label for="tel">電話</label>
                        <input id="tel" type="text" name="電話" v-model="form.tel" class="form-control" :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
                <div class="form-group">
                    <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                        <label for="address">地址</label>
                        <input id="address" type="text" name="地址" v-model="form.address" class="form-control" :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
                <div class="form-group">
                    <label for="payWay">購買方式</label>
                    <select v-model="form.payment" class="form-control" required>
                        <option value="" disabled>
                            請選擇付款方式
                        </option>
                        <option value="WebATM">
                            WebATM
                        </option>
                        <option value="ATM">
                            ATM
                        </option>
                        <option value="CVS">
                            CVS
                        </option>
                        <option value="Barcode">
                            Barcode
                        </option>
                        <option value="Credit">
                            Credit
                        </option>
                        <option value="ApplePay">
                            ApplePay
                        </option>
                        <option value="GooglePay">
                            GooglePay
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">留言</label>
                    <textarea id="message" v-model="form.message" class="form-control" cols="30" rows="3"></textarea>
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary" :disabled="invalid">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="formLoading===true"></span>
                        送出表單
                    </button>
                </div>
            </form>
        </validation-observer>
    </div>
    `,
    props: {
        form: {},
        user: {}
    },
    data() {
        return {
            formLoading: false
        }
    },
    methods: {
        createOrder() {
            const vm = this;
            const url = `${vm.user.path}/api/${vm.user.uuid}/ec/orders`;
            vm.formLoading = true;
            axios.post(url, vm.form)
                .then(() => {
                    vm.formLoading = false;
                    Swal.fire({
                        toast: true,
                        title: '已建立訂單',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                        padding: '2rem'
                    })
                    this.$emit('order');

                })
                .catch(err => {
                    console.log(err);
                    vm.formLoading = false;
                    Swal.fire({
                        toast: true,
                        title: '訂單建立失敗',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000,
                        padding: '2rem'
                    })
                })
        }
    }
}