<!--
  = 人物立绘 =
-->
<template>
  <div
    ref="vd"
    class="vertical-drawing"
    :class="posClass"
    :style="isTopFloor ? 'z-index: 6;' : 'z-index: 5;filter: brightness(0.5);'"
    v-show="show"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref, watch } from "@vue/runtime-core";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "left",
    },
    isTopFloor: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const posClass = ref("pos-" + props.mode);
    const vd = ref(null);
    watch(
      () => props.mode,
      () => {
        posClass.value = "pos-" + props.mode;
      }
    );
    return {
      posClass,
      vd,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./VerticalDrawing.scss";
</style>