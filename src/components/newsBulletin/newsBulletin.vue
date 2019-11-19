<template>
    <div class="content">
      <el-row>
        <el-col :span="12" v-for="(item,index) in formatListData" :key="index">
          <div class="box">
            <div class="title">
              <div><i class="iconfont icon-zhong"></i><span>{{item.tTime}}</span></div>
              <div><i class="iconfont icon-yonghu"></i><span>{{item.sWriter}}</span></div>
              <div><i class="iconfont icon-ai-eye"></i><span>9</span></div>
              <div style="position:absolute;right:35px"><i class="iconfont icon-ico_compile" title="修改" @click="editCol"></i></div>
              <div style="position: absolute;right: 10px;"><i class="iconfont icon-shanchu" style="font-size: 20px;" title="删除" @click="dialogVisible = true"></i></div>
            </div>
            <div class="overview">
              <div class="ov-img">图片</div>
              <div class="ov-msg">
                <div class="msg-title">{{item.sTitle}}</div>
                <div class="msg-content">{{item.txtContent}}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-pagination v-if="page.totalCount!=0"
          background
          layout="prev, pager, next"
          :size="page.pageSize"
          :total="page.totalCount">
        </el-pagination>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确认删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  // import {Row,Col,Pagination} from 'element-ui';
  export default {
    data(){
      return{
        dialogVisible:false,
        listData:[],
        page:{
          totalCount:0,
          pageSize:0
        }
      }
    },
    /* components:{
      'el-row':Row,
      'el-col':Col,
      'el-pagination':Pagination
    }, */
    computed:{
      formatListData(){
          this.listData.forEach((item,index)=>{
            this.listData[index].tTime = this.getTime(item.tTime)
          })
          return this.listData;
      }
    },
    created(){
      let data = {
        	"sTitle":"",
        	"sWriter":""
      };
      /* 请求分页列表数据*/
      this.$post('/api/news/yqcynews/list',data)
      .then((res)=>{
        console.log('res',res);
        this.listData = res.page.list;
        this.page.totalCount = res.page.totalCount;
        this.page.pageSize = res.page.pageSize;
      })
      .catch((err)=>{
        console.log('err',err);
      })

    },
    methods:{
      getTime(millisecond){
        if(millisecond){
          var oDate = new Date(millisecond*1),
           oYear = oDate.getFullYear(),
           oMonth = oDate.getMonth()+1,
           oDay = oDate.getDate(),
           time = oYear+'-'+oMonth+'-'+oDay
           return time
        }else{
          return ''
        }
      },
      editCol(){
        
      },
      /* 调用接口删除当前数据*/
      deleteCol(id){
        /* this.$post('/api/news/yqcynews/delete/0001',id)
        .then((res)=>{

        })
        .catch((err)=>{

        }) */
      }
    }
  }
</script>

<style lang="stylus">
  .content
    width 100%
    height 100%
    background url(img/parkNews_bg.jpg) no-repeat;
    background-size 100% 100%
    color: #999;
    font-size 13px
    overflow auto;
    .title,.overview
      display flex
      padding 0 15px
    .title
      position relative
      height 33px
      line-height 33px
      border-bottom 1px solid #eee
    .title>div+div
      margin-left 10px
      .icon-ico_compile,.icon-shanchu
        cursor:pointer;
    & .icon-zhong
      font-size 14px
    & .icon-yonghu
      font-size 12px
    & .icon-ai-eye
      font-size 12px
    .overview
      height 130px
     & .ov-img
      flex-shrink: 0
      height: 100px
      width: 145px
      background: rosybrown
      margin: auto 0px
     & .ov-msg
      display: flex
      flex-direction: column
      flex-grow: 1
      overflow: hidden
      height: 100px
      margin: auto 10px
      text-align left
      .msg-title
        font-size 18px
        font-weight 800
        color rgb(53,123,183)
        margin-bottom 10px
      .msg-content
        flex-grow 1
        overflow: hidden
    .el-row
      padding 0 5%
    .el-col
      padding 5px
      .box
        background #fff
        border-radius 10px
        height 100%
    .el-pagination
      margin 5px 0 10px 0
</style>
