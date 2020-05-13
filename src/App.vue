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
              <i class="icon-home">&nbsp;</i>智慧校园</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-group">&nbsp;</i>教师管理</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-teachManage">&nbsp;</i>班级管理</a>
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
              <i class="icon-add">&nbsp;</i>收藏</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-setting">&nbsp;</i>设置</a>
          </li>
          <li class="">
            <a href="" class="">
              <i class="icon-back">&nbsp;</i>返回启动页</a>
          </li>
        </ul>
      </div>
      <div class="rightPage">
        <div class="page-head">
          <div class="bread-nav-box txt_w">
            <a href="javascript:;">
              <b>智慧校园</b>
            </a>

          </div>
          <div class="head-menu">
            <ul class="head-menu-ul f16">
              <li class="head-menu-item">
                <a href="javascript:;" class="txt_w">退出</a>
              </li>
              <li class="head-menu-item">
                <a href="javascript:;" class="txt_w">账户信息
                  <i class="icon-hehe"></i>
                </a>
              </li>
              <li class="head-menu-item">
                <a href="javascript:;" class="txt_w">欢迎页</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="right-section" v-slimscroll="options">
          <div class="healthyChart" style="padding: 0">
            <div class="choosee">
              <router-link tag="a" class="btn grayBtn" to="jinchuSchool">进出校记录</router-link>
              <router-link tag="a" class="btn grayBtn" to="jieduanVital">阶段统计</router-link>
              <router-link tag="a" class="btn grayBtn" to="temperatureVital">体温统计</router-link>
            </div>
           <!-- <div class="col-16-16 t_c f16">

              <a style="padding: 0 15px;border-right: 1px solid #cfcfcf" v-on:click="toSimpleCh" >中文简体</a>
              <a style="padding: 0 15px" v-on:click="toCh">中文繁体</a>

            </div>-->
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
      this.jianfan.toChinese()
    },
    toSimpleCh() {
      this.jianfan.toSimpleChinese()
    }
  }
}
</script>

<style lang="less">
  @import "./common/css/main.less";
</style>
