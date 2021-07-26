<!--
  = 人物立绘 =
-->
<template>
  <div ref="vd" class="vertical-drawing" :class="posClass" v-show="show">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "@vue/runtime-core";
import { createAnimation } from "@/utils/animation";
import vw from "@/rpf/vw";
import vwToPx from "@/rpf/vwToPx";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    initPosition: {
      type: String,
      default: "",
    },
    isTopFloor: {
      type: Boolean,
      default: false,
    },
    behavior: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    let ani = null;
    const posClass = ref("pos-" + props.initPosition);
    const vd = ref(null);
    const adaptation = (data) => vwToPx(vw(data));
    const ignores = ["scale", "rotate"];

    watch(
      () => props.behavior,
      () => {
        console.log("props.behavior", props.behavior);
        if (Array.isArray(props.behavior) && props.behavior.length > 0) {
          props.behavior.forEach((item) => {
            if (Array.isArray(item.data)) {
              let d = item.data;
              if (!ignores.includes(item.name)) {
                d = item.data.map((i) => adaptation(i));
              }
              ani[item.name](...d);
            } else {
              ani[item.name]({ ...item.data });
            }
          });
        }
      }
    );

    onMounted(() => {
      ani = createAnimation({ el: vd.value });
    });
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