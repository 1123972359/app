<template>
  <div class="bg">
    <div class="loading-center">{{ loadNum }}<span>%</span></div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { delay } from "@/utils";
export default {
  setup() {
    const router = useRouter();
    // todo 加载网络图片资源
    const arr = [
      "https://img2.baidu.com/it/u=1528104381,1863952409&fm=26&fmt=auto&gp=0.jpg",
      "https://img2.baidu.com/it/u=716413230,1630134482&fm=26&fmt=auto&gp=0.jpg",
      "https://img0.baidu.com/it/u=1996285707,1274078967&fm=26&fmt=auto&gp=0.jpg",
    ];

    const loadNum = ref(0);
    const steps = Math.ceil(100 / arr.length);

    const addSteps = () => {
      const num = loadNum.value + steps;
      loadNum.value = num > 100 ? 100 : num;
      if (loadNum.value >= 100) {
        console.log("加载完成");
        router.push("/game");
      }
    };

    const loadImg = (src) =>
      new Promise((resolve) => {
        const img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
      });

    const load = async () => {
      await delay(500);
      arr.forEach(async (item) => {
        await loadImg(item);
        addSteps();
      });
    };

    load();

    return {
      loadNum,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-center {
    font-size: vw(100);
    text-align: center;
    color: $pink;

    > span {
      font-size: vw(50);
    }
  }
}
</style>