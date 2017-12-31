<template>
  <div class="loading">
    <img src="./loading.gif" alt="加载中" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>
<style lang="scss">
@import 'src/common/scss/variable';
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>
