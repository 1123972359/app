<!--
  = 人物立绘 =
-->
<template>
  <div ref="vd" class="vertical-drawing" v-show="show">
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
    const vd = ref(null);
    const adaptation = (data) => vwToPx(vw(data));
    const ignoresAdaptation = ["scale", "rotate"];
    const clientHeight = document.documentElement.clientHeight;
    const getTopToBottom = () => clientHeight - vd.value.offsetHeight;

    watch(
      () => props.isTopFloor,
      () => {
        if (props.isTopFloor) {
          vd.value.style.zIndex = "6";
          ani.filter("brightness", 1).step({ duration: 250 });
        } else {
          vd.value.style.zIndex = "5";
          ani.filter("brightness", 0.5).step({ duration: 250 });
        }
      }
    );

    watch(
      () => props.behavior,
      () => {
        if (Array.isArray(props.behavior) && props.behavior.length > 0) {
          props.behavior.forEach((item) => {
            if (item.name === "bottom") {
              ani.top(getTopToBottom()).step({ duration: item.data.duration });
            } else if (Array.isArray(item.data)) {
              let d = item.data;
              if (!ignoresAdaptation.includes(item.name)) {
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
      if (typeof props.initPosition === "string") {
        vd.value.classList.add("pos-" + props.initPosition);
      } else {
        console.log(props.initPosition, adaptation(props.initPosition));
        vd.value.style.left = adaptation(props.initPosition) + "px";
      }
    });
    return {
      vd,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./VerticalDrawing.scss";
</style>