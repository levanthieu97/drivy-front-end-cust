<template>
  <div>
    <loading :active.sync="loading" :can-cancel="false" color="#337ab7" />
    <!-- <template v-if="$route.meta.requiresAuth == false"> -->
    <template>
      <v-app id="inspire" class="app">
        <app-toolbar class="app--toolbar" />
        <v-content class="content-page-wrapper" style="background-color:white;">
          <!-- Page Header -->
          <div class="page-wrapper" style="background-color:white;">
            <router-view />
          </div>
          <!-- App Footer -->
        </v-content>
        <v-footer
          height="auto"
          class="white pa-3 app--footer"
          dark=""
          color="teal lighten-2"
        >
          <v-spacer />
          <span class="caption" style="margin-right:10px"
          >Drivy &copy; {{ new Date().getFullYear() }}</span
          >
          <span class="caption mr-1">Make With Love</span>
          <v-icon color="pink" small>favorite</v-icon>
          <span class="caption mr-1">By Thieu Le</span>
        </v-footer>
        <!-- Go to top -->
      </v-app>
    </template>
    <!-- <template v-else>
      <transition>
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </template> -->
    <v-snackbar
      v-model="show"
      :timeout="3000"
      :color="snackbar.color"
      :multi-line="true"
      top
      right
    >
      {{ snackbar.text }}
      <v-btn dark flat icon @click.native="show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { AppToolbar } from 'components';
import AppEvents from 'core/event';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'assets/scss/style.scss';
import 'assets/css/custom.css';

export default {
  components: {
    AppToolbar,
    Loading
  },

  computed: {
    ...mapGetters('dashboard', ['isAuthenticated']),
    ...mapState('global', ['snackbar', 'loading']),

    show: {
      get() {
        return this.snackbar.show;
      },
      set() {
        this.resetMsg();
      }
    }
  },

  created() {
    // if (this.isAuthenticated) {
    //   this.$router.push({ path: '/' });
    // } else {
    //   this.$router.push({ path: '/404' });
    // }
    // if (this.isAuthenticated) {
    //   this.getProfile()
    //     .then(() => this.$router.push({ path: '/' }))
    //     .catch(() => this.$router.push({ path: '/login' }));
    // }
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
  },

  methods: {
    ...mapActions('global', ['resetMsg']),
    ...mapActions('dashboard', ['login'])
  }
};
</script>

<style lang="scss" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.content-page-wrapper {
  background-color: #ecf0f5;
}

.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
  background-color: #ecf0f5;
}

.view-header {
  font-size: 25px;
  width: 100%;
  padding: 10px 24px 0;
  margin: 0 0 -14px;
}

.view-header.hidden {
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
