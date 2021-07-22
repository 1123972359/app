<template>
  <Background>
    <button @click="handleSwitch">切换</button>
    <VerticalDrawing v-model:show="show" />
    <TextBox v-model:show="show" />
  </Background>
</template>

<script>
import TextBox from "@/components/TextBox/TextBox";
import VerticalDrawing from "@/components/VerticalDrawing";
import Background from "@/components/Background";
import { ref } from "@vue/reactivity";
export default {
  name: "App",
  components: { TextBox, VerticalDrawing, Background },
  setup() {
    const show = ref(true);
    const handleSwitch = () => {
      show.value = !show.value;
    };
    return {
      show,
      handleSwitch,
    };
  },
};
</script>


<style lang="scss" scoped>
</style>