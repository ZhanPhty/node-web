<template>
  <a-row class="page-container" type="flex" :gutter="40">
    <a-col :span="24">
      <slot name="top"></slot>
    </a-col>
    <a-col class="page-container-main" :xs="24" :sm="24" :md="16" :xl="17">
      <slot name="main"></slot>
    </a-col>
    <a-col class="page-container-aside" :xs="0" :sm="0" :md="8" :xl="7">
      <slot name="aside"></slot>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
.page-container {
  padding-bottom: @gap + 10;

  &-main,
  &-aside {
    padding-top: @gap + 10;
  }
}
</style>
