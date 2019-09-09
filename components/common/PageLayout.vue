<template>
  <a-row class="page-container" type="flex" :gutter="30">
    <a-col :span="24">
      <slot name="top"></slot>
    </a-col>
    <a-col
      class="page-container-main"
      :xs="24"
      :sm="24"
      :md="$slots.aside ? 16 : 24"
      :xl="$slots.aside ? 17 : 24"
    >
      <slot name="main"></slot>
    </a-col>
    <a-col class="page-container-aside" :xs="0" :sm="0" :md="8" :xl="7" v-if="$slots.aside">
      <a-affix :offsetTop="80" v-if="asideAffix">
        <div class="page-container-aside__bg">
          <slot name="aside"></slot>
        </div>
      </a-affix>
      <div v-else class="page-container-aside__bg">
        <slot name="aside"></slot>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    asideAffix: [Boolean]
  }
}
</script>

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
