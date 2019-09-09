<template>
  <div style="background-color:white;">
    <v-container grid-list-sm style="padding-top:5px;">
      <v-layout row wrap>
        <v-flex xs12>
          <v-breadcrumbs
            :items="crums"
            style="background-color:#E0F2F1"
            class="breadcrumb"
          >
            <template v-slot:divider>
              <v-icon>chevron_right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="margin-top:10px">
        <v-flex xs2 md1>
          <div id="listImg">
            <div
              v-for="(image, i) in convert"
              :key="i"
              class="pa-1"
              style="cursor:pointer; border:1px solid #E0F2F1; margin-top:3px"
              @click="choseImage(image)"
            >
              <v-img :src="image" aspect-ratio="1" width="80px"></v-img>
            </div>
          </div>
        </v-flex>
        <v-flex xs4 md3>
          <div>
            <v-img :src="currImage" aspect-ratio="1" />
          </div>
        </v-flex>
        <v-flex xs6 md6 class="pl-2">
          <div>
            <p class="headline mb-0" style="color:#004D40">{{ nameProduct }}</p>
          </div>
          <v-layout row wrap>
            <v-flex xs6 md12>
              <div>
                <span style="color:#616161;margin:0px" class="pt-1x"
                >Thương hiệu: {{ brand }}</span
                >
                <span class="ml-5" />
                <span style="color:#616161;" class="pt-1x"
                >Mã sản phẩm: {{ skuProduct }}</span
                >
              </div>
            </v-flex>
          </v-layout>
          <v-divider />
          <v-layout row wrap>
            <v-flex xs12 md12>
              <div>
                <span style="color:#D50000" class="headline">
                  {{ formatPrice(price) }}
                </span>
                <span style="color:#D50000" class="title">đ</span>
              </div>
              <div>
                <span style="color:#616161;" class="mr-1">Tiết kiệm:</span>
                <span style="color:#D50000" class="mr-1">{{ percent }}%</span>
                <span style="color:#616161">({{ formatPrice(sale) }}đ)</span>
              </div>
              <div>
                <span style="color:#616161;" class="mr-1">Giá thị trường:</span>
                <span style="color:#616161;">{{ formatPrice(cost) }}đ</span>
              </div>
              <div class="mt-2">
                <ul style="list-style-type:none" class="pl-0">
                  <li v-for="i in mainProduct.product_description" :key="i">
                    <p class="mb-1">{{ i }}</p>
                  </li>
                </ul>
              </div>
            </v-flex>
            <v-flex md12 xs12 class="mt-1">
              <v-layout row>
                <v-flex xs3 md3 class="pt-2">
                  <number-input
                    v-model="product_quantity"
                    :min="1"
                    :max="50"
                    inline
                    controls
                    style="width:120px"
                  ></number-input>
                </v-flex>
                <v-flex xs5 md5>
                  <div>
                    <v-btn
                      class="white--text"
                      color="#DD2C00"
                      :disabled="btnBuy"
                      @click="addProduct"
                    >
                      Chọn mua
                      <v-icon right dark>add_shopping_cart</v-icon>
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <div v-if="currQuantity > 0">
                <span class="mr-1">Cửa hàng còn</span>
                <span class="mr-1 red--text">{{ this.currQuantity }}</span>
                <span>sản phẩm</span>
              </div>
              <div v-else>
                <span class="red--text">Hiện tại sản phẩm đang hết hàng !</span>
              </div>
            </v-flex>
          </v-layout>

          <v-layout v-if="this.sizesProduct.length > 0" row wrap>
            <v-flex xs12 md12>
              <v-divider />
            </v-flex>
            <v-flex xs6 md12 d-flex>
              <div>
                <span style="color:#BDBDBD;margin:0px" class="pt-3"
                >Chọn Size:</span
                >

                <span
                  style="margin:0px"
                  class="pt-3 subtitle-1 font-weight-medium"
                >{{ size }}</span
                >
              </div>
            </v-flex>
            <!-- <v-flex md9></v-flex> -->
            <v-flex v-for="(item, i) in colorAndSize" :key="i" xs5 md2>
              <v-btn
                small
                :color="activeItem === item ? 'primary' : 'default'"
                @click="choseSize(item)"
              >
                <!-- <v-btn small :class="{'active' : activeItem === item}" @click="choseSize(item)"> -->
                <span>{{ item.size_name }}</span>
              </v-btn>
            </v-flex>

            <v-flex xs12 md12>
              <v-layout v-if="dependColor.length > 0" row wrap>
                <v-flex xs12 d-flex>
                  <div>
                    <span style="color:#BDBDBD;margin:0px" class="pt-3"
                    >Chọn Màu:</span
                    >
                    <span
                      style="margin:0px"
                      class="pt-3 subtitle-1 font-weight-medium"
                    >{{ color }}</span
                    >
                  </div>
                </v-flex>
                <v-layout row wrap>
                  <v-flex v-for="(item, i) in dependColor" :key="i" xs2>
                    <v-btn
                      small
                      :class="{ 'active-color': activeColor === item }"
                      @click="choseColor(item)"
                    >{{ item.color }}</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- <v-flex xs12 d-flex>
              <p style="color:#BDBDBD;margin:0px" class="pt-3">Chọn màu:</p>
            </v-flex>
            <v-flex v-for="(item, i) in colorsPoduct" :key="i" xs3 d-flex>
              <v-checkbox class="mt-0" :label="item" color="orange" value="orange" hide-details></v-checkbox>
            </v-flex>-->
          </v-layout>
        </v-flex>
        <v-flex xs2 md2>
          <v-card class="mb-4">
            <v-card-text class="pa-2">
              <div>
                <span>
                  <v-icon color="#1A237E">store</v-icon>
                </span>
                <span class="ml-1 teal--text">{{
                  thisSupplier.store_name
                }}</span>
              </div>
              <div>
                <span>
                  <v-icon color="#1A237E">how_to_reg</v-icon>
                </span>
                <span class="ml-1">Hợp tác cùng Drivy</span>
              </div>
              <div class="pl-4 mb-2">
                <v-btn small dark color="#00695C" @click="viewStore"
                >Xem Shop</v-btn
                >
              </div>
              <template v-if="this.supplier.length > 0">
                <v-divider />
                <div class="mt-1">
                  <p class="caption mb-2">NHÀ CUNG CẤP KHÁC</p>
                </div>
                <div>
                  <ul style="list-style-type:none" class="pl-0">
                    <li v-for="(item, i) in supplier" :key="i">
                      <v-layout>
                        <v-flex md7>
                          <div class="pb-0">{{ item.store_name }}</div>
                          <div class="red--text">{{ item.product_price }}</div>
                          <v-spacer />
                        </v-flex>
                        <v-flex md5>
                          <button
                            style="font-size:10px; padding:3px 14px;"
                            small
                            class="text-capitalize mt-2 btn_xem"
                            @click="choseSupplier(item)"
                          >
                            Xem
                          </button>
                        </v-flex>
                      </v-layout>
                    </li>
                  </ul>
                </div>
              </template>
            </v-card-text>
          </v-card>

          <div class="ml-5">
            <v-img
              src="https://lodo.vn/cdn/icon/100chinh-hang.svg"
              aspect-ratio="1"
              width="50%"
              class="ml-4"
            />
            <span>100% Chất Lượng</span>
          </div>
          <div class="ml-5 mt-3">
            <v-img
              src="https://lodo.vn/cdn/icon/free-delivery.svg"
              aspect-ratio="1"
              width="50%"
              class="ml-4"
            />
            <span>Miễn phí giao hàng</span>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-divider class="pb-4" />

      <v-layout row wrap>
        <v-flex md12 xs12>
          <div class="headline font-weight-regular mb-2">
            Thông Tin Chi Tiết
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md12>
          <table class="attribute">
            <tr v-for="(item, i) in catalogAttribute" :key="i">
              <td class="td_left">{{ item.type }}</td>
              <td>{{ item.catalog }}</td>
            </tr>
          </table>
        </v-flex>
      </v-layout>
    </v-container>
    <dialog-confirm
      :show="showPopUpConfirm"
      :parameter="parameterPoup"
      @close="handleClosePopupRemove"
    />
    <login-popup :show="showPopupLogin" @close="handleClosePopup" />
  </div>
</template>
<style>
.attribute {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.attribute td,
th {
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}
.btn_xem:focus {
  outline: 0 !important;
}

.btn_xem {
  background-color: white;
  color: black;
  border: 1px solid;
}

.btn_xem:hover {
  background-color: #008cba;
  color: white;
}

.td_left {
  background-color: #cfd8dc;
  width: 30%;
}

.breadcrumb a:visited {
  color: black;
}
.active {
  font-weight: 900;
  color: 'primary';
  border: 5px solid teal;
}

.active-color {
  font-weight: 900;
  color: 'primary';
  border: 5px solid teal;
}
</style>

<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
import NumberInput from '@chenfengyuan/vue-number-input';
import LoginPopup from 'modules/dashboard/loginPopup';
import { EventBus } from 'components/index';
import dialogConfirm from 'modules/common/dialog-confirm';
export default {
  components: {
    NumberInput,
    LoginPopup,
    dialogConfirm
  },
  data() {
    return {
      response: '',
      thisProduct: '',
      loadingform: false,
      crums: [
        {
          text: 'Trang chủ',
          disabled: false,
          to: '/'
        }
      ],
      showPopupLogin: false,
      size: '',
      color: '',
      images: [],
      convert: [],
      currImage: '',
      productInfo: '',
      colorsPoduct: [],
      sizesProduct: [],
      colorAndSize: '',
      dependColor: [],
      activeItem: '',
      activeColor: '',
      nameProduct: '',
      active: '',
      btnBuy: true,
      catalogs: [],
      brand: '',
      mainProduct: '',
      skuProduct: '',
      price: '',
      sale: '',
      percent: '',
      cost: '',
      product_quantity: 1,
      catalogAttribute: [],
      detail_product: [],
      numberCart: 0,
      thisSupplier: {},
      supplier: [],
      orderProduct: {
        product_detail_id: 0
      },
      currQuantity: '',
      showPopUpConfirm: false,
      parameterPoup: {
        title: '',
        nameBnt: '',
        iconName: '',
        mode: '',
        data: {}
      }
    };
  },

  computed: {
    ...mapGetters('dashboard', ['me']),
    ...mapGetters('products', ['thisOrderId'])
  },
  watch: {
    $route: {
      immediate: true,
      async handler($route) {
        this.response = $route.params.product;
      }
    }
  },
  created() {
    this.getImageProduct();
    this.getCrums();
    this.infoProduct();
    this.takeInfoProduct();
    this.getInfoCatalog();
    this.getSupplierProduct();
    this.getInfoCart();
  },

  methods: {
    ...mapActions('products', [
      'suggestCrums',
      'listImage',
      'getInfoProduct',
      'getInfoProductByProductName',
      'listCatalog',
      'getSupplierInfo',
      'supplierProductDetail',
      'addShoppingCart',
      'getInfoUserCart',
      'checkInfoProduct',
      'updateQuantityShoppingCart',
      'countNumberProduct'
    ]),
    ...mapActions('global', ['showSuccessMsg']),

    choseSize(item) {
      this.size = item.size_name;
      this.dependColor = item.color;
      this.activeItem = item;
    },

    async addProductToShoppingCart() {
      const { success, message } = await this.addShoppingCart({});
    },

    viewStore() {},

    choseSupplier(item) {
      let index = this.supplier.indexOf(item);
      let checkExist = this.supplier.includes(this.thisSupplier);
      if (checkExist === false) {
        this.supplier.push(this.thisSupplier);
        this.supplier.splice(index, 1);
        this.thisSupplier = item;
      }
    },

    handleClosePopup() {
      this.showPopupLogin = false;
    },

    async addProduct() {
      if (this.me === null) {
        this.showPopupLogin = true;
      } else {
        // console.log(this.orderProduct);
        if (this.product_quantity > this.currQuantity) {
          this.parameterPoup.title = 'Thông Báo';
          this.parameterPoup.message = 'Sản phẩm này không đủ số lượng.';
          this.showPopUpConfirm = true;
        } else {
          const checkProduct = await this.checkInfoProduct({
            orderProduct: this.orderProduct
          });
          if (checkProduct.data === null) {
            this.numberCart++;
            this.showSuccessMsg('Đã thêm sản phẩm vào giỏ hàng !');
            EventBus.$emit('add-clicked', this.numberCart);
            this.orderProduct.supplier_profile_id = this.thisSupplier.supplier_profile_id;
            this.orderProduct.store_name = this.thisSupplier.store_name;
            this.orderProduct.product_quantity = this.product_quantity;
            const { data, success, message } = await this.addShoppingCart({
              orderProduct: this.orderProduct
            });
          } else {
            this.showSuccessMsg('Đã thêm sản phẩm vào giỏ hàng !');
            EventBus.$emit('add-clicked', this.numberCart);

            this.orderProduct.product_quantity =
              checkProduct.data.product_quantity + this.product_quantity;
            const result = await this.updateQuantityShoppingCart({
              orderProduct: this.orderProduct
            });
          }
        }
      }
    },

    async choseColor(item) {
      // console.log(this.size);
      this.btnBuy = false;
      this.color = item.color;

      let detail_id = '';
      _.forEach(this.detail_product, product => {
        if (
          product.color_name === this.color &&
          product.size_name === this.size
        ) {
          detail_id = product.product_detail_id;
          this.orderProduct.product_detail_id = detail_id;
          this.currQuantity = product.quantity;
          this.skuProduct = product.sku;
          this.price = product.price;
          this.percent =
            100 - parseFloat((this.price / this.cost).toFixed(2)) * 100;
          this.sale = this.cost - this.price;
        }
      });

      let temp = item.image;
      let image_product = '';
      if (temp !== '') {
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
        image_product = image.src;
      } else {
        image_product = '';
      }
      this.currImage = image_product;
      this.activeColor = item;

      const { data, success, message } = await this.supplierProductDetail({
        productName: this.response,
        productDetailId: detail_id
      });
      if (data.supplier_products !== null) {
        let result = data.supplier_products;

        this.thisSupplier = result[0];
        this.orderProduct.supplier_profile_id = this.thisSupplier.supplier_profile_id;
        this.orderProduct.store_name = this.thisSupplier.store_name;
        this.supplier = [];
        for (let i = 1; i < result.length; i++) {
          this.supplier = result[i];
        }
      }
    },

    async getInfoCart() {
      if (this.me !== null) {
        let userId = this.me.user_id;
        const { data, success, message } = await this.getInfoUserCart({
          userId: userId
        });
        this.orderProduct.order_id = data.order_id;
        const result = await this.countNumberProduct({
          orderId: data.order_id
        });
        this.numberCart = result.data.count_product;
      }
    },

    async handleClosePopupRemove() {
      this.showPopUpConfirm = false;
    },

    buyProduct() {},

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async takeInfoProduct() {
      const { data, success, message } = await this.getInfoProductByProductName(
        {
          productName: this.response
        }
      );
      this.currQuantity = data.product_quantity;
      this.orderProduct.product_id = data.product_id;
      this.nameProduct = data.product_name;
      this.mainProduct = data;
      this.skuProduct = this.mainProduct.product_code;
      this.price = data.alter_price;
      this.cost = data.price;
      this.sale = this.cost - this.price;
      this.percent =
        100 - parseFloat((this.price / this.cost).toFixed(2)) * 100;
      let new_str = data.product_description.split('\n');
      this.mainProduct.product_description = new_str;
    },

    async getSupplierProduct() {
      const { data, success, message } = await this.getSupplierInfo({
        productName: this.response
      });
      let result = data.supplier_products; //array
      this.thisSupplier = result[0];
      this.orderProduct.supplier_profile_id = this.thisSupplier.supplier_profile_id;
      this.orderProduct.store_name = this.thisSupplier.store_name;
      for (let i = 1; i < result.length; i++) {
        this.supplier.push(result[i]);
      }
      // console.log(this.supplier);
    },

    async getInfoCatalog() {
      const { data, success, message } = await this.listCatalog({
        productName: this.response
      });
      this.catalogs = data.catalog_types;
      _.forEach(this.catalogs, catalog => {
        if (catalog.catalog_type_id === 11) {
          this.brand = catalog.catalog_name;
        }
      });
      let attribute = [];
      _.forEach(this.catalogs, catalog => {
        let result = {
          type: '',
          catalog: ''
        };
        result.type = catalog.type_name;
        result.catalog = catalog.catalog_name;
        attribute.push(result);
      });
      this.catalogAttribute = attribute;
    },

    async getImageProduct() {
      const { data, success, message } = await this.listImage({
        productName: this.response
      });
      this.images.push(data.product_image);
      _.forEach(data.product_images, item => {
        this.images.push(item.picture);
      });
      _.forEach(this.images, item => {
        const temp = item;
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
          item = image.src;
          this.convert.push(item);
        } else {
          item = '';
        }
        this.currImage = this.convert[0];
      });
    },

    async infoProduct() {
      const { data, message, success } = await this.getInfoProduct({
        productName: this.response
      });
      console.log(data);
      this.productInfo = data;
      this.detail_product = data.product_details;
      let colors = [];
      let size = [];
      let obj = [];
      let image = [];
      _.forEach(this.detail_product, item => {
        let pd = { color_name: '', size_name: '', image };
        pd.color_name = item.color_name;
        pd.size_name = item.size_name;
        pd.image = item.pd_image;
        colors.push(item.color_name);
        size.push(item.size_name);
        obj.push(pd);
      });
      this.colorsPoduct = [...new Set(colors)];
      this.sizesProduct = [...new Set(size)];
      if (this.sizesProduct.length === 0) {
        this.btnBuy = false;
      }
      let result = [];
      for (let i = 0; i < this.sizesProduct.length; i++) {
        let temp = {
          size_name: '',
          color: []
        };
        temp.size_name = this.sizesProduct[i];
        result.push(temp);
      }

      for (let i = 0; i < obj.length; i++) {
        for (let j = 0; j < result.length; j++) {
          if (obj[i].size_name === result[j].size_name) {
            let colorAndImage = {
              color: '',
              image: ''
            };
            colorAndImage.color = obj[i].color_name;
            colorAndImage.image = obj[i].image;
            result[j].color.push(colorAndImage);
          }
        }
      }
      this.colorAndSize = result;
    },

    async getCrums() {
      const { data, success, message } = await this.suggestCrums({
        productName: this.response
      });
      let itemCrums = {
        text: data.category_name,
        disabled: true,
        to: ''
      };
      this.crums.push(itemCrums);

      let itemCrums1 = {
        text: data.setting_name,
        disabled: true,
        to: ''
      };
      this.crums.push(itemCrums1);
      let itemCrums2 = {
        text: data.category_detail_type,
        disabled: true,
        to: ''
      };
      this.crums.push(itemCrums2);
      let itemCrums3 = {
        text: data.product_name,
        disabled: true,
        to: ''
      };
      this.crums.push(itemCrums3);
    },

    choseImage(item) {
      this.currImage = item;
    }
  }
};
</script>
