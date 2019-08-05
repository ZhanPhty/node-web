<template>
  <div class="global-main">
    <div class="global-main-left"></div>
    <div class="global-main-right">
      <a-back-top>
        <div class="global-main-item"><a-icon type="caret-up" /></div>
      </a-back-top>
      <a href="https://github.com/ZhanPhty" target="_blank" class="global-main-item">
        <a-icon type="github" />
      </a>
    </div>
  </div>
</template>

<style lang="less">
@width: 44px;

.global-main {
  position: fixed;
  bottom: 0;

  .global-main-right {
    position: fixed;
    right: 30px;
    bottom: 40px;
  }

  .global-main-left {
    .global-main-right;
    left: 30px;
    right: initial;
  }

  .ant-back-top {
    position: initial;
    width: @width;
  }

  .global-main-item {
    display: block;
    height: @width;
    width: @width;
    line-height: @width;
    border-radius: @radiusSmall;
    background-color: #fff;
    color: #848fa6;
    text-align: center;
    font-size: 20px;
    margin-top: 10px;
    box-shadow: 0px 1px 2px rgba(26, 26, 26, 0.1);
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
