<template>
  <div class="shelf-footer" v-show="isEditModel">
    <div class="shelf-footer-tabs-wrapper">
      <div
        class="shelf-footer-tab"
        :class="{'is-selected': isSelected}"
        v-for="item in tabs"
        :key="item.index">
        <span
          class="tab-icon"
          :class="getClass(item)"></span>
        <span class="tab-text">{{getLabel(item)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'

  export default {
    mixins: [storeShelfMixin],
    computed: {
      tabs () {
        return [
          {
            index: 1,
            label: this.$t('shelf.private'),
            label2: this.$t('shelf.noPrivate'),
            icon: 'icon-private',
            icon2: 'icon-private-see'
          }, {
            index: 2,
            label: this.$t('shelf.download'),
            label2: this.$t('shelf.delete'),
            icon: 'icon-download',
            icon2: 'icon-download-remove'
          }, {
            index: 3,
            label: this.$t('shelf.move'),
            icon: 'icon-move'
          }, {
            index: 4,
            label: this.$t('shelf.remove'),
            icon: 'icon-shelf'
          }
        ]
      },
      isSelected () {
        return this.shelfSelected.length > 0
      }
    },
    methods: {
      createClassAndLabel(item, prop, prop2) {
        if (item.index === 1) {
          return this.isPrivate ? item[prop] : item[prop2]
        } else if (item.index === 2) {
          return this.isCache ? item[prop] : item[prop2]
        } else {
          return item[prop]
        }
      },
      getClass(item) {
        return this.createClassAndLabel(item, 'icon', 'icon2')
      },
      getLabel(item) {
        return this.createClassAndLabel(item, 'label', 'label2')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: px2rem(48);
    width: 100%;
    box-shadow: px2rem(-2) 0 px2rem(2) rgba(0, 0, 0, .3);
    z-index: 300;

    .shelf-footer-tabs-wrapper {
      width: 100%;
      height: 100%;
      display: flex;

      .shelf-footer-tab {
        width: 25%;
        height: 100%;
        @include columnCenter;
        opacity: .5;

        &.is-selected {
          opacity: 1;
        }

        &:last-child {
          color: #ff73a7;
        }

        .tab-icon {
          font-size: px2rem(14);
        }

        .tab-text {
          margin-top: 5px;
          font-size: px2rem(12);
        }
      }
    }
  }
</style>
