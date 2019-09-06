<template>
  <v-dialog v-model="dialog" width="40%">
    <v-card class="elevation-12">
      <v-toolbar dark color="teal lighten-2">
        <v-toolbar-title class="subheading font-weight-light"
        >Đăng nhập</v-toolbar-title
        >
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon dark @click="closePopup">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            ref="username"
            v-model="user.username"
            :rules="usernameRules"
            prepend-icon="person"
            label="Tài Khoản"
            required
            autofocus
            v-on:keyup.13="subLogin"
          />
          <v-text-field
            ref="password"
            v-model="user.password"
            :rules="passwordRules"
            type="password"
            label="Mật Khẩu"
            prepend-icon="lock"
            required
            v-on:keyup.13="subLogin"
          />
          <v-alert
            :value="!hasLoadedOnce"
            color="error"
            icon="warning"
            outline
          >{{ message }}</v-alert
          >
          <v-layout row wrap>
            <v-btn
              class="subheading font-weight-light"
              color="teal lighten-2"
              dark
              style="margin-right: 10px"
              block
              @click="returnIndex"
            >Quay lại</v-btn
            >
            <v-btn
              class="subheading font-weight-light"
              :loading="isProcess"
              color="teal lighten-2"
              dark
              block
              @click="subLogin"
            >Đăng nhập</v-btn
            >
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { TABLE_PAGE_SIZES } from 'core/constants';

export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    dialog: false,
    isProcess: false,
    user: {
      username: '',
      password: ''
    },
    usernameRules: [v => !!v || 'Vui lòng nhập tài khoản'],
    passwordRules: [v => !!v || 'Vui lòng nhập mật khẩu']
  }),
  watch: {
    show(value) {
      this.dialog = value;
      // if (this.dialog) {
      //   console.log(this.dialog);
      // }
    },

    dialog() {
      if (!this.dialog) {
        this.emitCloseState();
      }
    }
  },
  computed: {
    ...mapGetters('dashboard', ['hasLoadedOnce', 'message'])
  },

  created() {},

  methods: {
    ...mapActions('dashboard', ['login']),

    returnIndex() {
      this.dialog = false;
    },
    closePopup() {
      this.dialog = false;
    },

    async subLogin() {
      this.isProcess = true;
      if (!this.user.username) {
        this.$refs.username.focus();
      } else if (!this.user.password) {
        this.$refs.password.focus();
      } else {
        const { success } = await this.login({
          username: this.user.username,
          password: this.user.password
        });

        if (success === true) {
          this.dialog = false;
          this.isProcess = false;
        } else {
          this.isProcess = false;
        }
      }
      this.isProcess = false;
    },

    emitCloseState() {
      this.$emit('close');
    }
  }
};
</script>
