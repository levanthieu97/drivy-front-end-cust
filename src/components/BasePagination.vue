<template>
  <div class="base-pagination">
    <BaseButton
      :disabled="isPreviousButtonDisabled"
      @click.native="previousPage"
    >
      <v-icon>keyboard_arrow_left</v-icon>
    </BaseButton>

    <BasePaginationTrigger
      v-for="paginationTrigger in paginationTriggers"
      :key="paginationTrigger"
      :class="{
        'base-pagination__description--current':
          paginationTrigger === currentPage
      }"
      :page-number="paginationTrigger"
      class="base-pagination__description"
      @loadPage="onLoadPage"
    />

    <BaseButton :disabled="isNextButtonDisabled" @click.native="nextPage">
      <v-icon>keyboard_arrow_right</v-icon>
    </BaseButton>
  </div>
</template>
<script>
import BaseButton from 'components/BaseButton';
import BasePaginationTrigger from 'components/BasePaginationTrigger';

export default {
  components: {
    BaseButton,
    BasePaginationTrigger
  },

  props: {
    currentPage: {
      type: Number,
      required: true
    },

    pageCount: {
      type: Number,
      required: true
    },

    visiblePagesCount: {
      type: Number,
      default: 3
    }
  },

  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1;
    },

    isNextButtonDisabled() {
      return this.currentPage === this.pageCount;
    },

    paginationTriggers() {
      const currentPage = this.currentPage;
      const pageCount = this.pageCount;
      const visiblePagesCount = this.visiblePagesCount;
      const visiblePagesThreshold = (visiblePagesCount - 1) / 2;
      const paginationTriggersArray = Array(this.visiblePagesCount - 1).fill(0);

      if (currentPage <= visiblePagesThreshold + 1) {
        paginationTriggersArray[0] = 1;
        const paginationTriggers = paginationTriggersArray.map(
          (paginationTrigger, index) => {
            return paginationTriggersArray[0] + index;
          }
        );
        paginationTriggers.push(pageCount);

        return paginationTriggers;
      }

      if (currentPage >= pageCount - visiblePagesThreshold + 1) {
        const paginationTriggers = paginationTriggersArray.map(
          (paginationTrigger, index) => {
            return pageCount - index;
          }
        );

        paginationTriggers.reverse().unshift(1);

        return paginationTriggers;
      }

      paginationTriggersArray[0] = currentPage - visiblePagesThreshold + 1;
      const paginationTriggers = paginationTriggersArray.map(
        (paginationTrigger, index) => {
          return paginationTriggersArray[0] + index;
        }
      );
      paginationTriggers.unshift(1);
      paginationTriggers[paginationTriggers.length - 1] = pageCount;

      return paginationTriggers;
    }
  },

  methods: {
    nextPage() {
      this.$emit('nextPage');
    },

    onLoadPage(value) {
      this.$emit('loadPage', value);
    },

    previousPage() {
      this.$emit('previousPage');
    }
  }
};
</script>
<style lang="scss" scoped>
$c-primary-accent: #26a69a;

.base-pagination {
  display: flex;
  justify-content: center;
  align-items: center;

  &__description {
    display: flex;
    margin: 0 17px;
    font-size: 16px;
    font-weight: 600;

    &--current {
      color: $c-primary-accent;
    }
  }
}
</style>
