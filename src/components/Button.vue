<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.button {
  padding: vw(16) vw(48);
  margin: vw(20);
  font-size: vw(36);
  color: #fff;
  text-align: center;
  background: $blue;
  cursor: pointer;
  border-radius: vw(16);
  letter-spacing: 2px;
  user-select: none;
  position: relative;
  transition-duration: 130ms;
  &:active {
    box-shadow: 0px 0px 40px 2px #c6e2ff;
  }
}
</style>