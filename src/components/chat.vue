<template>
  <div class="chat-box" v-cloak>
      <div class="chat-item clearfix" v-for="comList in commentList">
        <img :src="comList.userAvatar" class="chat-person-img">
        <div class="chat-content">
          <div class="chat-content-header">
            <span class="chat-person-name">{{comList.nickName}}</span>
            <span class="chat-time">{{comList.howLong}}</span>
            <div class="chat-text">{{comList.scComment}}</div>
          </div>
        </div>
      </div>
      <div class="blank" v-show="isBlank">
        <img src="../assets/images/white.png">
        <p>还没有人发表评论</p>
        <p>快去下载APP，做第一个发言人</p>
      </div>
      <div class="report-all" v-if="isShowAll">
        已加载全部
      </div>
      <footers v-show="footerShow"></footers>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Footer from './Footer.vue'
export default {
  data(){
    return {
      commentList:[],
      footerShow:true,
      isShowAll:false,
      isBlank:false,
      page:1,
    }
  },
  components:{
    footers:Footer,

  },
  mounted(){
    this.getCommentList();
    var _this=this;

    function scroll(){
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      var documentHeight=document.documentElement.offsetHeight;
      var screenHeight=window.screen.height;
      // console.log(scrollTop+screenHeight)
      if(scrollTop+screenHeight>=documentHeight){
        _this.footerShow=false;
        if(_this.isShowAll!=true){
          _this.getCommentList();
        }
        setTimeout(function(){
          _this.footerShow=true;
        },4000)
        // _this.commentList=_this.commentList.concat(chatList);
      }else{
        _this.footerShow=true;
      }
    }
    window.addEventListener('scroll',scroll);
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll',scroll);
    next();
  },
  methods:{
    getCommentList(){
      var _this=this;
      if(this.$route.params.id!=undefined){
        axios.post('shareSceneComment.do',qs.stringify({shareId:this.$route.params.id,pageNum:this.page
          })).then(function(res){
          if(_this.page==1){
            if(res.data.length==0){
              _this.isBlank=true;
              _this.footerShow=true;
              return;
            }
            if(res.data.length<10){
              _this.isShowAll=true;
              _this.footerShow=true;
              _this.commentList=_this.commentList.concat(res.data);
              return;
            }
          }
          if(res.data.length==0){
            _this.isShowAll=true;
            return;
          }else{
            _this.commentList=_this.commentList.concat(res.data);
            _this.page++;
          }
        })
      }else{
        return;
      }
    }
  }
}
</script>

<style lang="css">
.blank img{
  display: block;
  margin: 0 auto;
  width: 1rem;
  height: 1rem;
}
.blank p{
  color: #a4a4a4;
  text-align: center;
}
.blank{
  position: absolute;
  left: 50%;
  top: 1.5rem;
  -webkit-transform:translate(-50%,-50%);
}
.chat-box{
  position: relative;
  font-size: 0.14rem;
  background: #f0f0f0;
  margin-top: 0.03rem;
  padding: 0.1rem 0;
}
.chat-person-img{
  width: 0.2rem;
  float: left;
  border-radius: 50%;
}
.chat-item{
  margin: 0.1rem 0.16rem;
}
.chat-person-name{
  color: #0f3781;
}
.chat-content{
  float: left;
  margin-left: 0.1rem;
  background: #fff;
  padding: 0.1rem 0.1rem 0;
  width: 2.9rem;
}
.chat-time{
  color: #a4a4a4;
  font-size: 0.11rem;
  float: right;
}
.chat-text{
  color: #535353;
  line-height: 0.2rem;
  padding: 0.1rem 0.1rem 0.1rem 0;
  text-align: justify;
}
.chat-footer-content{
  margin:0 0.16rem;
  display: none;
}
</style>
