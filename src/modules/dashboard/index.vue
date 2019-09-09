<template>
  <div style="background-color:white;">
    <v-container grid-list-md style="padding-top:5px;">
      <v-layout row wrap>
        <v-flex xs12>
          <v-img
            src="https://alpha-ecommerce.vuetifyjs.com/img/banner.ed54c86f.png"
            style="margin-bottom:0px"
          >
            <v-layout align-center fill-height>
              <v-flex lg4 md5 offset-md6 offset-lg7 text-xs-center>
                <div class="title font-weight-light mb-0">
                  <div>Mua sắm mọi lúc mọi nơi cùng Drivy.</div>
                </div>
                <hr class="primary--text mx-5 my-4 v-divider theme--light" />
                <div class="headline brown--text">
                  <div class="font-weight-light">
                    Chất lượng. Tiện lợi. Nhanh chóng.
                  </div>
                  <div>Hàng Sale mỗi ngày.</div>
                </div>
              </v-flex>
            </v-layout>
          </v-img>
        </v-flex>
      </v-layout>
      <v-layout row wrap text-xs-center>
        <v-flex xs12>
          <v-card tile>
            <v-card-title primary-title>
              <div>
                <p class="title font-weight-light mb-0">Danh mục</p>
              </div>
            </v-card-title>
            <v-carousel
              light
              :continuous="false"
              :cycle="cycle"
              :show-arrows="true"
              height="200"
              hide-delimiters
            >
              <v-carousel-item v-for="(slide, k) in slides" :key="k">
                <v-layout row wrap align-center fill-height justify-center>
                  <v-flex v-for="i in slide" :key="i.cate_setting_id" xs2>
                    <!-- <router-link :to="{name: 'category', params: {category: i.setting_name}}"> -->
                    <div
                      style="cursor:pointer"
                      @click="getCategory(i.setting_name)"
                    >
                      <v-img
                        style="margin-left:35px"
                        aspect-ratio="1"
                        :src="i.setting_type"
                        width="60%"
                      ></v-img>
                      <p
                        style="color:black;height:40px;"
                        class="subheading font-weight-light"
                      >
                        {{ i.setting_name }}
                      </p>
                    </div>
                    <!-- </router-link> -->
                  </v-flex>
                </v-layout>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 style="margin-top:20px">
          <div class="text-sm-left">
            <p class="title font-weight-light mb-0">Sản phẩm dành cho bạn</p>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex v-for="i in moreProduct" :key="i.product_id" xs6 md3>
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 12 : 1"
                  class="mx-auto"
                  height="370"
                  style="padding-left:15px"
                >
                  <router-link
                    :to="{
                      name: 'product',
                      params: { product: i.product_name }
                    }"
                  >
                    <div class="pa-4">
                      <v-img
                        style="margin-left:15px"
                        :src="i.product_image"
                        aspect-ratio="1"
                        width="170px"
                      ></v-img>
                    </div>
                    <v-card-title
                      style="height:70px"
                      class="subheading font-weight-light black--text"
                    >
                      <p class="block-with-text">{{ i.product_name }}</p>
                    </v-card-title>
                    <v-card-actions>
                      <div style="padding:0px">
                        <div class="teal--text title font-weight-medium">
                          {{ formatPrice(i.alter_price) }} đ
                        </div>
                        <div class="black--text subheading font-weight-light">
                          <del>{{ formatPrice(i.price) }}</del> đ
                          <v-chip
                            label
                            small
                            light
                            color="brown"
                            text-color="white"
                          >
                            Save
                            {{ discount(i.alter_price, i.price) }} %
                          </v-chip>
                        </div>
                      </div>
                    </v-card-actions>
                  </router-link>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="text-xs-center">
          <template>
            <div class="justify-center">
              <v-btn
                class="text-none"
                outline
                round
                color="pink"
                @click="addMoreProduct()"
              >Xem Thêm</v-btn
              >
            </div>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<style>
.block-with-text {
  /* hide text if it more than N lines  */
  overflow: hidden;
  /* for set '...' in absolute position */
  position: relative;
  /* use this value to count block height */
  line-height: 1.2em;
  /* max-height = line-height (1.2) * lines max number (3) */
  max-height: 2.4em;
  /* fix problem when last visible word doesn't adjoin right side  */
  text-align: justify;

  /* */
  margin-right: -1em;
  padding-right: 1em;
}
.block-with-text:before {
  /* points in the end */
  content: '...';
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of block */
  right: 0;
  bottom: 0;
}
.block-with-text:after {
  /* points in the end */
  content: '';
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of text */
  right: 0;
  width: 1em;
  /* set width and height */
  height: 1em;
  margin-top: 0.2em;
  background: white;
}
</style>

<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
import { TABLE_PAGE_SIZES } from 'core/constants';
import { EventBus } from 'components/index';
export default {
  data() {
    return {
      categories: [],
      transition: '',
      slides: {},
      cycle: false,
      listProduct: [],
      moreProduct: [],
      colors: [
        'green',
        'secondary',
        'yellow darken-4',
        'red lighten-2',
        'orange darken-1'
      ]
    };
  },

  watch: {
    onboarding() {
      if (this.onboarding === this.transition - 1) {
        this.btnNext = true;
      } else {
        this.btnNext = false;
      }

      if (this.onboarding === 0) {
        this.btnPrev = true;
      } else {
        this.btnPrev = false;
      }
    }
  },

  created() {
    if (this.onboarding === 0) {
      this.btnPrev = true;
    }
    this.getSettingName();
    // this.getDataProduct();
    EventBus.$on('add-clicked', numberCart => {
      console.log(`Oh, my shopping-cart ${numberCart}`);
    });
  },

  methods: {
    ...mapActions('dashboard', ['getNameCateSetting', 'getInfoProduct']),

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async getSettingName() {
      const { data, success, message } = await this.getNameCateSetting();
      if (data.length % 5 === 0) {
        this.transition = Math.floor(data.length / 5);
      } else {
        this.transition = Math.floor(data.length / 5) + 1;
      }
      this.categories = data;
      let arg = {};
      let start = 0;
      for (let i = 1; i <= this.transition; i++) {
        let arr = [];
        for (let k = start; k < data.length; k++) {
          arr.push(data[k]);
          arg[i] = arr;
          if (arr.length === 5) {
            start = start + arr.length;
            break;
          }
        }
      }
      this.slides = arg;
      this.getDataProduct();
    },

    async getCategory(item) {
      await this.$router.push({ name: 'category', params: { category: item } });
    },

    discount(alter_price, price) {
      return 100 - parseFloat((alter_price / price).toFixed(2)) * 100;
    },

    async getDataProduct() {
      const { data, success, message } = await this.getInfoProduct();
      this.listProduct = data;
      _.forEach(this.listProduct, item => {
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

      for (let i = 0; i < this.listProduct.length; i++) {
        if (this.moreProduct.length < 12) {
          this.moreProduct.push(this.listProduct[i]);
        } else {
          break;
        }
      }
    },

    addMoreProduct() {
      let size = this.moreProduct.length;
      if (size < this.listProduct.length) {
        for (let i = size; i < size + 8; i++) {
          if (i <= this.listProduct.length) {
            this.moreProduct.push(this.listProduct[i]);
          } else {
            break;
          }
        }
      }
    }
  }
};
</script>
