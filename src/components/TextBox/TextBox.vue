<!--
  = 文字框 =
-->
<template>
  <div
    class="text-box"
    :class="{ 'hide-text-box': snake.hideButton }"
    v-show="show"
    @click="handleClick"
  >
    <HideButton
      :hide="snake.hideButton"
      @on-click="snake.hideButton = !snake.hideButton"
    />
    <span class="text" :class="{ 'text-show': snake.textShow }">{{
      snake.value
    }}</span>
  </div>
</template>

<script>
import { reactive, watch } from "@vue/runtime-core";
import { delay } from "@/utils";
import HideButton from "./HideButton";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
  },
  emits: ["on-click"],
  components: { HideButton },
  setup(props, { emit }) {
    let snake = reactive({
      value: "",
      textShow: false,
      all: false,
      hideButton: false,
    });

    watch(
      () => props.text,
      async () => {
        snake.textShow = false;
        await delay(350);
        snake.value = props.text;
        snake.textShow = true;
      }
    );

    const handleClick = (e) => {
      const ignores = ["hide-button"];
      const className = e.target.className;
      for (let i in ignores) {
        if (new RegExp(ignores[i]).test(className)) {
          return;
        }
      }
      // todo
      emit("on-click");
    };
    return {
      snake,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-box {
  width: 100%;
  height: vw(400);
  position: fixed;
  bottom: 0;
  left: 0;
  border: 1px solid $orange;
  box-sizing: border-box;
  padding: 20px;
  font-size: vw(30);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;
  background: rgba($color: #fff, $alpha: 0.9);
  transition-duration: 250ms;

  > .text {
    display: inline-block;
    opacity: 0;
    transform: translateY(vw(40));
    transition-duration: 250ms;
  }

  > .text-show {
    opacity: 1;
    transform: translateY(0);
  }
}
.hide-text-box {
  bottom: vw(-360);
}
</style>