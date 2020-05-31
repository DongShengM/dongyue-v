<template>
  <div id="app" class="pageContent">
    <!--<ul>-->
      <!--<router-link to="temperatureVital">1</router-link>-->
      <!--<li>2</li>-->
      <!--<li>3</li>-->
    <!--</ul>-->
      <div class="left-menu">
        <a class="logo-box">
        <span class="logo-img">
        </span>
        </a>
        <ul class="menu-list f16">
          <li class="current">
            <a href="" class="">
              <i class="icon-home">&nbsp;</i>{{$t('zhiHuiSchool.all_share.zhihuixiaoyuan')}}</a>
          </li>
       <!--   <li class="">
            <a href="" class="">
              <i class="icon-group">&nbsp;</i>{{$t('zhiHuiSchool.all_share.jiaoshigaunli')}}</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-teachManage">&nbsp;</i>{{$t('zhiHuiSchool.all_share.banjiguanli')}}</a>
          </li>-->
 <!--         <li class="">
            <a href="" class="">
              <i class="icon-import">&nbsp;</i>数据录入</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-homeWork">&nbsp;</i>家庭作业</a>
          </li>-->
        </ul>
        <ul class="bottom-menu menu-list f16">
          <li class="">
            <a href="" class="">
              <i class="icon-add">&nbsp;</i>{{$t('zhiHuiSchool.all_share.shoucang')}}</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-setting">&nbsp;</i>{{$t('zhiHuiSchool.all_share.shezhi')}}</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-back">&nbsp;</i>{{$t('zhiHuiSchool.all_share.fanhuiqidongye')}}</a>
          </li>
        </ul>
      </div>
      <div class="rightPage">
        <div class="page-head">
          <div class="bread-nav-box txt_w">
            <a href="javascript:;">
              <b>{{$t('zhiHuiSchool.all_share.zhihuixiaoyuan')}}</b>
            </a>

          </div>
          <div class="head-menu">
            <ul class="head-menu-ul f16">
              <li class="head-menu-item">
                <a href="javascript:;" class="txt_w">{{$t('zhiHuiSchool.all_share.zhanghuxinxi')}}</a>
              </li>
              <li class="head-menu-item">
                <a href="javascript:;" class="txt_w">{{$t('zhiHuiSchool.all_share.tuichu')}}
                  <i class="icon-hehe"></i>
                </a>
              </li>
              <li class="head-menu-item">
                <a href="javascript:;" class="txt_w">{{$t('zhiHuiSchool.all_share.huanyinye')}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="right-chart" v-slimscroll="options" >
          <div class="healthyChart" style="padding: 0">
            <div class="new-choosee">
              <router-link tag="div" class="zhuihui_btn current" to="jinchuSchool">{{$t('zhiHuiSchool.all_share.jichuxiaojilu')}}</router-link>
              <router-link tag="div" class="zhuihui_btn" to="jieduanVital">{{$t('zhiHuiSchool.all_share.jieduantongji')}}</router-link>
              <router-link tag="div" class="zhuihui_btn" to="temperatureVital">{{$t('zhiHuiSchool.tiwentongji.tiwenjiankong')}}</router-link>
              <a class="f16" style="padding: 0 15px;float: right" v-on:click="toCh">{{$t('message.tw')}}</a>
              <a class="f16" style="padding: 0 15px;border-right: 1px solid #cfcfcf;float: right" v-on:click="toSimpleCh" >{{$t('message.cn')}}</a>
            </div>
            <!--<div class="col-16-16 t_c f16">-->

              <!--<a style="padding: 0 15px;border-right: 1px solid #cfcfcf" v-on:click="toSimpleCh" >{{$t('message.cn')}}</a>-->
              <!--<a style="padding: 0 15px" v-on:click="toCh">{{$t('message.tw')}}</a>-->

            <!--</div>-->
            <router-view/>

          </div>

        </div>

      </div>


  </div>

</template>

<script>
  import newTest from './components/newTest'
  import $ from 'jquery'
export default {
  name: 'App',
  components: {
    newTest
  },
  data() {
    return {
      options: {
        height: '95%',
        size: 0,

        // padding:'0 0 50px 0'

      }
    }
  },
  created(){
    console.log('000')
    // let str = window.location.search
    let str ='c8d16b9b630220e5a40ea13be2=5eac46=token'
    console.log(str)
    let index = str.lastIndexOf("\=token")

    console.log(str.substring(0,index))

    window.localStorage["token"]= str.substring(0,index)
  },

  beforeMount(){
    // console.log('111')
    // this.firstCome('api/login/dy_mobile_171435_15555555116/20200521235455/f7c0502f911f0e2eee92f453f6fb7b57')
    // this.firstCome('http://t.jiankangtiyu.com/dy-heat/studentHeat/getStudentRealTimeHeat/9391')
    // http://localhost:2002/login/dy_mobile_171435_15555555116/20200521235455/f7c0502f911f0e2eee92f453f6fb7b57



  },
  mounted(){


    $('.zhuihui_btn').on('click',function () {
      $(this).addClass('current').siblings().removeClass('current')
    })
  }
  , methods: {

    toCh() {
      this.$i18n.locale = 'tw'
      localStorage.lang = 'tw'
    },
    toSimpleCh() {
      this.$i18n.locale = 'cn'
      localStorage.lang = 'cn'
    },
    async firstCome(url){
        try {
          let Response = await this.$axios.get(url)


          window.localStorage["token"]= '1a359f258a92d6788506da0921520318'    //JSON.stringify(Response.data.data.token)

          console.log(Response)
        } catch (err) {
          alert( this.$t('message.qinqiuchucuo')+'！')
        }
    }
  }
}
</script>

<style lang="less">
  @import "./common/css/main.less";
  .new-choosee{
    width: 100%;
    background-color: white;
    height: 50px;
    padding: 0 10px;
    line-height: 50px;
    border-bottom: 1px solid @lighterGray;
    .zhuihui_btn{
      cursor: pointer;
      position: relative;
      text-align: center;
      line-height: 50px;
      height: 50px;
      float: left;
      font-size: 16px;
      padding: 0 10px;
      margin-left: 20px;
      &.current {
        border-bottom: 2px solid @yellowColor;
      }
    }
  }
</style>
