<template>
  <div class="bg">
    <div class="start">
      <Button @click="handleStart('/game')">开始游戏</Button>
      <Button @click="handleStart('/loading')">加载页</Button>
      <Button @click="handleStart('/animation')">动画页</Button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Button from "@/components/Button";
export default {
  components: {
    Button,
  },
  setup() {
    const router = useRouter();
    const handleStart = (path) => {
      router.push(path);
    };
    return {
      handleStart,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>