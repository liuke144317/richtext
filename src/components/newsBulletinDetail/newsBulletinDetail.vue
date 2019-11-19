<template>
  <div class="content">
    <div class="c-header">
      <div class="hd-left">新闻公告</div>
      <div class="hd-right">
      <el-button size="small">返回列表</el-button>
      </div>
    </div>
    <div class="c-body">
      <div class="bd-titile">标题</div>
      <div class="bd-description">
        <div><span>发布人：xuyao</span></div>
        <div><span>时间：2019-09-12</span></div>
      </div>
      <div class="bd-body">内容</div>
    </div>
    <div class="c-footer">
      <el-button size="small">上一篇</el-button>
      <el-button size="small">下一篇</el-button>
    </div>
  </div>
</template>

<script>
</script>

<style lang="stylus">
  .content
    width 100%
    height 100%
    background-size 100% 100%
    color: #999;
    font-size 13px
    overflow auto;
    padding 0 30px
    box-sizing border-box
    .c-header
      margin-top 30px
      height: 32px;
      line-height: 32px;
      padding: 10px 0;
      border-bottom: 1px rgb(240,240,240) solid;
    .c-header:after
      content ''
      display inline-block
      clear both
    .hd-left
      float left
      font-size 18px
      font-weight 800
      color rgb(47,53,59)
    .hd-right
      float right
    & .el-button
      color: rgb(233,95,104);
      border: 1px solid rgb(233,95,104);
    .c-body
      margin 50px 0
      border-bottom 1px rgb(240,240,240) dashed
      .bd-titile
        font-size 19px
        font-weight 800
        color rgb(47,53,59)
      .bd-description
        margin-top 20px
        margin-bottom 10px
        display flex
        justify-content center
      .bd-description>div+div
        margin-left 10px
      .bd-body
        margin-bottom 20px
    .c-footer .el-button
       color #FFF
       background rgb(208,84,84)
       // background rgb(255,144,144)
</style>
