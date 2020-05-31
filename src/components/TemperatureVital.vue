<template>
  <div>
    <div style="clear:both;"></div>

    <div class="zhihuiBox new-zhui " style="height: 60px;margin-top: 0;padding: 10px 0;background-color: white">
      <!--<div class="col-2-16"><h1>{{$t('zhiHuiSchool.tiwentongji.tiwenjiankong')}}</h1></div>-->
      <div class="col-4-16 l_h40" style="padding-left: 30px">
        <div class="chooseTop_2 f_l " style="width: 45%">
          <!--<select class="time btn_big" v-model="value2_nian" v-bind="options_grade"  style="width: 100px;height: 30px" @change="change_nianji">
            <option v-for="(grade,i) in options_grade" :value="grade.value" >{{grade.label}}</option>
          </select>-->
          <el-select v-model="value2_nian" clearable placeholder="请选择" @change="change_nianji" style="width: 100%" >
            <el-option
              v-for="item_c in options_grade"
              :key="item_c.value"
              :label="item_c.label"
              :value="item_c.value">
            </el-option>
          </el-select>
        </div>
        <div class="chooseTop_2 f_l ml10" style="width: 45%">
          <!-- <select class="time btn_big" v-model="value_ban" v-bind="options_class"  style="width: 100px;height: 30px" @change="change_banji">
             <option v-for="(clas,i) in options_class" :value="clas.value" >{{clas.label}}</option>
           </select>-->
          <el-select v-model="value_ban" clearable placeholder="请选择" @change="change_banji" style="width: 100%">
            <el-option
              v-for="item in options_class"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
     <div class="col-4-16">&nbsp;</div>

      <div class="col-2-16 l_h40 ">
        <!--<el-tooltip :content="$t('zhiHuiSchool.tiwentongji.tiwenyicha')" placement="bottom-start" effect="light">-->
          <i class="icon-zhongkaochengji tem-icon color-blue" @click="dialogTableVisible = true;highTempStudentInfo()"></i>

        <!--</el-tooltip>-->
        <p style="margin-left: 40px;line-height: 50px">高热学生详情</p>
        <el-dialog title="高热学生详情" :visible.sync="dialogTableVisible" v-if="have_highData" >
          <el-table :data="slicdata2()" width="80%"  max-height="300">
            <el-table-column align="center" property="studentName" label="姓名" :max-height="20"></el-table-column>
            <el-table-column align="center" property="name" label="性别" :max-height="20"></el-table-column>
            <el-table-column align="center" property="degree"  label="体温" :max-height="20">
              <template slot-scope="scope">
                <span :style="{color: '#D60000'}">{{scope.row.degree/10}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" property="detectTime" :formatter="formatterSelectTime"  label="时间" :max-height="20"></el-table-column>
          </el-table>
          <div style="text-align: center;margin-top: 30px;">
            <el-pagination
              background
              layout="total,prev, pager, next"
              :page-size="pagesize"
              :total="this.high_data.length"
              @current-change="current_change">
            </el-pagination>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogTableVisible = false;ff()" style="width: 100%;background-color:#82b64a">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog  :visible.sync="dialogTableVisible" v-if="!have_highData" style="text-align: center" width="20%">
            <i class="el-icon-circle-check " style="color: #ffb444;font-size: 100px"></i>
            <p style="width: 100%;text-align: center;margin-top: 10px;color: #414141">没有发热学生额！</p>
          <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogTableVisible = false;ff()" style="width: 100%;background-color:#82b64a">确 定</el-button>
  </span>
        </el-dialog>
      </div>
      <div class="col-2-16 l_h40 ">
        <el-tooltip content="设置" placement="bottom-start" effect="light">
          <i class="el-icon-setting tem-icon color-blue" @click="dialogsettingVisible = true"></i>

        </el-tooltip>
        <p style="margin-left: 40px;line-height: 50px">体温设置</p>
      </div>
      <div class="col-4-16">
        <p class="tem-p" style="line-height: 50px">{{getTime(time)}}</p>
        <!--<el-tooltip content="刷新" placement="bottom-start" effect="light">-->
        <div class="new_icon_box "@click="updata">
          <i class="el-icon-refresh-right tem-icon " style="margin-top: 0;color: white"  :class="{icon_re:isrefresh}"></i>
          <p style="margin-left: 35px;line-height: 30px ;color: white;">刷新</p>
        </div>

        <!--</el-tooltip>-->

      </div>
    </div>


    <div class="zk-table " >
      <div class="new_table-content">

        <div class="tep_info_box">
          <div class="single_tem_box" v-for="(temper_info) in slicdata()">
            <div class="single_wendu">
              <div class="col-8-16 single_wendu—l">
                <p>{{temper_info.studentName}}</p>
                <p class="new_wendu_num"><span>{{temper_info.degree/10}}</span>℃</p>
                <p class="tep_color txt-green">体温: <span>正常</span></p>
              </div>
              <div class="col-8-16 t_c" style="padding: 20px 0 0 0">
                <i class="icon-wenduji txt-green " style="font-size:550% ;"></i>
              </div>
            </div>

          </div>
        </div>


         <!-- <div class="table-row boder_tp">
            <div class="col-3-18 boder_all" v-for="(temper_info) in total_temData">
              <div class="single_wendu">
                <div class="col-8-16">
                  <div class="student-name">{{temper_info.studentName}}</div>
                  <i class="icon-wenduji txt-green" style="font-size:600% ;"></i></div>
                <div class="col-8-16">
                  <p class="wendu_num"><span>{{temper_info.degree/10}}</span>℃</p>
                </div>
              </div>
            </div>
          </div>-->
        <div style="clear:both;"></div>
        <div class="page-weiba t_r" >
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pagesize_z"
            :total="this.total_temData.length"
            @current-change="current_change_z">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="$t('zhiHuiSchool.tiwentongji.tiwenjiankong')+$t('message.setup')" :visible.sync="dialogsettingVisible" >
      <div class="yujin_div" style="width: 80%;margin: 0 auto">
        <div class="label_info">
            {{$t('zhiHuiSchool.tiwentongji.tiwenyujin')}}： <el-input v-model="input_d" placeholder="请输入内容" style="width: 80%"></el-input>
        </div>
        <div class="label_info">
            {{$t('zhiHuiSchool.tiwentongji.fareyujin')}}： <el-input v-model="input_z" placeholder="请输入内容" style="width: 80%"></el-input>
        </div>
        <div class="label_info">
            {{$t('zhiHuiSchool.tiwentongji.gaoreyujin')}}： <el-input v-model="input_g" placeholder="请输入内容" style="width: 80%"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogsettingVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="dialogsettingVisible = false;setTem_info()" style="width: 100%;background-color:#82b64a">{{$t('message.queding')}}</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'

  export default {
    name: "TemperatureVital",
    data() {
      return {
        time: new Date(),
        options_grade: [{value: '11', label: '初一'}, {value: '12', label: '初二'},
          {value: '13', label: '初三'}],
        options_class: [{value: '(1)班', label: '(1)班'}],
        flag_one: 0,
        flag_refresh: 0,
        value_ban: '',
        value2_nian: '',
        student_temper: [
          36.5, 36.5, 37.5, 36.5, 38.5, 36.5,
          36.5, 36.5, 37.1, 36.5, 38.5, 36.5,
          40.5, 36.5, 37.5
        ],
        juti_class:'初一一班',
        class_url: "",
        tem_url: "",
        setup_police: [37, 37.5, 38.5],
        total_temData: [],
        total_temData_c: [{
          studentName:'刘芳菲',
          degree:378
        },
          {
            studentName:'刘菲',
            degree:388
          },
          {
            studentName:'刘芳菲ff',
            degree:368
          }
          ,{
            studentName:'刘',
            degree:398
          },
          {
            studentName:'刘芳菲',
            degree:358
          }],
        class_data: [],
        loading: false,
        isrefresh: false,

        //表格数据
        dialogTableVisible: false,
        dialogsettingVisible: false,
        gridData: [
          {
            date: '2016-05-02',
            name: '王小虎a',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎b',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎c',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎d',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎a',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小g虎',
            address: '上海市普陀区金沙江'
          },    {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          },
          {
            date: '201c6-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          }, {
            date: '2016-05-01',
            name: '王小c虎',
            address: '上海市普陀区金沙江'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          },
          {
            date: '201c6-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          }, {
            date: '2016-05-01',
            name: '王小c虎',
            address: '上海市普陀区金沙江'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          },
          {
            date: '201c6-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          }, {
            date: '2016-05-01',
            name: '王小c虎',
            address: '上海市普陀区金沙江'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江'
          }],
      //  分页标签  数据像
        total: 0,//默认数据总数

        pagesize: 4,//每页的数据条数

        currentPage: 1,//默认开始页面}
        //input值
        input_g:"38.5",
        input_d:"37",
        input_z:"37.5",

      //  主页面分页
        total_z:0,
        pagesize_z:20,
        currentPage_z:1,

        high_data:[],
        have_highData:false
      }
    },
    mounted() {
      let that = this
      // console.log(this.getData('/school/getClasses/710/11'))


      /* let grade_data = []
       let cl_data = []
       for (let i=0;i<that.class_data.length;i++) {
         grade_data.push(that.class_data[i].grade)
         cl_data.push(that.class_data[i].className)
       }
       console.log(that.unique(grade_data))
       console.log(that.unique(cl_data))
       for (let i=0;i<cl_data.length;i++) {
        that.options_class.push({value:cl_data[i],label:cl_data[i]})
       }*/
      this.timer = setInterval(() => {
        that.time = this.getTime(); // 修改数据date
      }, 1000)

      // this.updata()


      that.wenduji_color(that.setup_police)

    },
    methods: {

      //设置温度预警数据
      setTem_info(){
        let that = this
        let arr = [that.input_d,that.input_z,that.input_g]
        that.wenduji_color(arr)
      },
      //分页设置
      current_change: function (currentPage) {
        this.currentPage = currentPage;
      },
      current_change_z: function (currentPage) {
        this.currentPage_z = currentPage;
      },

      //年级下拉菜单
      async change_nianji(event) {
        let that = this
        let nian = event
        console.log(event)
        this.value2_nian = nian
        if (this.flag_one > 0) {
          this.value_ban = ""
        }
        this.flag_one++
        //先获取某个班级的数据
        if (nian) {
          let tem_url = 'api/school/getClasses/' + nian

          await that.getclassData(tem_url);
        }
      },
      //获取时间
      getTime() {
        let myDate = new Date();

        let wk = myDate.getDay()
        let year = String(myDate.getFullYear())
        let month = myDate.getMonth() + 1
        let day = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
        let hours = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
        let minutes = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
        let seconds = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
        let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        let week = weeks[wk]
        return year + " 年 " + month + " 月 " + day + " 日 " + week + " " + hours + ":" + minutes
          // + ":" + seconds
      },
      //班级下拉菜单
      change_banji(event,tim) {
        this.loading = true
        let d = event
        if (!tim) {
          tim = new Date()
        }
        if (this.value2_nian) {

          console.log(this.class_data)
          for (let i = 0; i < this.class_data.length; i++) {
            if (this.class_data[i].grade == this.value2_nian && this.class_data[i].className == d) {
              let class_id = this.class_data[i].classId
              //在获取改班级的数据
              this.tem_url = "api/studentHeat/getStudentRealTimeHeat/" + class_id
              // this.tem_url ="121.196.59.238/studentHeat/getStudentRealTimeHeat/9391"
              break
            }
          }
        }

        // console.log(this.tem_url)
        // this.tem_url ="api/studentHeat/getStudentRealTimeHeat/9391"
        this.getData(this.tem_url,tim)

      },
      async getData(url,tim) {

        await this.new_getD(url)
        let end = new Date()
        let la_tim = ((end - tim) > 1000) ? (end - tim) : 1000

        setTimeout(() => {
          this.loading = false;
          this.isrefresh = false;
        }, la_tim);
        this.wenduji_color(this.setup_police)
      },
      async new_getD(url) {
        try {
          let Response = await this.$axios.get(url)
          this.total_temData = Response.data

          console.log(this.total_temData)
        } catch (err) {
          console.log(err)
          alert('请求出错！')
        }

        /*this.$axios.get(url)
          .then(Response=>{
            this.total_temData=Response.data

            console.log(Response.data)
            console.log(this.total_temData)
          })*/
      },

      //刷新
      async updata() {
        this.flag_one = 0   //flag 使得班级不更新
        this.loading = true
        //进入页面运行了一次此方法，这里让运行的第一次跳过刷新
        if (this.flag_refresh > 0) {
          this.isrefresh = true
        }
        this.flag_refresh = 1

        let tim = new Date()
        await this.change_nianji(this.value2_nian)
        this.change_banji(this.value_ban,tim)
        // let end = new Date()


      },
      async getclassData(url) {
        try {
          let Response = await this.$axios.get(url)

          // window.localStorage["token"]= '1212'    //JSON.stringify(Response.data.data.token)


          let classd = Response.data
          this.class_data = Response.data
          let grade_data = []
          let cl_data = []

          console.log( this.class_data)

          for (let i = 0; i < classd.length; i++) {
            grade_data.push(classd[i].grade)
            cl_data.push(classd[i].className)
          }
          let class_arr = []
          for (let i = 0; i < cl_data.length; i++) {
            class_arr.push({value: cl_data[i], label: cl_data[i]})
          }
          if (class_arr)
            this.options_class = class_arr
        } catch (err) {
          alert( this.$t('message.qinqiuchucuo')+'！')
        }

      },

      //温度计颜色设置
      wenduji_color(arr_) {
        let arr_wendu = $('.new_wendu_num span')


        for (let i = 0; i < arr_wendu.length; i++) {
          let num = arr_wendu[i].textContent * 1
          if (num >= arr_[2]) {
            $('.single_wendu i')[i].style.color = 'red'
            $('.single_wendu .tep_color')[i].style.color = 'red'
            $('.single_wendu .tep_color')[i].lastChild.innerHTML= '高热预警'
          } else if (num >= arr_[1]) {
            $('.single_wendu i')[i].style.color = '#ff842b'
            $('.single_wendu .tep_color')[i].style.color = '#ff842b'
            $('.single_wendu .tep_color')[i].lastChild.innerHTML= '发热预警'

          } else if (num >= arr_[0]) {
            $('.single_wendu i')[i].style.color = '#ffb444'
            $('.single_wendu .tep_color')[i].style.color = '#ffb444'
            $('.single_wendu .tep_color')[i].lastChild.innerHTML= '体温预警'
          }else {
            $('.single_wendu i')[i].style.color = '#82b64a'
            $('.single_wendu .tep_color')[i].style.color = '#82b64a'
            $('.single_wendu .tep_color')[i].lastChild.innerHTML= '正常'
          }
        }
      },
      unique(arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i])
          }
        }
        return newArr;
      },
      slicdata(){
        return this.total_temData.slice((this.currentPage_z-1)*this.pagesize_z,this.currentPage_z*this.pagesize_z)
      },

      slicdata2(){
        return this.high_data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      },
      highTempStudentInfo(){
        let arr=[]
        let dat = this.total_temData
        for (let i=0;i<dat.length;i++){
          if (dat[i].degree/10 >= this.input_g) {
            arr.push(dat[i])
          }
        }

        this.high_data = arr

        console.log( this.high_data)
        if (arr.length>0)
          this.have_highData=true
        else {
          this.have_highData=false
        }

      },
      formatterDegree_tem(row, column, cellValue){
        return cellValue/10
      },
      formatterSelectTime(row, column, cellValue){

        return cellValue[0]+"年"+cellValue[1]+"月"+cellValue[2]+"日 "+
          cellValue[3]+":"+cellValue[4]+":"+cellValue[5]
      },
      /* updata(){
        let that = this
        console.log(that.value_ban)
        console.log(that.value2_nian)
       }*/

    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    computed: {
      // change_banji:{
      //   get:function() {
      //     console.log('get')
      //   },
      //   set:function (newval) {
      //     console.log('set')
      //   }
      // },
    }
  }
</script>

<style lang="less">
  @import "../common/css/main.less";

  .new-zhui {
    .tem-icon {
      font-size: 30px;
      float: left;
      margin-top: 10px;
    }
    .tem-p {
      float: left;
      line-height: 40px;
      margin-left: 15px;
    }
  }
  .new_icon_box{
    float: left;
    height: 30px;
    border-radius: 20px;
    background-color: @themeColor;
    margin: 10px 0 0 10px;
    padding: 0 10px;
    cursor: pointer;
  }

  .icon_re {
    animation: turn 1s linear;
  }
  .new_table-content {
    width: 100%;
    height:auto;
    .tep_info_box{
      width: 100%;
      height: 530px;
      /*background-color: red;*/
      overflow: hidden;
      .single_tem_box {
        width: 19%;
        height: 120px;
        margin-top: 10px;
        float: left;
        margin-left: 1%;
        .single_wendu {
          width: 100%;
          height: 120px;
          border: 1px solid #cfcfcf;
          .student-name {
            height: 70px;
            width: 100%;
            line-height: 70px;
            font-size: 16px;
          }
          .single_wendu—l{
            padding: 20px 0 0 20px;
            .new_wendu_num {
              width: 100%;
              height: 40px;
              line-height: 40px;
              font-size: 22px;
              font-weight: bold;
              span {

              }
            }
          }

        }
      }
    }

  }
  .page-weiba{
    width: 100%;
    height: 50px;
    margin-top: 20px;
    /*background-color: #00c3ff;*/
  }

  @keyframes turn {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
