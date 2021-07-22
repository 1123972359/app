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
    <div
      class="hide-button"
      :class="{ 'hide-button-click': snake.hideButton }"
      @click="snake.hideButton = !snake.hideButton"
    ></div>
    <span class="text" :class="{ 'text-show': snake.textShow }">{{
      snake.value
    }}</span>
  </div>
</template>

<script>
import { reactive, watch } from "@vue/runtime-core";
import { delay } from "@/utils";
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
  setup(props) {
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
        await delay(() => {
          snake.value = props.text;
          snake.textShow = true;
        });
      }
    );

    const handleClick = () => {};
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

  > .hide-button {
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

  > .hide-button-click {
    top: vw(0);

    &::before {
      transform: rotateZ(-90deg);
    }
  }
}
.hide-text-box {
  bottom: vw(-360);
}
</style>