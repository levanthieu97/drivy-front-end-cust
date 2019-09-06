<template>
  <v-container grid-list-sm style="padding-top:5px;">
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <div>
          <v-layout wrap>
            <v-flex
              xs12
              md12
              lg12
              class="text-xs-center display-2 font-weight-regular"
              style="color:#004D40"
            >Xin Cảm ơn!</v-flex
            >
          </v-layout>
        </div>

        <div class="mx-5 px-5">
          <v-layout wrap>
            <v-flex xs12 md12 lg12 class="title font-weight-light my-2">
              <span>- Đơn hàng của bạn:</span>
              <span style="color:#004D40">MT00{{ response.payment_id }}</span>
            </v-flex>
            <v-flex xs12 md12 lg12 class="title font-weight-light my-2">
              <span>- Ngày đặt:</span>
              <span>{{ response.create_date }}</span>
            </v-flex>
            <v-flex xs12 md12 lg12 class="title font-weight-light my-2">
              <span>- Phương thức thanh toán:</span>
              <span>{{ response.type_payment }}</span>
            </v-flex>
            <v-flex xs12 md12 lg12 class="title font-weight-light my-2">
              <span>- Chúng tôi sẽ thông báo cho bạn qua:</span>
              <span>{{ me.email }}</span>
            </v-flex>
            <v-flex xs12 md12 lg12 class="title font-weight-light my-2">
              <span>- Đơn hàng sẽ được giao trong 5 đến 7 ngày.</span>
            </v-flex>
            <v-flex xs12 md12 lg12 class="my-2">
              <p class="title font-weight-light">
                Cảm ơn bạn đã tin tưởng và mua hàng tại
                <span style="color:red">Drivy</span>. Chúng tôi xin đảm bảo về
                chất lượng sản phẩm cung cấp đến người tiêu dùng.
              </p>
            </v-flex>
          </v-layout>
        </div>
        <div>
          <v-layout wrap>
            <v-flex xs12 md12 lg12 class="text-xs-center">
              <v-btn outline color="#004D40" @click="backHome"
              >Tiếp tục mua hàng</v-btn
              >
            </v-flex>
          </v-layout>
        </div>
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
      paymentId: '',
      response: '',
      mailBill: {
        bill: '',
        user_email: ''
      }
    };
  },
  computed: {
    ...mapGetters('dashboard', ['me']),
    ...mapGetters('products', ['thisOrderId'])
  },
  created() {
    console.log(this.me);

    if (this.me === 'null' || this.me === '') {
      this.$router.push({ path: '/' });
    }
    this.getPaymentId();
    this.sendEmailConfirm();
  },

  methods: {
    ...mapActions('confirmOrder', [
      'getPaymentById',
      'infoPayment',
      'confirmBuyProduct'
    ]),

    async getPaymentId() {
      const { data, success, message } = await this.getPaymentById();
      this.paymentId = data.payment_id;
      const result = await this.infoPayment({
        paymentId: this.paymentId
      });

      this.response = result.data;

      console.log(this.response);
    },

    async sendEmailConfirm() {
      this.mailBill.bill = 'MT00' + this.response.payment_id;
      this.mailBill.user_email = this.me.email;
      const { success, message } = await this.confirmBuyProduct({
        mailBill: this.mailBill
      });

      console.log(message);
    },

    backHome() {
      this.$router.go(this.$router.push({ path: '/' }));
    }
  }
};
</script>
