<template>
  <v-container grid-list-md text-center>
    <v-layout v-if="numberCart === 0" wrap>
      <v-flex xs12 md12 lg12>
        <v-alert :value="true" color="warning" icon="priority_high" outline
        >Giỏ hàng không có sản phẩm.</v-alert
        >
      </v-flex>
      <v-flex xs12 md12 lg12 class="mt-2">
        <div>
          <span class="mr-1 headline">GIỎ HÀNG</span>
          <span>({{ numberCart }} sản phẩm)</span>
        </div>
      </v-flex>
      <v-flex xs12 md12 lg12>
        <v-layout align-center justify-center>
          <v-img
            src="https://lodo.vn/static/media/empty-cart.176175c7.svg"
            aspect-ratio="1"
            max-width="20%"
          ></v-img>
        </v-layout>
        <v-layout align-center justify-center class="mt-3">
          <span>Không có sản phẩm nào trong giỏ hàng của bạn.</span>
        </v-layout>
        <v-layout align-center justify-center class="mt-3">
          <v-btn outline color="warning" @click="backHome"
          >Tiếp tục mua sắm.</v-btn
          >
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout v-else wrap>
      <v-flex xs12 md12 lg12 class="mt-2">
        <div>
          <span class="mr-1 title font-weight-regular">GIỎ HÀNG</span>
          <span>({{ numberCart }} sản phẩm)</span>
        </div>
      </v-flex>
      <v-flex xs9>
        <v-card elevation="1">
          <v-layout v-for="(item, i) in products" :key="i" wrap align-center>
            <v-flex xs3 md3 lg3>
              <v-img
                style="margin-left:15px"
                :src="item.product_image"
                aspect-ratio="1"
                width="70%"
              ></v-img>
            </v-flex>
            <v-flex xs6 md6 lg6>
              <div class="mt-1">{{ item.product_name }}</div>
              <div class="mt-1">
                <span class="mr-1">Cung cấp bởi</span>
                <span class="teal--text">{{ item.store_name }}</span>
              </div>
              <div>
                <span class="mr-1">Số lượng:</span>
                <span class="red--text">{{ item.cart_product_quantity }}</span>
                <span class="mx-1">|</span>
                <v-btn flat small color="teal" @click="removeProduct(item)"
                >Xóa</v-btn
                >
              </div>
            </v-flex>
            <v-flex xs3 md3 lg3>
              <div>
                <span class="font-weight-medium"
                >{{ formatPrice(item.alter_price) }} đ</span
                >
              </div>
              <div>
                <span class="grey--text">
                  <del>{{ formatPrice(item.price) }}</del> đ
                </span>
                <span class="mx-1">|</span>
                <span>-{{ discount(item.alter_price, item.price) }} %</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <v-divider />
            </v-flex>
          </v-layout>

          <v-layout
            v-for="(detail, k) in productDetail"
            :key="k + 100"
            wrap
            align-center
          >
            <v-flex xs3 md3 lg3>
              <v-img
                style="margin-left:15px"
                :src="detail.pd_image"
                aspect-ratio="1"
                width="70%"
              ></v-img>
            </v-flex>
            <v-flex xs6 md6 lg6>
              <div class="ma-1">
                <span class="mr-1">{{ detail.product_name }}</span>
                <span
                  v-if="detail.size_name !== '' || detail.size_name !== null"
                >( {{ detail.size_name }} - {{ detail.color_name }})</span
                >
              </div>
              <div class="ma-1">
                <span class="mr-1">Cung cấp bởi</span>
                <span class="teal--text">{{ detail.store_name }}</span>
              </div>
              <div>
                <span class="mr-1">Số lượng:</span>
                <span class="red--text">{{ detail.product_quantity }}</span>
                <span class="mx-1">|</span>
                <v-btn
                  flat
                  small
                  color="teal"
                  @click="removeProductDetail(detail)"
                >Xóa</v-btn
                >
              </div>
            </v-flex>
            <v-flex xs3 md3 lg3>
              <div>
                <span class="font-weight-medium"
                >{{ formatPrice(detail.price) }} đ</span
                >
              </div>
              <div>
                <span class="grey--text">
                  <del>{{ formatPrice(detail.pd_price) }}</del> đ
                </span>
                <span class="mx-1">|</span>
                <span>-{{ discount(detail.price, detail.pd_price) }} %</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <v-divider />
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card class="mb-3">
          <v-layout wrap align-center justify-center class="ml-2">
            <v-flex class="my-3">
              <span class="font-weight-light">Thành tiền:</span>
            </v-flex>
            <v-flex class="my-3">
              <span class="title red--text font-weight-regular"
              >{{ formatPrice(sumPrice) }} đ</span
              >
            </v-flex>
          </v-layout>
        </v-card>

        <v-btn block color="error" @click="checkout">Tiến hàng đặt hàng</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style></style>

<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      listProduct: [],
      productDetail: [],
      response: '',
      numberProduct: '',
      numberCart: '',
      orderId: '',
      products: [],
      priceFinish: [],
      sumPrice: ''
    };
  },

  computed: {
    ...mapGetters('dashboard', ['me'])
  },

  watch: {
    // $route:{
    //   immediate: true,
    //   async handler($route){
    //   this.response = $route.params.user;
    //   console.log(this.response);
    //   }
    // }
  },
  created() {
    if (this.me === null) {
      this.$router.push({ path: '/' });
    }
    this.getNumberProduct();
  },

  methods: {
    ...mapActions('products', ['getInfoUserCart', 'countNumberProduct']),
    ...mapActions('cart', [
      'getProduct',
      'getProductDetail',
      'deleteProductFromCart'
    ]),

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async removeProduct(item) {
      const result = await this.deleteProductFromCart({
        orderItemId: item.order_item_id
      });
      this.$router.go(this.$router.currentRoute);
    },

    async removeProductDetail(item) {
      const result = await this.deleteProductFromCart({
        orderItemId: item.order_item_id
      });
      this.$router.go(this.$router.currentRoute);
    },

    discount(alter_price, price) {
      return 100 - parseFloat((alter_price / price).toFixed(2)) * 100;
    },

    async getNumberProduct() {
      if (this.me !== null) {
        let userId = this.me.user_id;
        const { data, success, message } = await this.getInfoUserCart({
          userId: userId
        });
        const result = await this.countNumberProduct({
          orderId: data.order_id
        });
        this.numberCart = result.data.count_product;
        this.orderId = data.order_id;

        const listProduct = await this.getListProduct(this.orderId);
        // console.log(listProduct);
        this.products = listProduct.products;

        _.forEach(this.products, item => {
          let argument = {};
          argument.quantity = item.cart_product_quantity;
          argument.price = item.alter_price;
          this.priceFinish.push(argument);
          const temp = item.product_image;
          if (temp != null) {
            let raw = window.atob(temp);
            let rawLength = raw.length;
            let array = new Uint8Array(new ArrayBuffer(rawLength));

            for (let i = 0; i < rawLength; i++) {
              array[i] = raw.charCodeAt(i);
            }
            // Make a Blob from the bytes
            let blob = new Blob([array], { type: 'image/png' });
            // Use createObjectURL to make a URL for the blob
            let image = new Image();
            image.src = URL.createObjectURL(blob);
            item.product_image = image.src;
          } else {
            item.product_image = '';
          }
        });

        const listProductDetail = await this.getCartProductDetail(this.orderId);
        // console.log(listProductDetail);

        if (listProductDetail.product_details !== null) {
          _.forEach(listProductDetail.products, item => {
            let element = {};
            element.product_id = item.product_id;
            element.product_name = item.product_name;
            element.pd_price = item.price;
            element.store_name = item.store_name;
            element.product_quantity = item.cart_product_quantity;
            element.order_item_id = item.order_item_id;
            this.listProduct.push(element);
          });
          // console.log(this.listProduct);
          this.productDetail = listProductDetail.product_details;
          // console.log(this.productDetail);

          for (let i = 0; i < this.productDetail.length; i++) {
            Object.assign(this.productDetail[i], this.listProduct[i]);
          }
          let sumFinishPrice = [];
          _.forEach(this.productDetail, item => {
            let argument = {};
            argument.quantity = item.product_quantity;
            argument.price = item.price;
            this.priceFinish.push(argument);
          });
          console.log(this.priceFinish);

          // console.log(this.productDetail);
          _.forEach(this.productDetail, item => {
            const temp = item.pd_image;
            if (temp != null) {
              let raw = window.atob(temp);
              let rawLength = raw.length;
              let array = new Uint8Array(new ArrayBuffer(rawLength));

              for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
              }
              // Make a Blob from the bytes
              let blob = new Blob([array], { type: 'image/png' });
              // Use createObjectURL to make a URL for the blob
              let image = new Image();
              image.src = URL.createObjectURL(blob);
              item.pd_image = image.src;
            } else {
              item.pd_image = '';
            }
          });
        }
        let sum = 0;
        _.forEach(this.priceFinish, item => {
          let price = parseInt(item.quantity) * parseInt(item.price);
          sum += parseInt(price);
        });
        this.sumPrice = sum;
      }
    },

    async checkout() {
      this.$router.push({ path: '/check-out' });
    },

    async getListProduct(id) {
      const { data, message, success } = await this.getProduct({
        orderId: id
      });
      return data;
    },

    async getCartProductDetail(id) {
      const { data, message, success } = await this.getProductDetail({
        orderId: id
      });
      return data;
    },

    backHome() {
      this.$router.push({ path: '/' });
    }
  }
};
</script>
