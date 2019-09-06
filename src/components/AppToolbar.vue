<template>
  <div>
    <loading :active.sync="loadLogin" :is-full-page="false" color="#337ab7" />
    <v-toolbar
      class="custom-style"
      color="teal lighten-2"
      fixed
      app
      prominent
      extended
      height="50px"
    >
      <v-spacer />
      <v-toolbar-title dark>
        <span>
          <a
            id="material"
            class="subheading font-weight-light linked"
            href="http://localhost:8081/"
            target="_blank"
          >Kênh bán hàng</a
          >
        </span>
      </v-toolbar-title>
      <v-spacer />

      <template v-if="this.me == null">
        <v-spacer />
        <v-btn
          class="text-capitalize font-weight-light"
          style="margin-right:0px"
          dark
          flat
          @click="onRegister"
        >
          <span>Đăng ký</span>
        </v-btn>
        <v-btn
          class="text-capitalize body-1 font-weight-light"
          style="margin-left:0px"
          dark
          flat
          @click="onLogin"
        >
          <span>Đăng nhập</span>
        </v-btn>
        <v-spacer />
      </template>
      <template v-else>
        <v-spacer />
        <v-icon dark>person</v-icon>
        <span class="white--text subtitle-1 font-weight-light">{{
          me.fullname
        }}</span>
        <v-btn
          class="text-capitalize font-weight-light"
          style="margin-right:0px"
          dark
          flat
          @click="handleLogoutClick"
        >
          <span>Đăng xuất</span>
        </v-btn>
        <v-spacer />
      </template>

      <template v-slot:extension>
        <v-layout row>
          <v-flex md1 />
          <v-flex md1 class="text-xs-right">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-toolbar-side-icon dark v-on="on"></v-toolbar-side-icon>
              </template>

              <v-card>
                <v-list>
                  <v-list-tile avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Thư mục sản phẩm</v-list-tile-title>
                      <v-list-tile-sub-title>Mua hàng</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action style="justify-content:center">
                      <v-btn
                        :class="fav ? 'red--text' : ''"
                        icon
                        @click="fav = !fav"
                      >
                        <v-icon>favorite</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>

                <v-divider></v-divider>
                <v-list>
                  <div v-for="(category, i) in categories" :key="i">
                    <v-menu offset-x open-on-hover>
                      <template slot="activator">
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{
                              category.category_name
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-icon color="grey lighten-1">info</v-icon>
                          </v-list-tile-action>
                        </v-list-tile>
                      </template>
                      <v-list>
                        <v-list-tile
                          v-for="(detail, k) in category.category_details"
                          :key="k"
                          style="cursor:pointer"
                          @click="choseCategory(detail)"
                        >
                          <v-list-tile-title>{{
                            detail.cate_details_type
                          }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </div>
                </v-list>
                <!-- <v-list>
                  <v-menu offset-x open-on-hover>
                    <v-list-tile v-for="(category, i) in categories" :key="i">
                        <v-list-tile-title>{{category.category_name}}</v-list-tile-title>
                      </v-list-tile>
                    <v-list>
                      <v-list-tile v-for="(setting, index) in category.category_settings" :key="index">
                        <v-list-tile-title>{{setting}}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list>-->
              </v-card>
            </v-menu>
          </v-flex>
          <v-flex md1 style="margin-top:-10px;">
            <div style="cursor:pointer" @click="backHome">
              <img
                src="~assets/images/logo_store.png"
                height="70"
                alt="TP Shop"
              />
            </div>
          </v-flex>
          <v-flex md6>
            <v-text-field
              v-model="keySearch"
              label="Tìm kiếm sản phẩm"
              single-line
              solo
              hide-details
            >
              <template slot="append">
                <v-btn
                  class="btn_ui_back"
                  color="teal lighten-2"
                  style="margin-right:0px"
                  dark
                  @click="searchProduct(keySearch)"
                >
                  <v-icon dark>search</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-flex>
          <v-flex md1>
            <v-btn
              flat
              dark
              outline
              style="height:48px; margin-top:0px"
              @click="myShoppingCart"
            >
              <v-badge left color="blue-grey darken-1">
                <span slot="badge">{{ numberCart }}</span>
                <v-icon>shopping_cart</v-icon>
              </v-badge>
            </v-btn>
          </v-flex>
          <v-flex md1 xs2></v-flex>
        </v-layout>
      </template>
    </v-toolbar>
    <login-popup :show="showPopupLogin" @close="handleClosePopup" />
    <register-popup :show="popupRegister" @close="closeRegiter" />
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
import LoginPopup from 'modules/dashboard/loginPopup';
import RegisterPopup from 'modules/dashboard/register';
import Loading from 'vue-loading-overlay';
import { EventBus } from 'components/index';

export default {
  name: 'app-toolbar',
  components: {
    Loading,
    RegisterPopup,
    LoginPopup
  },

  data() {
    return {
      loadLogin: false,
      showPopupLogin: false,
      popupRegister: false,
      numberCart: 0,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      categories: [],
      categorySetting: [],
      categoryDetail: [],
      myCart: '',
      keySearch: ''
    };
  },

  watch: {
    showPopupLogin() {}
  },

  computed: {
    ...mapGetters('dashboard', ['me']),
    ...mapState('global', ['drawerToggled']),

    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    }
  },

  created() {
    this.requestCategory();
    EventBus.$on('add-clicked', numberCart => {
      this.numberCart = numberCart;
    });
    this.getNumberProduct();
  },

  destroyed() {
    EventBus.$off('add-clicked');
  },

  methods: {
    ...mapActions('dashboard', ['logout', 'listCategory']),

    ...mapActions('global', ['toggleDrawer']),

    ...mapActions('products', ['getInfoUserCart', 'countNumberProduct']),

    myShoppingCart() {
      if (this.me === null) {
        this.showPopupLogin = true;
      } else {
        this.$router.push({ path: '/cart' });
      }
    },

    onLogin() {
      this.showPopupLogin = true;
    },

    onRegister() {
      this.popupRegister = true;
    },

    handleDrawerToggle() {
      this.toggleDrawer(!this.drawerToggled);
    },

    handleLogoutClick() {
      this.logout().then(() => this.$router.go(this.$router.currentRoute));
    },

    backHome() {
      this.$router.push({ path: '/' });
    },

    upper(val) {
      return _.toUpper(val);
    },
    handleClosePopup() {
      this.showPopupLogin = false;
    },
    closeRegiter() {
      this.popupRegister = false;
    },

    async searchProduct(key) {
      console.log(key);
      if (key !== '') {
        this.$router.replace(
          { path: '/search', query: { productName: key } },
          () => {
            this.$router.go(0);
          }
        );
        // await this.$router.push({path:'search', query: {productName: key}})
      }
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
        this.myCart = data.order_id;
        // this.myCart.email = this.me.email;
        // this.myCart.fullname = this.me.fullname;
        // this.myCart.phone = this.me.phone;
        // this.myCart.quantity = this.numberCart;
      }
    },

    async requestCategory() {
      const { data, success, message } = await this.listCategory();
      this.categories = data;
    },
    async choseCategory(item) {
      await this.$router.push({
        name: 'item',
        params: { item: item.cate_details_type }
      });
    }
  }
};
</script>

<style>
.custom-style.v-toolbar .v-toolbar__content {
  padding-left: 40px;
  padding-right: 40px;
}

.personal {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  cursor: pointer;
  margin: 0 5px 0 0;
}

.personal:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.personal > img {
  float: left;
  height: 26px;
  margin: 12px auto;
}

.personal > div {
  float: right;
  margin: 14px 0 14px 14px;
  font-weight: 600;
}

.linked:visited {
  color: white;
}

a:link {
  text-decoration: none;
}
</style>
