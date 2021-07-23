<template>
  <div class="vertical-drawing-group"><slot></slot></div>
</template>

<script>
export default {
  props: {
    main: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./VerticalDrawing.scss";
</style>