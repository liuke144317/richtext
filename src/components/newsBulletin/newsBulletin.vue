<template>
    <div class="content">
      <el-row class="header">
        <el-col class="hd-title" :span="12">政策服务</el-col>
        <el-col class="hd-add" :span="12"><i class="iconfont icon-tianjia" @click="addCol" title="添加"></i></el-col>
        <!-- <el-button >添加</el-button> -->
      </el-row>
      <el-row>
        <el-col :span="12" v-for="(item,index) in formatListData" :key="index">
          <div class="box">
            <div class="title">
              <div><i class="iconfont icon-zhong"></i><span>{{item.tTime}}</span></div>
              <div><i class="iconfont icon-yonghu"></i><span>{{item.sWriter}}</span></div>
              <div><i class="iconfont icon-ai-eye"></i><span>9</span></div>
              <div style="position:absolute;right:35px"><i class="iconfont icon-ico_compile" title="编辑" @click.stop="editCol(item)"></i></div>
              <div style="position: absolute;right: 10px;"><i class="iconfont icon-shanchu" style="font-size: 20px;" title="删除" @click.stop="(dialogVisible=true)&&(deleteId=item.sNewsID)&&(deleteTitle=item.sTitle)"></i></div>
            </div>
            <div class="overview" @click="getInfoDetail(item.sNewsID)">
                <div class="ov-img">
                   <el-image
                  style="width: 100%; height: 100%"
                  :src="item.sCoverPicUrl"></el-image>
                </div>
                <div class="ov-msg">
                  <div class="msg-title">{{item.sTitle}}</div>
                  <div class="msg-content">{{item.sCoverRemark}}</div>
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
        >
        <span>确认删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteCol">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  // import {Row,Col,Pagination} from 'element-ui';
  import { Message  } from 'element-ui';
  export default {
    data(){
      return{
        deleteId:'',
        deleteTitle:'',
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
      this.$post(this.apis.yqcynews_list,data)
      .then((res)=>{
        this.listData = res.page.list;
        this.page.totalCount = res.page.totalCount;
        this.page.pageSize = res.page.pageSize;
      })
      .catch((err)=>{
        this.listData = [{tTime:'1498627266000',sWriter:'lk',sTitle:'hello',txtContent:'hellohellohellohello'}]
        console.log('err',err);
      })

    },
    methods:{
      getTime(millisecond){
        if(millisecond){
          let oDate = new Date(millisecond*1),
           oYear = oDate.getFullYear(),
           oMonth = oDate.getMonth()+1,
           oDay = oDate.getDate(),
           time = oYear+'-'+oMonth+'-'+oDay
           return time
        }else{
          return ''
        }
      },
      /* 新增一条数据*/
      addCol(){
        this.$router.push({path:'/publication_add'})
      },
       /* 编辑当前数据*/
      editCol(item){
        this.$router.push({path:'/publication_modifier', query: {data:item}})
      },
      /* 调用接口删除当前数据*/
      deleteCol(){
        const option1 = {
          type:'success',
          message:'移除成功！',
          showClose:true,
          duration:0
        }
        const option2 = {
          type:'error',
          message:'移除失败！',
          showClose:true,
          duration:0
        }
        this.dialogVisible = false;
        let param = {sTitle:this.deleteTitle}
        this.$post(this.apis.yqcynews_delete+this.deleteId,param)
        .then((res)=>{
          //提示消息
          Message (option1)
          //移除当前节点
          this.listData.splice(this.listData.findIndex((item)=>item.sNewsID===this.deleteId),1)
          console.log('delete success')
        })
        .catch((err)=>{
          //提示消息
          Message (option2)
          console.log('delete failed')
        })
      },
      /* 查看新闻详情*/
      getInfoDetail(id){
        this.$router.push({path:'/newsBulletinDetail', query: {sNewsID:id}})
      }
    }
  }
</script>

<style lang="stylus" scoped="scoped">
  .content
    width 100%
    height 100%
    // background url(img/parkNews_bg.jpg) no-repeat;
    background-color rgb(240,242,245)
    background-size cover
    background-position 50%
    color: #999;
    font-size 13px
    overflow auto;
    .header
      background #0c4b8e
      padding 0 15px!important
      margin-bottom 5px
      .hd-title
        text-align left
        font-size 16px
        height 40px
        line-height 40px
        color: #fff
        font-weight: 800
        padding 0
      .hd-add
        text-align right
        height 40px
        line-height 40px
        padding 0
        color: #fff
        font-size 19px
      .hd-add>i:hover
        cursor pointer
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
      overflow hidden
    .overview:hover
      background #F2F2F2
      cursor pointer
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
        overflow hidden
        box-shadow 1px 3px 5px 0 #ddd
    .el-pagination
      margin 5px 0 10px 0
</style>
