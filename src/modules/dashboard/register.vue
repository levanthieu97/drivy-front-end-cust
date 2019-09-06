<template>
  <v-dialog v-model="dialog" width="40%">
    <v-card class="elevation-12">
      <v-toolbar dark color="teal lighten-2">
        <v-toolbar-title class="subheading font-weight-light"
        >Đăng ký</v-toolbar-title
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
            prepend-icon="account_circle"
            label="Tài khoản"
            required
            autofocus
            v-on:keyup.13="subRegister"
          />
          <v-text-field
            ref="password"
            v-model="user.password"
            :rules="passwordRules"
            type="password"
            label="Mật khẩu"
            prepend-icon="lock"
            required
            v-on:keyup.13="subRegister"
          />
          <v-text-field
            ref="confirmpassword"
            v-model="user.confirmpassword"
            :rules="confirmpasswordRules"
            type="password"
            label="Xác nhận mật khẩu"
            prepend-icon="lock"
            required
            v-on:keyup.13="subRegister"
          />
          <v-text-field
            ref="fullname"
            v-model="user.fullname"
            :rules="fullnameRules"
            prepend-icon="face"
            label="Họ và tên"
            required
            v-on:keyup.13="subRegister"
          />
          <v-text-field
            ref="email"
            v-model="user.email"
            :rules="emailRules"
            type="email"
            prepend-icon="email"
            label="Email"
            required
            v-on:keyup.13="subRegister"
          />
          <v-text-field
            ref="phone"
            v-model="user.phone"
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
          <v-layout row wrap>
            <v-btn
              color="teal lighten-2"
              dark
              block
              style="margin-right: 10px"
              class="subheading font-weight-light"
              @click="closePopup"
            >Quay lại</v-btn
            >
            <v-btn
              color="teal lighten-2"
              dark
              block
              class="subheading font-weight-light"
              @click="subRegister"
            >Đăng ký</v-btn
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
    user: {
      username: '',
      password: '',
      fullname: '',
      email: '',
      phone: '',
      address: '',
      role: 'user'
    },
    dialog: false,
    loading: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [v => !!v || 'Vui lòng nhập mật khẩu'],
    fullnameRules: [v => !!v || 'Vui lòng nhập họ và tên'],
    usernameRules: [v => !!v || 'Vui lòng nhập tài khoản'],
    confirmpasswordRules: [v => !!v || 'Vui lòng xác nhận mật khẩu'],
    phoneRules: [v => !!v || 'Vui lòng nhập số điện thoại']
  }),
  computed: {
    ...mapGetters('dashboard', ['success', 'signal'])
  },

  watch: {
    signal() {
      if (this.success) {
        this.showSuccessMsg('Đăng ký thành công !!!');
      } else {
        // this.showErrorMsg('Tài khoản đã tồn tại !!!');
      }
    },

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

  mounted() {},

  methods: {
    ...mapActions('dashboard', ['registerUser']),
    ...mapActions('global', ['showErrorMsg', 'showSuccessMsg']),

    closePopup() {
      this.dialog = false;
    },

    subRegister() {
      if (!this.user.username) {
        this.$refs.username.focus();
      } else if (!this.user.password) {
        this.$refs.password.focus();
      } else if (!this.user.confirmpassword) {
        this.$refs.confirmpassword.focus();
      } else if (!this.user.fullname) {
        this.$refs.fullname.focus();
      } else if (!this.validateEmail(this.user.email)) {
        this.$refs.email.focus();
      } else if (!this.user.phone) {
        this.$refs.phone.focus();
      } else if (this.user.password != this.user.confirmpassword) {
        this.showErrorMsg('Xác nhận mật khẩu không đúng !');
      } else {
        this.registerUser({
          username: this.user.username,
          password: this.user.password,
          fullname: this.user.fullname,
          email: this.user.email,
          phone: this.user.phone,
          address: this.user.address,
          role: this.user.role
        });
        this.dialog = false;
        // this.$router.go(this.$router.currentRoute);
      }
    },

    validateEmail(email) {
      let re = /.+@.+/;
      return re.test(String(email).toLowerCase());
    },
    emitCloseState() {
      this.$emit('close');
    }
  }
};
</script>
