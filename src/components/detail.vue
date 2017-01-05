<template>
  <div class="" v-cloak>
    <div class="detail-box" >
    <div class="detail-item" >
      <a class="detail-report">
        {{reportDetail.nsrContent}}
      </a>
       <div class="detail-report-box">
          <video class="video" id="video" :src='reportDetail.videoUrl'  v-if="reportDetail.nsrHasVod"  :poster="reportDetail.videoImgUrl" @click="openVideo($event)"></video>
          <img class="detail-img" :src="imageUrl1" v-if="reportDetail.imageUrl1" @click.prevent="bigPic(0)">
          <img class="detail-img" :src="imageUrl2" v-if="reportDetail.imageUrl2" @click.prevent="bigPic(1)">
          <img class="detail-img" :src="imageUrl3" v-if="reportDetail.imageUrl3" @click.prevent="bigPic(2)">
        </div>
      <div class="detail-item-footer clearfix">
        <div class="detail-footer-left">
          <img :src="reportDetail.userAvatar">
          <span>{{reportDetail.userNickName}}</span>
          <span>{{reportDetail.howLong}}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="comment-box">
    <div class="comment-count">评论({{reportDetail.nsrCommNum}})</div>
    <div class="comment-item clearfix" v-for="item in commentList">
      <img :src="item.userAvatar">
      <div class="comment-content">
        <p class="comment-person-name">{{item.nickName}}</p>
        <p class="comment-time">{{item.onlyTime}}</p>
        <p class="comment-text">
          {{item.scComment}}
        </p>
        <div class="comment-others">
          <p v-for="comitem in item.comment"><span class="comment-person-name">{{comitem.nickName}}:</span>{{comitem.scComment}}</p>
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
    <pic v-if="PicShow" :ImgArr="imgUrl" :number="number" @closePic="closePic"></pic>
    <footers v-show="footerShow"></footers
</div>


</template>

<script>
import Pic from './picture.vue'
import Footer from './Footer.vue'
import commentList from '../data/3.json'
import axios from 'axios'
import qs from 'qs'
export default {
  data(){
    return {
      reportDetail:{},
      commentList:[],
      imgUrl:[],
      footerShow:true,
      number:"",
      PicShow:false,
      isShowAll:false,
      isBlank:false,
      page:1,
    }
  },
  components:{
    footers:Footer,
    Pic,
  },
  computed:{
    imageUrl1:function(){
      return this.reportDetail.imageUrl1+"?x-oss-process=style/cover_1_report"
    },
    imageUrl2:function(){
      return this.reportDetail.imageUrl2+"?x-oss-process=style/cover_1_report"
    },
    imageUrl3:function(){
      return this.reportDetail.imageUrl3+"?x-oss-process=style/cover_1_report"
    },
  },
  mounted(){
    console.log(this.$route.params.reportId);
    window.scrollTo(0,0);
    this.getDetail();
    this.getComment();
    var _this=this;
    function scroll(){
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      var documentHeight=document.documentElement.offsetHeight;
      var screenHeight=window.screen.height;
      // console.log(scrollTop+screenHeight)
      if(scrollTop+screenHeight>=documentHeight){
        _this.footerShow=false;
        if(_this.isShowAll!=true){
          _this.getComment();
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
    this.$router.go(-1);
    next();
  },
  methods:{
    bigPic(num){
      console.log(this.reportDetail.imageUrl1);
      this.imgUrl=[this.reportDetail.imageUrl1,this.reportDetail.imageUrl2,this.reportDetail.imageUrl3];
      console.log(this.imgUrl)
      this.PicShow=true;
      this.number=num;
    },
    closePic(){
      this.PicShow=false;
    },
    openVideo(event){
      event.target.play();
    },
    getDetail(){
      var _this=this;
      axios.post('shareReport.do',qs.stringify({shareId:this.$route.params.reportId
        })).then(function(res){
        console.log(res);
          _this.reportDetail=res.data;
      })
    },
    getComment(){
      var _this=this;
      if(this.$route.params.reportId!=undefined){
        axios.post('commentPage.do',qs.stringify({shareId:this.$route.params.reportId, pageNum:this.page
          })).then(function(res){
          console.log(res);
          if(_this.page==1){
            if(res.data.length==0){
              console.log(0);
              _this.isBlank=true;
              _this.footerShow=true;
              return;
            }
          }
          if(res.data.length<10){
            _this.isShowAll=true;
            _this.footerShow=true;
            _this.commentList=_this.commentList.concat(res.data);
            return;
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
    },
  }
}
</script>

<style lang="css">
.detail-box{
  position: relative;
  font-size: 0.14rem;
  background: #f0f0f0;
}

.detail-item{
  display: block;
  background: white;
  border-radius: 0.05rem;
}
.detail-report-box{
  padding: 0 0.16rem;
}
.detail-report-box img {
  width: 1rem;
  height: 1rem;
  margin-left: 0.1rem;
  object-fit: cover;
  object-position: center;
}
.detail-item-footer img{
  height: 0.2rem;
  vertical-align: text-bottom;
  border-radius: 50%;
}
.detail-footer-left{
  float: left;
}
.detail-footer-left span,.detail-footer-right img{
  color: #a4a4a4;
  font-size: 0.11rem;
}
.detail-item-footer{
  padding: 0.16rem;
}
.detail-report{
  display: block;
  padding: 0.15rem 0.16rem 0.1rem ;
  line-height: 0.28rem;
  text-align: justify;
  color: #000000;
  font-size: 0.17rem;
}
#span-2{
  margin-left: 0.1rem;
}
.time-img{
  width: 0.15rem;
  vertical-align: text-bottom;
}
.comment-box{
  position: relative;
  background: white;
  font-size: 0.14rem;
}
.comment-count{
  padding-left: 0.16rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #535353;
  font-size: 0.12rem;
  border-bottom: 1px solid #dfdfdf;
}
.comment-item img{
  margin: 0.12rem 0.10rem 0 0.16rem;
  float: left;
  width: 0.3rem;
  border-radius: 50%;
}
.comment-person-name{
  padding: 0.12rem 0 0.05rem;
  color: #0f3781;
  font-size: 0.14rem;
}
.comment-time{
  padding-bottom: 0.1rem;
  color: #a4a4a4;
  font-size: 0.11rem;
}
.comment-text{
  padding: 0rem 0.15rem 0.1rem 0.56rem;
  line-height: 0.2rem;
  text-align: justify;
  color: #535353;
}
.comment-others{
  background: #f0f0f0;
  margin:0 0.16rem 0.15rem 0.56rem;
}
.comment-others p{
  line-height: 0.2rem;
  padding: 0.02rem 0.1rem;
}
.comment-item{
  border-bottom: 1px solid #dfdfdf;
}

video{
  display: block;
  object-fit: fill;
  width: 100%;
  height: 1.5rem;
}

.blank-block{
  width: 100%;
  height: 0.15rem;
  background-color: #f0f0f0;
}


</style>
