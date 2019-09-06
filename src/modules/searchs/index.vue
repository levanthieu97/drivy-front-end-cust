<template>
  <v-container grid-list-sm style="padding-top:10px;">
    <v-layout v-if="products.length === 0" row wrap>
      <v-flex md12 xs12 lg12>
        <span class="headline font-weight-light"
        >Không tìm thấy kết quả nào với từ khóa:</span
        >
        <span class="ml-1 headline font-weight-light" style="color:#90A4AE"
        >"{{ response }}"</span
        >
      </v-flex>
      <v-flex xs12 md12 lg12>
        <v-layout align-center justify-center>
          <v-img
            src="https://cdngarenanow-a.akamaihd.net/shopee/shopee-pcmall-live-sg/assets/62d2399b89039bd1dc90ca2d50d3e802.png"
            aspect-ratio="1"
            max-width="20%"
            class="mt-3"
          ></v-img>
        </v-layout>
        <v-layout
          align-center
          justify-center
          class="mt-1 title font-weight-regular"
        >
          <span>Không có sản phẩm nào.</span>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout v-else row wrap>
      <v-flex md12 xs12 lg12>
        <span class="headline font-weight-light"
        >Kết quả tìm kiếm cho '{{ response }}' là:</span
        >
        <span class="ml-1 headline font-weight-light" style="color:#90A4AE"
        >{{ products.length }} kết quả</span
        >
      </v-flex>
      <v-flex v-for="(product, i) in this.current_product" :key="i" xs6 md3>
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
                    <v-chip label small light color="brown" text-color="white"
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
      <BasePagination
        :current-page="current_page"
        :page-count="pageCount"
        class="articles-list__pagination"
        @nextPage="pageChangeHandle('next')"
        @previousPage="pageChangeHandle('previous')"
        @loadPage="pageChangeHandle"
      />
    </v-layout>
  </v-container>
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
<style lang="scss" scoped>
.articles-list {
  &__pagination {
    margin-top: 10px;
    bottom: 70px;
    transform: translateX(300%);
  }
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
    visibleItemsPerPageCount: 8
  },

  data() {
    return {
      response: '',
      product: '',
      products: '',
      visiblePagesCount: 0,
      pageSize: 0,
      pageCount: 0,
      current_page: 1,
      numberPrevious: '',
      current_product: []
    };
  },
  computed: {
    ...mapGetters('dashboard', ['me']),

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
        this.response = $route.query.productName;
      }
    }
  },
  created() {
    this.getListProduct();
  },
  methods: {
    ...mapActions('searchs', ['listSearchProduct']),

    discount(alter_price, price) {
      return 100 - parseFloat((alter_price / price).toFixed(2)) * 100;
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async getListProduct() {
      const { data, message, success } = await this.listSearchProduct({
        productName: this.response
      });
      let currProduct = this.$options.static.visibleItemsPerPageCount;

      this.products = data;
      console.log(this.products);

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

      for (let i = 0; i < currProduct; i++) {
        this.current_product.push(data[i]);
      }
      this.pageCount = Math.ceil(data.length / currProduct);
      this.pageSize = this.current_product.length;
      let arg = Math.ceil(this.products.length / currProduct);
      // console.log(arg);
      if (arg < 2) {
        this.visiblePagesCount = arg;
      } else {
        this.visiblePagesCount = 2;
      }
    },

    async pageChangeHandle(value) {
      switch (value) {
        case 'next':
          this.current_page += 1;
          this.current_product = [];
          let arg = this.$options.static.visibleItemsPerPageCount;

          if (this.products.length === 0) {
            this.current_product = [];
          } else {
            if (this.numberPrevious === 0) {
              this.numberPrevious = arg;
            }
            this.current_product = [];
            for (let i = this.pageSize; i < this.pageSize + arg; i++) {
              if (i >= this.products.length) {
                break;
              } else {
                this.current_product.push(this.products[i]);
              }
            }
            this.pageSize = this.pageSize + arg;
            this.numberPrevious = this.pageSize - arg;
          }
          break;
        case 'previous':
          this.current_page -= 1;
          let size = this.$options.static.visibleItemsPerPageCount;

          this.current_product = [];
          if (this.products.length > 0) {
            for (
              let i = this.numberPrevious - size;
              i < this.numberPrevious;
              i++
            ) {
              this.current_product.push(this.products[i]);
            }
          }
          this.numberPrevious = this.numberPrevious - size;
          this.pageSize = this.pageSize - size;
          break;
        default:
          console.log(value);
          this.current_page = value;
          let curr = this.$options.static.visibleItemsPerPageCount;
          this.current_product = [];
          for (let i = curr * (value - 1); i < curr * value; i++) {
            if (i >= this.products.length) {
              break;
            } else {
              this.current_product.push(this.products[i]);
            }
          }
          break;
      }
    }
  }
};
</script>
