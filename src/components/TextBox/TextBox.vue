<!--
  = 文字框 =
-->
<template>
  <transition name="show">
    <div class="text-box" v-show="show">123123</div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.text-box {
  width: 100%;
  height: vw(400);
  position: fixed;
  bottom: 0;
  left: 0;
  border: 2px solid silver;
  box-sizing: border-box;
  padding: 20px;
  font-size: vw(30);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;
  background: rgba($color: #fff, $alpha: 0.9);
}
</style>