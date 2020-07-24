export default {
    template: `
        <a href="#" id="cartBtn" class="btn btn-cart" @click.prevent="turnToCart">
            <i class="fas fa-shopping-cart" style="font-size: 1.75rem;"></i><span class="badge badge-danger">{{cartData.length}}</span>
        </a>
    `,
    props: {
        cartData: {}
    },
    methods: {
        turnToCart() {
            window.location = 'cart.html';
        }
    }
}