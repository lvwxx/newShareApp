<template>
  <div class="report-box" v-cloak>
    <div class="report">
      <div class="report-item" v-for="(RepoItem,index) in Reportlist" @click="goDetail(index)">
        <div class="report-item-node" v-show="RepoItem.timePoint">
          <i class="icon-img"></i>
          <p class="report-time">{{RepoItem.releaseDate}}</p>
          <p>{{RepoItem.timePointContent}}</p>
        </div>
        <router-link to="/detail"><div class="detail-report-scene">
          {{RepoItem.nsrTitle}}
        </div></router-link>
        <div class="detail-img-box">
          <video class="video" :src='RepoItem.videoUrl'  v-if="RepoItem.nsrHasVod"  :poster="RepoItem.videoImgUrl" @click.stop="openVideo($event)"></video>
          <img class="detail-img" :src="RepoItem.imageUrl1|pic" v-if="RepoItem.imageUrl1" @click.stop="bigPic(index,0)">
          <img class="detail-img" :src="RepoItem.imageUrl2|pic" v-if="RepoItem.imageUrl2" @click.stop="bigPic(index,1)">
          <img class="detail-img" :src="RepoItem.imageUrl3|pic" v-if="RepoItem.imageUrl3" @click.stop="bigPic(index,2)">
        </div>
        <div class="detail-item-footer clearfix">
          <div class="detail-footer-left">
            <img :src="RepoItem.userAvatar">
            <span>{{RepoItem.userNickName}}</span>
            <span>{{RepoItem.howLong}}</span>
          </div>
          <div class="detail-footer-right">
            <span class="icon-group"><i class="icon-like"></i><span>{{RepoItem.nsrGoodNum}}</span></span>
            <span class="icon-group"><i class="icon-comment"></i><span>{{RepoItem.nsrCommNum}}</span></span>
            <span class="icon-group"><i class="icon-transmit"></i><span>{{RepoItem.msrShareNum}}</span></span>
          </div>

        </div>
      </div>
    </div>
    <div class="report-all" v-if="isShowAll">
      已加载全部
    </div>
    <pic v-if="PicShow" :ImgArr="imgUrl" :number="number" @closePic="closePic"></pic>
    <footers v-show="footerShow"></footers>
  </div>
</template>

<script>
import Pic from './picture.vue'
import Footer from './Footer.vue'
import router from '../assets/js/router.js'
import axios from 'axios'
import qs from 'qs'
export default {
  data(){
    return{
      Reportlist:[],
      footerShow:true,
      PicShow:false,
      isShowAll:false,
      imgUrl:[],
      number:"",
      page:1,
    }
  },
  components:{
    footers:Footer,
    Pic,
  },
  mounted(){
    console.log(this.$route.params.id);
    this.getReportList();
    // this.Reportlist=json;
    // console.log(this.$route.params.id);
    // this.sceneDetail=json;
    var _this=this;
    window.removeEventListener('scroll',scroll);
    function scroll(){
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      var documentHeight=document.documentElement.offsetHeight;
      var screenHeight=window.screen.height;
      // console.log(scrollTop+screenHeight)
      if(scrollTop+screenHeight>=documentHeight){
        _this.footerShow=false;
        if(_this.isShowAll!=true){
          _this.getReportList();
        }
        setTimeout(function(){
          _this.footerShow=true;
        },4000);
        // _this.commentList=_this.commentList.concat(chatList);
      }else{
        _this.footerShow=true;
      }
    }
    window.addEventListener('scroll',scroll);
  },
  filters:{
    pic:function(value){
      return value+"?x-oss-process=style/cover_1_report"
    }
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll',scroll);
    next();
  },
  methods:{
    bigPic(idx,num){
      // console.log(this.Reportlist[idx]);
      this.imgUrl=[this.Reportlist[idx].imageUrl1,this.Reportlist[idx].imageUrl2,this.Reportlist[idx].imageUrl3];
      console.log(this.imgUrl)
      this.PicShow=true;
      this.number=num;
    },
    openVideo(event){
      console.log(event.target);
      event.target.play();
    },
    closePic(){
      this.PicShow=false;
    },
    goDetail(idx){
      console.log(router)
      var reportId=this.Reportlist[idx].id;
      router.push({path:'/detail/reportId='+reportId})
    },
    getReportList(){
      var _this=this;
      if(this.$route.params.id!=undefined){
        axios.post('reportPage.do',qs.stringify({shareId:this.$route.params.id,pageNum:this.page
          })).then(function(res){
          console.log(res);
          if(_this.page==1){
            if(res.data.length<10){
              _this.isShowAll=true;
              _this.Reportlist=res.data;
              return;
            }
          }
          if(res.data.length==0){
              _this.isShowAll=true;
              return;
          }else{
            _this.Reportlist=_this.Reportlist.concat(res.data);
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

<style>
.report-all{
  text-align: center;
  font-size: 0.12rem;
  color: #a4a4a4;
}
.icon-group{
  display: inline-block;
  margin-left: 0.15rem;
}
.icon-group i{
  display: inline-block;
  background: url('../assets/images/img.png') no-repeat;
  background-size: 0.18rem 0.54rem;
  position: relative;
  margin-right: 0.02rem;
  top: 0.03rem;
}
.icon-group .icon-like{
  width: 0.18rem;
  height: 0.18rem;
  background-position: 0 -0.18rem;
}
.icon-group .icon-comment{
  background-position: 0 -0.36rem;
  width: 0.18rem;
  height: 0.18rem;
}
.icon-group .icon-transmit{
  background-position: 0 0;
  width: 0.18rem;
  height: 0.18rem;
}
.icon-img{
  position: absolute;
  left: -0.12rem;
  top: 0.2rem;
  width: 0.12rem;
  height: 0.12rem;
  background: url('../assets/images/node.png') no-repeat;
  background-size: 100%;
}
.report-box{
  position: relative;

  width: 100%;
  font-size: 0.14rem;
  background: #f0f0f0;
}
.report{
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  padding-top:0.1rem;
  border-left: 2px solid red;
}
.report-item{
  margin: 0.1rem 0.05rem;
  border-radius: 0.05rem;
  background: white;
  border-radius: 0.05rem;
}
.report-item-node{
  position: relative;
  background: #eee0e0;
  padding: 0.1rem;
  line-height: 1.5;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
}
.report-time{

  color:#c20000;
  font-size: 0.12rem;
}
.detail-img-box img{
  width: 1rem;
  height: 1rem;
  margin-left: 0.1rem;
  object-fit: cover;
  object-position: center;
}
.detail-report-scene{
  display: block;
  padding: 0.1rem;
  line-height: 0.22rem;
  text-align: justify;
}
.detail-item-footer{
  padding: 0.1rem;
}
.detail-item-footer img{
  width: 0.2rem;
  height: 0.2rem;
  vertical-align: text-bottom;
}
.detail-footer-left{
  float: left;
}
.detail-footer-right{
  float: right;
  color: #a4a4a4;
  font-size: 0.11rem;
}

.detail-footer-left span,.detail-footer-right img{
  color: #a4a4a4;
  font-size: 0.11rem;
}
.detail-footer-right img{
  margin-left: 0.2rem;
}
.detail-img-box .video-img{
  width: 95%;
  height: 1rem;
}

video{
  display: block;
  -o-object-fit: fill;
     object-fit: fill;
  width: 100%;
  height: 1.5rem;
}

</style>
