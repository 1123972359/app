<template>
  <span ref="anRef" class="animation" @click="handleClick">animation</span>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { createAnimation } from "@/utils/animation";
// import { delay } from "@/utils";
export default {
  setup() {
    const anRef = ref(null);

    onMounted(async () => {
      const an = createAnimation({ el: anRef.value, duration: 250 });
      an.move(100, 400)
        .step({
          times: 300,
          callback: () => {
            console.log("end 1");
          },
        })
        .rotate(120)
        .step();
      an.scale(2).step({
        callback: () => {
          console.log("end 3");
        },
      });
      //   await delay(1000);
      //   an.rotate(45).step();
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