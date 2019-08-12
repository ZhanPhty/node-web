<template>
  <a-row class="page-container" type="flex" :gutter="30">
    <a-col :span="24">
      <slot name="top"></slot>
    </a-col>
    <a-col class="page-container-main" :xs="24" :sm="24" :md="16" :xl="17">
      <slot name="main"></slot>
    </a-col>
    <a-col class="page-container-aside" :xs="0" :sm="0" :md="8" :xl="7">
      <div class="page-container-aside__bg">
        <slot name="aside"></slot>
      </div>
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

  &-aside__bg {
    border-radius: @radiusSmall;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    padding: 20px 24px 10px 24px;
  }
}
</style>
