<!--
  = 背景图 =
-->
<template>
  <div class="background"><slot></slot></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  background: cornflowerblue;
  z-index: 1;
}
</style>