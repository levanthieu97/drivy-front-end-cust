<template>
  <v-dialog v-model="dialog" width="20%" grid-list-md text-xs-center>
    <v-form ref="formCd">
      <v-card flat class="home-app-wrapper">
        <v-layout align-center fill-height class="header white--text ui_title">
          <v-flex md12>
            <v-card-title class=" subheading white--text title">{{
              parameter.title
            }}</v-card-title>
          </v-flex>
        </v-layout>
        <v-container grid-list-md text-xs-center>
          <v-layout row align-center fill-height>
            <v-flex md12>
              <span class=" subheading">{{ parameter.message }}</span>
            </v-flex>
          </v-layout>
          <v-layout row align-center fill-height>
            <v-flex md12>
              <v-btn
                flat
                class="btn_ui_blue"
                color="white"
                @click="handleAgree"
              >
                Đồng Ý
              </v-btn>
              <v-btn
                flat
                class="btn_ui_add icon"
                color="white"
                @click="handleCancel"
              >
                Hủy bỏ
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    parameter: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      dialog: false,
      isAgree: false
    };
  },
  watch: {
    show(value) {
      this.dialog = value;
    },
    dialog() {
      if (!this.dialog) {
        this.emitCloseState();
      }
    }
  },

  created() {
    this.dialog = this.show;
  },

  methods: {
    emitCloseState() {
      this.$emit('close', this.isAgree);
      this.dialog = false;
    },
    handleAgree() {
      this.isAgree = true;
      this.emitCloseState();
    },
    handleCancel() {
      this.isAgree = false;
      this.emitCloseState();
    }
  }
};
</script>
