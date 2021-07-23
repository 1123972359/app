<template>
  <div
    class="hide-button"
    :class="{ 'hide-button-click': hide }"
    @click="$emit('on-click')"
  ></div>
</template>

<script>
export default {
  props: {
    hide: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["on-click"],
};
</script>

<style lang="scss" scoped>
.hide-button {
  position: absolute;
  top: 0;
  right: 0;
  width: vw(100);
  height: vw(40);
  line-height: vw(40);
  background: $orange;
  text-align: center;
  color: #fff;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: ">";
    width: inherit;
    height: inherit;
    display: inline-block;
    transition-duration: 250ms;
    transform: rotateZ(90deg);
  }
}

.hide-button-click {
  top: vw(0);

  &::before {
    transform: rotateZ(-90deg);
  }
}
</style>