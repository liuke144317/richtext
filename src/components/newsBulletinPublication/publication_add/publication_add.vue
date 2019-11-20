<template>
  <div class="content">
    <div class="c-header">
      <div class="hd-left">新闻公告编辑</div>
      <div class="hd-right">
      <el-button size="small" @click="back">我的发布</el-button>
      </div>
    </div>
    <div class="c-body">
      <el-form label-width="80px" size="small" v-model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题">
                <el-input v-model="form.sTitle"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="类别" v-model="form.sCategoryID">
                <el-input></el-input>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item label="发布-员工部门">
                <el-radio-group>
                  <el-radio label="全部员工"></el-radio>
                  <el-radio label="勾选员工"></el-radio>
                  <el-radio label="无"></el-radio>
                </el-radio-group>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布-客户">
              <el-radio-group>
                <el-radio label="全部客户"></el-radio>
                <el-radio label="勾选客户"></el-radio>
                <el-radio label="无"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24" style="display: flex;margin-bottom: 18px;">
            <span>封面摘要</span>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img src="./img/upload.png" class="avatar" height="125px" width="166px">
            </el-upload>
            <!-- <img src="./img/upload.png" alt="选择上传图片" height="125px"> -->
            <el-form-item prop="" class="mstyle">
              <el-input type="textarea" resize='none' v-model="form.sCoverRemark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="display: flex;">
          <span>正文内容</span>
          <div>
            <div ref="editor" style="text-align:left"></div>
          </div>
          </el-col>

        </el-row>
      </el-form>
    </div>
    <div class="c-footer">
      <el-button size="small" @click="save">保存</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'editor',
    components: {
    },
    data() {
      return {
        editorContent: '',
        form:{
          sTitle:'',
          sCategoryID:'',
          txtContent:'',
          sCoverRemark:'',
          sCoverPicUrl:''
        }
      };
    },
    methods:{
      /* 获取富文本框内容*/
      getContent() {
        this.form.txtContent = this.editorContent
      },
      /* 返回上一页*/
      back(){
        this.$router.go(-1)
      },
      handleAvatarSuccess(res, file) {
        console.log('res',res);
        console.log('file',file);
        this.form.sCoverPicUrl = URL.createObjectURL(file.raw);
        console.log('this.form.sCoverPicUrl',this.form.sCoverPicUrl);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/png'||'image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          alert('只能上传图片!');
          // this.$message.error('只能上传图片!');
        }
        if (!isLt2M) {
          alert('上传图片大小不能超过 2MB!!');
          // this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      save(){
        this.form.txtContent = this.editorContent
        console.log('this.form',this.form);
        // this.getContent()
      }
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    }
  }
</script>

<style lang="stylus"  scoped="scoped">
  .content
    min-width: 820px;
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
      width: 760px;
      margin: 50px auto;
      .el-form
        text-align left
      .el-form >>> .el-textarea__inner
        width: 100%;
        margin: 0;
        height: 125px;
      .el-form >>> .el-radio
        margin-right: 10px;
      .el-form >>> .el-form-item__label,.el-form >>> .el-radio__label
        font-size 12px
      .el-form >>> .el-form-item__label
        width 90px!important
      .el-form >>> .el-form-item__content
        margin-left 90px!important
      .el-form >>> .el-col>span:first-child
        width 90px
        text-align right
        box-sizing border-box
        padding-right 15px
        font-size 12px
        color: #606266;
      .mstyle >>> .el-form-item__content
        margin-left 10px!important
      & .mstyle
        flex-grow 1
        margin-bottom 0
      & .mstyle > div:first-child
        margin-left 10px!important
    .c-footer .el-button:first-child
       color #FFF
       background rgb(208,84,84)
       // background rgb(255,144,144)
</style>
