<template>
    <div class="content">
      <el-row>
        <el-col :span="12">
          <div class="box">
            <div class="title">
              <div>2019-11-18</div>
              <div>用户</div>
              <div>人数</div>
            </div>
            <div class="overview">
              <div class="ov-img">图片</div>
              <div class="ov-msg">
                <div class="msg-title">标题</div>
                <div class="msg-content">内容</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">123</div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
</script>

<style lang="stylus">
  .content
    width 100%
    height 100%
    background url(img/parkNews_bg.jpg) no-repeat;
    background-size 100% 100%
    .title,.overview
      display flex
    .el-col
      height 175px
      .box
        background #fff
        margin 5px
        border-radius 10px
        height 100%
</style>
