<template>
  <div class="content">
    <div class="c-header">
      <div class="hd-left">新闻公告添加</div>
      <div class="hd-right">
      <el-button size="small" @click="back">返回发布列表</el-button>
      </div>
    </div>
    <div class="c-body">
      <el-form label-width="80px" size="small" :model="form" :rules="rules" ref="form">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="sTitle">
                <el-input v-model="form.sTitle"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="标题">
                <el-input v-model="form.sTitle"></el-input>
            </el-form-item>
          </el-col> -->
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
              action="1"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="uploadImg"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" height="125px" width="166px">
              <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              <img v-else src="./img/upload.png" class="avatar" height="125px" width="166px">
            </el-upload>
            <!-- <img src="./img/upload.png" alt="选择上传图片" height="125px"> -->
            <el-form-item prop="" class="mstyle">
              <el-input type="textarea" resize='none' v-model="form.sCoverRemark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="display: flex;">
          <span style="width: 145px">正文内容</span>
          <div>
            <!--<div ref="editor" style="text-align:left"></div>-->
            <quill-editor
              v-model="editorContent"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)">
            </quill-editor>
          </div>
          </el-col>

        </el-row>
      </el-form>
    </div>
    <div class="c-footer">
      <el-button size="small" @click="save('form')">保存</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </div>
    <el-upload
       id="upload-quill"
       action="2"
      :http-request="uploadImg">
      <el-button size="small" type="primary"></el-button>
    </el-upload>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认退出当前操作？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogHandle">取 消</el-button>
        <el-button type="primary" @click="dialogHandle('confirm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import Video from '@@/js/config/video';
  Quill.register(Video, true);  // 注册video
  import { Loading,Message } from 'element-ui';
  import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
  import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
  //import 'quill/dist/quill.core.css'
  //import 'quill/dist/quill.bubble.css'
  import * as Quill from 'quill'; // 富文本基于quill
  export default {
    name: 'editor',
    components: { quillEditor },
    data() {
      return {
        //confirm
        dialogVisible:false,
        //校验规则
        rules:{
          sTitle:[
            { required: true, message: '请输入标题', trigger: 'blur' }
            ]
        },
        editor: null,   // 富文本编辑器对象
        editorContent: '',
        editorOption: { //  富文本编辑器配置
          modules: {
            toolbar: {
              container:[//重写quill工具栏
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['image', 'video']
              ],
              handlers: {//重写quill工具栏默认方法
                image: function image(){
                  console.log('上传图片')
                  document.querySelector('#upload-quill button').click()
                },
                video: function video(){
                  console.log('上传视频')
                  document.querySelector('#upload-quill button').click()
                },
              }
            }
          },
          theme: 'snow',
          placeholder: '请输入正文'
        },
        imageUrl:'',
        form:{
          "sNewsID":"",
          "sTitle":"",
          "txtContent":"",
          "dCreatetime":"2019-11-18 10:56:59",
          "sStatus":"已发布",
          "dStartTime":"2019-11-18",
          "dEndTime":"2019-12-18",
          "sUserLoginID":"C0R8U-1Z01-0042-0004",
          "sWriter":"测试",
          "sIssueScope":"全部",
          "sScopeStaff":"",
          "sScopeCustomer":"",
          "iOrder":"1",
          "sCategoryID":"2",
          "sCoverRemark":"测试",
          "sCoverPicUrl":"../psm_memory_service/picture/fore-end/parkNews/C0R9M-1U8H-009Y-0002.jpg",
          "tTime":"2019-11-18 11:56:59"
        }
      };
    },
    methods:{
      /* 重写elementui文件上传方法*/
      uploadImg(fileObj) {
        const loading = Loading.service({ fullscreen: true });
        const option = {
          type:'error',
          message:'插入失败！',
          showClose:true,
          duration:0
        }
       console.log('URL.createObjectURL(file.raw);',URL.createObjectURL(fileObj.file));
       let formData = new FormData();
       /*读取文件base64*/
       let reader = new FileReader();
       let _this = this;
       reader.onload = function(event) {
         if(fileObj.action === '1'){
           _this.imageUrl = event.target.result;
         }
         formData.set("file", fileObj.file);
         formData.set("token", 'e6fde487482ac455b8605d8e6998f02f');
         formData.set("url", '');
         _this.$post(_this.apis.yqcynews_upload, formData, {
           headers: {
             "Content-type": "multipart/form-data"
           }
         }).then((res)=>{
           //判断是否为富文本编辑器中的文件添加
            if(fileObj.action === '2'){//富文本编辑器
              //插入媒体节点到富文本编辑器
              let fileType = fileObj.file.type,domType = 'image'
              // const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
              if(fileType==='image/jpeg'||fileType==='image/png'){
                domType = 'image'
              }else if(fileType==='video/mp4'){
                domType = 'video'
              }
              _this.editor.insertEmbed(_this.editor.selection.savedRange.index, domType,res.url);  // 这个方法用来手动插入dom到编辑器里
              _this.editor.setSelection(_this.editor.selection.savedRange.index + 1);
            }else{
              if(res.code=='0'||res.msg=='success'){
                _this.form.sCoverPicUrl =res.url
              }
            }
           loading.close()
         }).catch((err)=>{
           Message(option)
           loading.close()
           //todo 测试加了下面的代码，请求能连通时去掉
            console.log('文件上传失败');
           let fileType = fileObj.file.type,domType = 'image'
           // const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
           if(fileType==='image/jpeg'||fileType==='image/png'){
             domType = 'image'
           }else if(fileType==='video/mp4'){
             domType = 'video'
           }
           _this.editor.insertEmbed(_this.editor.selection.savedRange.index, domType, 'data:image/jpeg;base64,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');  // 这个方法用来手动插入dom到编辑器里
           _this.editor.setSelection(_this.editor.selection.savedRange.index + 1);
         });

       }
       reader.onerror = function(event) {
        console.log('解析失败');
       }
       if(fileObj.file){
        reader.readAsDataURL(fileObj.file,"UTF-8");
       }
      },
      //内容改变事件-获取富文本框内容
      onEditorChange(content) {
        this.form.txtContent = content.html
      },
      /* 返回上一页*/
      back(){
        this.$router.go(-1)
      },
      /*文件上传成功时调用*/
      handleAvatarSuccess(res, file) {
        this.form.sCoverPicUrl = URL.createObjectURL(file.raw);
      },
      /*文件上传前时调用*/
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
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
      save(formName){
        this.$refs[formName].validate((valid)=>{
          if (valid) {
            const loading = Loading.service({ fullscreen: true });
            const option1 = {
              type:'success',
              message:'保存成功！',
              showClose:true,
              duration:0
            }
            const option2 = {
              type:'error',
              message:'保存失败！',
              showClose:true,
              duration:0
            }
            // this.form.txtContent = this.editorContent
            this.$post(this.apis.yqcynews_save,this.form)
              .then((res)=>{
                loading.close()
                Message(option1)
              }).catch((err)=>{
              loading.close()
              Message(option2)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })

      },
      cancel(){
        this.dialogVisible = true;
      },
      dialogHandle(type){
        this.dialogVisible = false
        if(type === 'confirm'){
          this.$router.go(-1)
        }
      }
    },
    created(){
      const time = this.$common_function.getCurrentTime();
      console.log('time',time)
    },
    mounted() {

      this.editor = this.$refs.myQuillEditor.quill;
      this.editor.container.style.height = `${400}px`
    },
    beforeDestroy() {
      this.editor = null;
      delete this.editor;
    }
  }
</script>

<style lang="stylus"  scoped="scoped">
  .content>>>#upload-quill
    display none
  .content
    min-width: 820px
    width 100%
    height 100%
    background-size 100% 100%
    color: #999
    font-size 13px
    overflow auto
    padding 0 30px
    box-sizing border-box
    .c-header
      margin-top 30px
      height 32px
      line-height 32px
      padding 10px 0
      border-bottom 1px rgb(240,240,240) solid
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
        color rgb(45,137,247)
        border 1px solid rgb(45,137,247)
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
       background rgb(45,137,247)
       // background rgb(255,144,144)
</style>
