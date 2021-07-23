<template>
  <Background>
    <template v-if="false">
      <VerticalDrawingGroup v-model:main="conf.main">
        <transition name="fade-right">
          <VerticalDrawing v-model:show="show.showVD" />
        </transition>
      </VerticalDrawingGroup>
    </template>
    <transition name="show">
      <TextBox
        v-model:show="show.showTB"
        :text="conf.text"
        @on-click="handleNextClick"
      />
    </transition>
  </Background>
</template>

<script>
import TextBox from "@/components/TextBox/TextBox";
import VerticalDrawing from "@/components/VerticalDrawing/VerticalDrawing";
import VerticalDrawingGroup from "@/components/VerticalDrawing/VerticalDrawingGroup";
import Background from "@/components/Background";
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { processData, processIndex, setProcessIndex } from "@/mock";
import { useRouter } from "vue-router";
import { delay } from "@/utils";
import getQuery from "@/rpf/getQuery";
const query = getQuery();
export default {
  name: "App",
  components: { TextBox, VerticalDrawingGroup, VerticalDrawing, Background },
  setup() {
    let linesIndex = 0;
    const router = useRouter();
    const data = processData?.process[processIndex];
    const linesLength = data.lines.length;
    const show = reactive({
      showVD: false,
      showTB: false,
    });

    const conf = reactive({
      text: "",
      position: "left",
      main: "1",
    });

    const changeLines = async (text) => {
      conf.text = text;
      linesIndex++;
    };

    const handleNextClick = () => {
      if (linesIndex === linesLength) {
        console.log("完。结束场景");
        setProcessIndex(processIndex + 1);
        router.push("/loading");
        return;
      }
      changeLines(data?.lines[linesIndex]?.text);
    };

    onMounted(async () => {
      await delay(350);
      show.showVD = true;
      show.showTB = true;

      if (query.p) {
        processIndex = query.p;
      }
      changeLines(data?.lines[0]?.text);
    });

    return {
      show,
      conf,
      handleNextClick,
    };
  },
};
</script>


<style lang="scss" scoped>
</style>