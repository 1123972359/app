<template>
  <span ref="anRef" class="animation" @click="handleClick">animation</span>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { createAnimation } from "@/utils/animation";
export default {
  setup() {
    const anRef = ref(null);

    onMounted(async () => {
      const an = createAnimation({ el: anRef.value, duration: 1000 });
      an.move(100, 400).step().filter("contrast", 0.5).step().filter("contrast", 1).step();
    });

    const handleClick = () => {
      console.log(123);
    };

    return {
      anRef,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.animation {
  padding: 30px;
  background: $orange;
  position: absolute;
  display: inline-block;
}
</style>