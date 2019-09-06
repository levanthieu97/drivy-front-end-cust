<template>
  <v-container grid-list-md text-center>
    <v-layout wrap>
      <v-flex xs12 md12 lg12>
        <v-stepper v-model="orderStep" value="2">
          <v-stepper-header>
            <v-stepper-step complete step="1" color="#00695C"
            >Đăng Nhập</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="orderStep > 2" step="2" color="#00695C"
            >Địa Chỉ Giao Hàng</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="3" color="#00695C"
            >Thanh Toán & Đặt Mua</v-stepper-step
            >
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1"></v-stepper-content>

            <v-stepper-content step="2">
              <v-layout wrap justify-center align-center>
                <v-flex xs6 md6 lg6>
                  <v-form ref="form">
                    <v-text-field
                      ref="full_name"
                      v-model="address.full_name"
                      :rules="nameRules"
                      :error-messages="errorMessages"
                      prepend-icon="face"
                      label="Họ tên"
                      placeholder="Nhập họ tên"
                      required
                    ></v-text-field>

                    <v-text-field
                      ref="phone"
                      v-model="address.phone"
                      :rules="phoneRules"
                      prepend-icon="settings_phone"
                      label="Số điện thoại"
                      counter="10"
                      type="tel"
                      pattern="[0][1-9][0-9]{8}"
                      mask="## . ########"
                      required
                      v-on:keyup.13="subRegister"
                    />
                    <v-autocomplete
                      ref="city_id"
                      v-model="address.city_id"
                      prepend-icon="add_location"
                      :rules="cityRules"
                      label="Tỉnh/Thành phố"
                      :items="city"
                      item-text="city_name"
                      item-value="city_id"
                      placeholder="Chọn tỉnh/thành phố..."
                      required
                    ></v-autocomplete>
                    <v-text-field
                      ref="address"
                      v-model="address.address"
                      prepend-icon="perm_contact_calendar"
                      :rules="[() => !!address || 'Vui lòng nhập địa chỉ']"
                      label="Địa chỉ"
                      placeholder="Nhập địa chỉ chi tiết"
                      counter="50"
                      required
                    ></v-text-field>

                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-subheader>Loại địa chỉ:</v-subheader>
                      </v-flex>
                      <v-flex xs8>
                        <v-radio-group
                          ref="type_address"
                          v-model="address.type_address"
                          row
                          style="padding-top: 0px; margin-top: 10px"
                        >
                          <v-radio
                            label="Nhà riêng/ Chung cư"
                            value="Nhà riêng"
                          ></v-radio>
                          <v-radio label="Công ty" value="Công ty"></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                    <v-btn
                      class="text-none"
                      outline
                      dark
                      color="#00695C"
                      @click="doneStepTwo"
                    >Giao đến địa chỉ này</v-btn
                    >
                  </v-form>
                </v-flex>
              </v-layout>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-layout wrap justify-center align-center>
                <v-flex xs10 md10 lg10>
                  <div>
                    <v-icon color="red">local_shipping</v-icon>
                    <span
                      class="title ml-1 font-weight-regular"
                      style="color:red"
                    >Miễn Phí Giao Hàng</span
                    >
                  </div>
                </v-flex>
                <v-flex xs10 md10 lg10>
                  <div>
                    <v-icon color="#00695C">person_pin_circle</v-icon>
                    <span
                      class="title ml-1 font-weight-regular"
                      style="color:#00695C"
                    >Địa Chỉ Nhận Hàng</span
                    >
                  </div>
                  <div class="mt-2 ml-1">
                    <span class="font-weight-medium title mr-1">{{
                      me.fullname
                    }}</span>
                    <span class="font-weight-medium title mr-1"
                    >({{ address.phone }} )</span
                    >
                    <span class="mx-1">|</span>
                    <span class="mr-1 title font-weight-regular"
                    >{{ address.address }},</span
                    >
                    <span class="title font-weight-regular">{{ state }}</span>
                  </div>
                </v-flex>

                <v-flex xs10 md10 lg10 class="mt-1">
                  <!-- <v-card> -->
                  <div style="border: 1px solid #00695C">
                    <v-layout row wrap class="ma-2">
                      <v-flex xs6 md6 lg6>
                        <div
                          class="title font-weight-regular"
                          style="color:#00695C"
                        >
                          <span class="mr-1">
                            <v-icon color="#00695C">devices_other</v-icon>
                          </span>
                          <span>Sản phẩm</span>
                        </div>
                      </v-flex>
                      <v-flex xs2 md2 lg2>Đơn giá</v-flex>
                      <v-flex xs2 md2 lg2>Số lượng</v-flex>
                      <v-flex xs2 md2 lg2>Thành tiền</v-flex>
                    </v-layout>
                    <v-layout
                      v-for="(item, i) in products"
                      :key="i"
                      row
                      wrap
                      class="ma-2"
                    >
                      <v-flex xs6 md6 lg6>
                        <div class="font-weight-regular">
                          {{ item.product_name }}
                        </div>
                      </v-flex>
                      <v-flex xs2 md2 lg2>
                        {{ formatPrice(item.alter_price) }}
                        <ins class="ml-1">đ</ins>
                      </v-flex>
                      <v-flex xs2 md2 lg2>{{
                        item.cart_product_quantity
                      }}</v-flex>
                      <v-flex xs2 md2 lg2>
                        {{
                          formatPrice(
                            parseInt(item.alter_price) *
                              parseInt(item.cart_product_quantity)
                          )
                        }}
                        <ins class="ml-1">đ</ins>
                      </v-flex>
                    </v-layout>
                    <v-layout
                      v-for="(item, i) in productDetail"
                      :key="i + 100"
                      row
                      wrap
                      class="ma-2"
                    >
                      <v-flex xs6 md6 lg6>
                        <div class="font-weight-regular">
                          <span class="mr-4">{{ item.product_name }}</span>
                          <span
                            v-if="
                              item.size_name === null || item.size_name === ''
                            "
                          >(Màu: {{ item.color_name }})</span
                          >
                          <span v-else style="color:#78909C"
                          >(Size: {{ item.size_name }} - Màu:
                            {{ item.color_name }})</span
                          >
                        </div>
                      </v-flex>
                      <v-flex xs2 md2 lg2>
                        {{ formatPrice(item.price) }}
                        <ins class="ml-1">đ</ins>
                      </v-flex>
                      <v-flex xs2 md2 lg2>{{ item.product_quantity }}</v-flex>
                      <v-flex xs2 md2 lg2>
                        {{
                          formatPrice(
                            parseInt(item.price) *
                              parseInt(item.product_quantity)
                          )
                        }}
                        <ins class="ml-1">đ</ins>
                      </v-flex>
                    </v-layout>
                    <v-divider />
                    <v-layout row wrap class="ma-2">
                      <v-flex xs8 md8 lg8></v-flex>
                      <v-flex xs2 md2 lg2 style="color:#00695C">{{
                        sumQuantity
                      }}</v-flex>
                      <v-flex xs2 md2 lg2 class="title red--text">
                        {{ formatPrice(sumPrice) }}
                        <ins class="ml-1">đ</ins>
                      </v-flex>
                    </v-layout>
                  </div>
                  <!-- </v-card> -->
                </v-flex>
                <v-flex xs10 md10 lg10 class="my-2">
                  <div>
                    <v-layout wrap row>
                      <v-flex xs4 md4 lg4>
                        <v-icon color="#00695C">local_atm</v-icon>
                        <span
                          class="title ml-1 font-weight-regular"
                          style="color:#00695C"
                        >Phương Thức Thanh Toán</span
                        >
                      </v-flex>
                      <v-flex x8 md8 lg8>
                        <v-radio-group
                          v-model="typePayment"
                          row
                          class="mt-0 pt-1"
                          :mandatory="false"
                        >
                          <v-radio
                            label="Thanh toán khi nhận hàng"
                            value="Thanh toán khi nhận hàng"
                          ></v-radio>
                          <v-radio
                            label="Thẻ ATM/ quốc tế Visa,Master"
                            value="Thẻ ATM/ quốc tế Visa,Master"
                            disabled
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
                <v-flex xs10 md10 lg10>
                  <v-btn color="#00695C" outline class="ml-0" @click="prevPage"
                  >Địa Chỉ Giao Hàng</v-btn
                  >
                  <v-btn color="#D50000" dark @click="payShoppingCart"
                  >Thanh Toán</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
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
      orderStep: 2,
      response: '',
      errorMessages: '',
      typePayment: 'Thanh toán khi nhận hàng',
      address: {
        full_name: '',
        phone: '',
        type_address: '',
        address: '',
        city_id: '',
        user_id: '',
        order_id: ''
      },
      products: '',
      city: [],
      priceFinish: [],
      listQuantityProduct: [],
      listQuantityProductDetail: [],
      payment_supplier: [],
      sumPrice: '',
      sumQuantity: '',
      listProduct: [],
      listProductDetail: '',
      productDetail: [],
      priceFinish: [],
      nameRules: [v => !!v || 'Vui lòng nhập họ và tên'],
      phoneRules: [v => !!v || 'Vui lòng nhập số điện thoại'],
      cityRules: [v => !!v || 'Vui lòng nhập chọn thành phố']
    };
  },
  computed: {
    ...mapGetters('dashboard', ['me']),
    ...mapGetters('products', ['thisOrderId']),

    state() {
      let result = '';
      _.forEach(this.city, item => {
        if (item.city_id === this.address.city_id) {
          result = item.city_name;
        }
      });
      return result;
    }
  },
  created() {
    if (this.me === null) {
      this.$router.push({ path: '/' });
    }
    console.log(this.thisOrderId);
    this.address.full_name = this.me.fullname;
    this.address.phone = this.me.phone;
    this.getListCity();
    this.getNumberProduct();
  },

  methods: {
    ...mapActions('checkOut', [
      'insertAddress',
      'getCity',
      'updateOrderUser',
      'renewOrders',
      'updateProduct',
      'updateProductDetail',
      'addPaymentSuppliers'
    ]),
    ...mapActions('global', ['showErrorMsg']),
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

    doneStepTwo() {
      if (!this.address.full_name) {
        this.$refs.full_name.focus();
      } else if (!this.address.phone) {
        this.$refs.phone.focus();
      } else if (!this.address.city_id) {
        this.$refs.city.focus();
      } else if (!this.address.address) {
        this.$refs.address.focus();
      } else if (!this.address.type_address) {
        this.showErrorMsg('Vui lòng chọn loại địa chỉ !');
      } else {
        this.orderStep++;
      }
    },

    prevPage() {
      this.orderStep = this.orderStep - 1;
    },

    async getListCity() {
      const { data, success, message } = await this.getCity();
      this.city = data;
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
        this.orderId = data.order_id;
        const listProduct = await this.getListProduct(this.orderId);
        this.products = listProduct.products;
        _.forEach(this.products, item => {
          let argument = {};
          argument.quantity = item.cart_product_quantity;
          argument.price = item.alter_price;
          this.priceFinish.push(argument);
        });

        const listProductDetail = await this.getCartProductDetail(this.orderId);
        if (
          this.products === null &&
          listProductDetail.product_details === null
        ) {
          this.$router.push({ path: '/' });
        } else {
          console.log(this.products);
          _.forEach(this.products, product => {
            this.payment_supplier.push(product.supplier_profile_id);
          });
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
              element.supplier_profile_id = item.supplier_profile_id;
              this.payment_supplier.push(item.supplier_profile_id);
              this.listProduct.push(element);
            });
            this.payment_supplier = [...new Set(this.payment_supplier)];
            console.log(this.payment_supplier);

            this.productDetail = listProductDetail.product_details;
            // console.log(this.productDetail);

            _.forEach(this.products, item => {
              let element = {};
              element.product_id = item.product_id;
              element.product_quantity =
                item.product_quantity - item.cart_product_quantity;

              this.listQuantityProduct.push(element);
            });
            for (let i = 0; i < this.productDetail.length; i++) {
              Object.assign(this.productDetail[i], this.listProduct[i]);
            }
            _.forEach(this.productDetail, item => {
              let element = {};
              element.product_detail_id = item.product_detail_id;
              element.quantity = item.quantity - item.product_quantity;
              this.listQuantityProductDetail.push(element);
              let argument = {};
              argument.quantity = item.product_quantity;
              argument.price = item.price;
              this.priceFinish.push(argument);
            });
            // console.log(this.listQuantityProduct);
            // console.log(this.listQuantityProductDetail);
          }
          let sum = 0;
          let sumQuantityProduct = 0;
          _.forEach(this.priceFinish, item => {
            sumQuantityProduct += parseInt(item.quantity);
            let price = parseInt(item.quantity) * parseInt(item.price);
            sum += parseInt(price);
          });
          this.sumPrice = sum;
          this.sumQuantity = sumQuantityProduct;
        }
      }
    },

    async payShoppingCart() {
      this.updateOrder();
      this.renewOrderForUser();
      this.address.type_payment = this.typePayment;
      this.address.total_display = this.sumPrice;
      this.address.user_id = this.me.user_id;
      this.address.order_id = this.thisOrderId;
      this.address.supplier_profile_id = this.payment_supplier;
      const { data, success, message } = await this.insertAddress({
        addressAndPayment: this.address
      });

      console.log(this.products);
      const quantityProduct = await this.updateProduct({
        products: this.listQuantityProduct
      });

      const quantityProductDetail = await this.updateProductDetail({
        productDetails: this.listQuantityProductDetail
      });

      this.$router.push({ path: '/confirm-order' });
    },

    async renewOrderForUser() {
      const { data, message, success } = await this.renewOrders({
        userId: this.me.user_id
      });
    },

    async updateOrder() {
      const { data, message, success } = await this.updateOrderUser({
        orderId: this.thisOrderId
      });
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
    }
  }
};
</script>
