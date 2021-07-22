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
.vertical-drawing {
  position: fixed;
  bottom: 0;
  left: vw(80);
  width: 50%;
  height: vw(900);
  background: red;
  z-index: 80;
}
</style>