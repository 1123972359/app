<!--
  = 游戏页面 =
    - 背景层
    - 立绘层
    - 文字框
-->
<template>
  <Background>
    <VerticalDrawingGroup v-show="show.showVD">
      <template v-for="item in VDConf" :key="item.roleId">
        <VerticalDrawing
          :show="item.appearance"
          :initPosition="item.roleInitPosition"
          :behavior="item.behavior"
          :isTopFloor="TBConf.speakingRoleId === item.roleId"
        />
      </template>
    </VerticalDrawingGroup>
    <transition name="show">
      <TextBox
        :show="show.showTB"
        :text="TBConf.text"
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
    const data = processData?.process[processIndex]; // 当前进度的舞台的数据
    const linesLength = data.lines.length;

    // 控制
    const show = reactive({
      showVD: false,
      showTB: false,
    });

    // VerticalDrawing的数据
    const VDConf = reactive({ ...data.role });

    // TextBox的数据
    const TBConf = reactive({
      text: "",
      speakingRoleId: "",
    });

    const changeLines = (line) => {
      // 改变立绘
      VDConf[line.roleId] = {
        ...VDConf[line.roleId],
        appearance: line.appearance,
        behavior: line.behavior,
      };
      // 新的对话
      TBConf.text = line.text;
      TBConf.speakingRoleId = line.roleId;
      linesIndex++;
    };

    const handleNextClick = () => {
      if (linesIndex === linesLength) {
        console.log("完。结束场景");
        setProcessIndex(processIndex + 1);
        router.push("/loading");
        return;
      }
      changeLines(data?.lines[linesIndex]);
    };

    onMounted(async () => {
      await delay(350);
      // 控制立绘
      show.showVD = data.showVD;
      // 控制文字框
      show.showTB = data.showTB;

      if (query.p) {
        processIndex = query.p;
      }
      changeLines(data?.lines[0]);
    });

    return {
      show,
      VDConf,
      TBConf,
      handleNextClick,
    };
  },
};
</script>


<style lang="scss" scoped>
</style>