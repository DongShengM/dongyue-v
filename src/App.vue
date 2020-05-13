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
          <li class="">
            <a href="" class="">
              <i class="icon-group">&nbsp;</i>{{$t('zhiHuiSchool.all_share.jiaoshigaunli')}}</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-teachManage">&nbsp;</i>{{$t('zhiHuiSchool.all_share.banjiguanli')}}</a>
          </li>
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
        <div class="right-section" v-slimscroll="options">
          <div class="healthyChart" style="padding: 0">
            <div class="choosee">
              <router-link tag="a" class="btn grayBtn" to="jinchuSchool">{{$t('zhiHuiSchool.all_share.jichuxiaojilu')}}</router-link>
              <router-link tag="a" class="btn grayBtn" to="jieduanVital">{{$t('zhiHuiSchool.all_share.jieduantongji')}}</router-link>
              <router-link tag="a" class="btn grayBtn" to="temperatureVital">{{$t('zhiHuiSchool.all_share.tiwentongji')}}</router-link>
            </div>
            <div class="col-16-16 t_c f16">

              <a style="padding: 0 15px;border-right: 1px solid #cfcfcf" v-on:click="toSimpleCh" >{{$t('message.cn')}}</a>
              <a style="padding: 0 15px" v-on:click="toCh">{{$t('message.tw')}}</a>

            </div>
            <router-view/>

          </div>

        </div>

      </div>


  </div>

</template>

<script>
  import newTest from './components/newTest'
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
  }
  , methods: {

    toCh() {
      this.$i18n.locale = 'tw'
      localStorage.lang = 'tw'
    },
    toSimpleCh() {
      this.$i18n.locale = 'cn'
      localStorage.lang = 'cn'
    }
  }
}
</script>

<style lang="less">
  @import "./common/css/main.less";
</style>
