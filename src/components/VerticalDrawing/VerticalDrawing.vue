<!--
  = 人物立绘 =
-->
<template>
  <div class="vertical-drawing" v-show="show">1</div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./VerticalDrawing.scss";
</style>