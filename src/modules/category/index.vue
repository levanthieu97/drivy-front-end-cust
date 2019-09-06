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
      <v-layout row wrap>
        <v-flex xs2>
          <v-card elevation="1">
            <v-card-title
              color="teal"
              class="font-weight-medium"
              style="padding-bottom:15px"
            >{{ $route.params.category }}</v-card-title
            >
            <v-list style="padding-top:0px" dense>
              <v-list-tile-content>
                <v-list-tile
                  v-for="(detail, i) in this.categoryDetail"
                  :key="i"
                  @click="choseCategory(detail)"
                >
                  <v-list-tile-sub-title class="black--text body-1 pl-3">{{
                    detail.cate_details_type
                  }}</v-list-tile-sub-title>
                </v-list-tile>
              </v-list-tile-content>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs10>
          <v-layout row wrap>
            <v-flex v-for="(product, i) in currentProduct" :key="i" xs6 md3>
              <v-hover v-slot:default="{ hover }">
                <v-card :elevation="hover ? 12 : 1" height="370px">
                  <router-link
                    :to="{
                      name: 'product',
                      params: { product: product.product_name }
                    }"
                  >
                    <div class="pa-4">
                      <v-img
                        style="margin-left:15px"
                        :src="product.product_image"
                        aspect-ratio="1"
                        width="170px"
                      ></v-img>
                    </div>
                    <v-card-title
                      style="height:72px"
                      class="subheading font-weight-light black--text"
                    >
                      <p class="block-with-text">{{ product.product_name }}</p>
                    </v-card-title>
                    <v-card-actions>
                      <div style="padding:0px">
                        <div class="teal--text title font-weight-medium">
                          {{ formatPrice(product.alter_price) }} đ
                        </div>
                        <div class="black--text subheading font-weight-light">
                          <del>{{ formatPrice(product.price) }}</del> đ
                          <v-chip
                            label
                            small
                            light
                            color="brown"
                            text-color="white"
                          >Save
                            {{ discount(product.alter_price, product.price) }}
                            %</v-chip
                          >
                        </div>
                      </div>
                    </v-card-actions>
                  </router-link>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-flex>
        <BasePagination
          :current-page="currentPage"
          :page-count="pageCount"
          class="articles-list__pagination"
          @nextPage="pageChangeHandle('next')"
          @previousPage="pageChangeHandle('previous')"
          @loadPage="pageChangeHandle"
        />
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

.breadcrumb a:visited {
  color: black;
}
</style>

<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
import BasePagination from 'components/BasePagination';
export default {
  components: {
    BasePagination
  },

  static: {
    visibleItemsPerPageCount: 16
  },

  data() {
    return {
      response: '',
      visiblePagesCount: 0,
      categoryDetail: [],
      products: '',
      pageSize: 0,
      pageCount: 0,
      currentPage: 1,
      currentProduct: [],
      numberPrevious: '',
      itemCrums: {
        text: '',
        disabled: false,
        to: ''
      },

      crums: [
        {
          text: 'Trang chủ',
          disabled: false,
          to: '/'
        }
      ]
    };
  },

  computed: {
    pages() {
      return this.pagination.size
        ? Math.ceil(this.products.length / this.pagination.size)
        : console.log(this.products.length);
    },

    paginatedData() {
      const start = this.pageNumber * this.pagination.size;
      const end = start + this.size;
      return this.products.slice(start, end);
    }
  },

  watch: {
    $route: {
      immediate: true,
      async handler($route) {
        this.response = $route.params.category;
        const { data, message, succer } = await this.listProductSetting({
          settingName: $route.params.category
        });
        console.log(data);
        let currProduct = this.$options.static.visibleItemsPerPageCount;
        this.products = data;
        _.forEach(this.products, item => {
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
        console.log('aaaa');

        for (let i = 0; i < this.products.length; i++) {
          this.currentProduct.push(data[i]);
        }
        console.log(this.currentProduct);
        this.pageCount = Math.ceil(data.length / currProduct);
        this.pageSize = this.currentProduct.length;
        let arg = Math.ceil(this.products.length / currProduct);
        // console.log(arg);
        if (arg < 5) {
          this.visiblePagesCount = arg;
        } else {
          this.visiblePagesCount = 5;
        }
      }
    }
  },

  created() {
    this.getScrum();

    this.getSettingDetail();
  },

  methods: {
    ...mapActions('category', [
      'listProductSetting',
      'listSettingDetail',
      'suggestScrums'
    ]),

    async getSettingDetail() {
      const { data, success, message } = await this.listSettingDetail({
        settingName: this.response
      });
      let result = data[0];
      this.categoryDetail = result.category_details;
    },
    discount(alter_price, price) {
      return 100 - parseFloat((alter_price / price).toFixed(2)) * 100;
    },

    async choseCategory(item) {
      await this.$router.push({
        name: 'item',
        params: { item: item.cate_details_type }
      });
    },

    async getScrum() {
      const { data, success, message } = await this.suggestScrums({
        settingName: this.response
      });
      let result = data.category;
      console.log(result);
      this.itemCrums.text = result.category_name;
      this.itemCrums.disabled = true;
      this.crums.push(this.itemCrums);

      const itemCrums = {
        text: this.response,
        disabled: true,
        to: ''
      };
      this.crums.push(itemCrums);
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async pageChangeHandle(value) {
      switch (value) {
        case 'next':
          this.currentPage += 1;
          this.currentProduct = [];
          let arg = this.$options.static.visibleItemsPerPageCount;

          if (this.products.length === 0) {
            this.currentProduct = [];
          } else {
            if (this.numberPrevious === 0) {
              this.numberPrevious = arg;
            }
            this.currentProduct = [];
            for (let i = this.pageSize; i < this.pageSize + arg; i++) {
              if (i >= this.products.length) {
                break;
              } else {
                this.currentProduct.push(this.products[i]);
              }
            }
            this.pageSize = this.pageSize + arg;
            this.numberPrevious = this.pageSize - arg;
          }
          break;
        case 'previous':
          this.currentPage -= 1;
          let size = this.$options.static.visibleItemsPerPageCount;

          this.currentProduct = [];
          if (this.products.length > 0) {
            for (
              let i = this.numberPrevious - size;
              i < this.numberPrevious;
              i++
            ) {
              this.currentProduct.push(this.products[i]);
            }
          }
          this.numberPrevious = this.numberPrevious - size;
          this.pageSize = this.pageSize - size;
          break;
        default:
          console.log(value);
          this.currentPage = value;
          let curr = this.$options.static.visibleItemsPerPageCount;
          this.currentProduct = [];
          for (let i = curr * (value - 1); i < curr * value; i++) {
            if (i >= this.products.length) {
              break;
            } else {
              this.currentProduct.push(this.products[i]);
            }
          }
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.articles-list {
  &__pagination {
    margin-top: 10px;
    bottom: 70px;
    transform: translateX(300%);
  }
}
</style>
