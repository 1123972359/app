<template>
  <Background>
    <transition name="fade" @after-enter="afterEnterVD">
      <VerticalDrawing v-model:show="show.showVD" />
    </transition>
    <transition name="show" @after-enter="afterEnterTB">
      <TextBox v-model:show="show.showTB" :text="conf.text" />
    </transition>
  </Background>
</template>

<script>
import TextBox from "@/components/TextBox/TextBox";
import VerticalDrawing from "@/components/VerticalDrawing";
import Background from "@/components/Background";
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "App",
  components: { TextBox, VerticalDrawing, Background },
  setup() {
    const show = reactive({
      showVD: false,
      showTB: false,
    });

    const conf = reactive({
      text: "",
    });

    onMounted(() => {
      show.showVD = true;
    });

    const afterEnterVD = () => {
      show.showTB = true;
    };

    const afterEnterTB = () => {
      // 文字显示
      conf.text =
        "1234567890-1234567890-1234567890-1234567890-1234567890-1234567890";
      setTimeout(() => {
        conf.text = "123";
      }, 1000);
    };

    return {
      show,
      conf,
      afterEnterVD,
      afterEnterTB,
    };
  },
};
</script>


<style lang="scss" scoped>
</style>