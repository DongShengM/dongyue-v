<template>
  <div>
    <div style="clear:both;"></div>

    <div class="zhihuiBox new-zhui no-padding">
      <div class="col-2-16"><h1>体温监控</h1></div>
      <div class="col-8-16">
        <el-tooltip content="刷新" placement="bottom-start" effect="light">
          <i class="el-icon-refresh-right tem-icon color-blue" @click="updata" :class="{icon_re:isrefresh}"></i>
        </el-tooltip>
        <p class="tem-p">{{getTime(time)}}</p>
      </div>
      <div class="col-4-16 l_h40">
        <div class="chooseTop_2 f_l " style="width: 40%">
          <!--<select class="time btn_big" v-model="value2_nian" v-bind="options_grade"  style="width: 100px;height: 30px" @change="change_nianji">
            <option v-for="(grade,i) in options_grade" :value="grade.value" >{{grade.label}}</option>
          </select>-->
          <el-select v-model="value2_nian" clearable placeholder="请选择" @change="change_nianji">
            <el-option
              v-for="item_c in options_grade"
              :key="item_c.value"
              :label="item_c.label"
              :value="item_c.value">
            </el-option>
          </el-select>
        </div>
        <div class="chooseTop_2 f_l ml10" style="width: 50%">
          <!-- <select class="time btn_big" v-model="value_ban" v-bind="options_class"  style="width: 100px;height: 30px" @change="change_banji">
             <option v-for="(clas,i) in options_class" :value="clas.value" >{{clas.label}}</option>
           </select>-->
          <el-select v-model="value_ban" clearable placeholder="请选择" @change="change_banji">
            <el-option
              v-for="item in options_class"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="col-1-16 l_h40 ">
        <el-tooltip content="体温异常学生名单" placement="bottom-start" effect="light">
          <i class="icon-zhongkaochengji tem-icon color-pink" @click="dialogTableVisible = true"></i>

        </el-tooltip>
        <el-dialog title="juti_class" :visible.sync="dialogTableVisible" center >
          <el-table :data="gridData.slice((currentPage-1)*pagesize,currentPage*pagesize)" width="80%" :show-header="false" max-height="300">
            <el-table-column align="center" property="date" label="姓名" :max-height="20"></el-table-column>
            <el-table-column align="center" property="name" label="性别" :max-height="20"></el-table-column>
            <el-table-column align="center" property="name" label="体温" :max-height="20"></el-table-column>
            <el-table-column align="center" property="address" label="时间" :max-height="20"></el-table-column>
          </el-table>
          <div style="text-align: center;margin-top: 30px;">
            <el-pagination
              background
              layout="total,prev, pager, next"
              :page-size="pagesize"
              :total="this.gridData.length"
              @current-change="current_change">
            </el-pagination>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogTableVisible = false;ff()">确 定</el-button>
  </span>
        </el-dialog>
      </div>
      <div class="col-1-16 l_h40 ">
        <el-tooltip content="设置" placement="bottom-start" effect="light">
          <i class="el-icon-setting tem-icon color-blue" @click="dialogsettingVisible = true"></i>
        </el-tooltip>
      </div>
    </div>


    <div class="zk-table " v-loading="loading" style="margin-top: 65px">
      <div class="table-content mt20">
        <div class="table-box l_h30 f14" style="display: block">

          <div class="table-row boder_tp">
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
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="体温监控设置" :visible.sync="dialogsettingVisible" center>
      <div class="yujin_div" style="width: 80%;margin: 0 auto">
        <div class="label_info">
          <div class="tooltip_kuai">
            体温预警： <el-input v-model="input_d" placeholder="请输入内容" style="width: 60%"></el-input>
          </div>
          <div class="yujin_info ">
            <span>超过体温预警值会提示</span>
          </div>
        </div>
        <div class="label_info">
          <div class="tooltip_kuai ">
            发热预警： <el-input v-model="input_z" placeholder="请输入内容" style="width: 60%"></el-input>
          </div>
          <div class="yujin_info">
            <span>超过发热预警值但低于高热会显著提示</span>
          </div>
        </div>
        <div class="label_info">
          <div class="tooltip_kuai">
            高热预警： <el-input v-model="input_g" placeholder="请输入内容" style="width: 60%"></el-input>
          </div>
          <div class="yujin_info">
            <span>超过高热会更加显著且频繁的提示</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogsettingVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogsettingVisible = false;setTem_info()">确 定</el-button>
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
        value_ban: '(1)班',
        value2_nian: '11',
        student_temper: [
          36.5, 36.5, 37.5, 36.5, 38.5, 36.5,
          36.5, 36.5, 37.1, 36.5, 38.5, 36.5,
          40.5, 36.5, 37.5
        ],
        juti_class:'初一一般',
        class_url: "",
        tem_url: "",
        setup_police: [37, 37.5, 38.5],
        total_temData: [],
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
          }],
      //  分页标签  数据像
        total: 0,//默认数据总数

        pagesize: 4,//每页的数据条数

        currentPage: 1,//默认开始页面}
        //input值
        input_g:"",
        input_d:"",
        input_z:""
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

      this.updata()


      that.wenduji_color(that.setup_police)


      $('.shezhi').click(function () {
        $('.alert-box').css('display', 'block');
      })
      $(".close-btn").click(function () {
        $('.alert-box').css('display', 'none');
      });
      $(".queding").click(function () {
        $('.alert-box').css('display', 'none');

        let polic1 = $('.police_1')[0].value
        let polic2 = $('.police_2')[0].value
        let polic3 = $('.police_3')[0].value

        that.setup_police = [polic1, polic2, polic3]
        that.wenduji_color(that.setup_police)
      });

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
          let tem_url = 'http://101.37.88.224:2002/school/getClasses/710/' + nian
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
        return year + " 年 " + month + " 月 " + day + " 日 " + week + " " + hours + ":" + minutes + ":" + seconds
      },
      //班级下拉菜单
      change_banji(event,tim) {
        this.loading = true
        let d = event
        if (!tim) {
          tim = new Date()
        }

        if (this.value2_nian) {
          for (let i = 0; i < this.class_data.length; i++) {
            if (this.class_data[i].grade == this.value2_nian && this.class_data[i].className == d) {
              let class_id = this.class_data[i].classId
              //在获取改班级的数据
              this.tem_url = "http://101.37.88.224:2002/studentHeat/getStudentRealTimeHeat/" + class_id
              break
            }
          }
        }

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

          let classd = Response.data
          this.class_data = Response.data
          let grade_data = []
          let cl_data = []

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
          alert('请求出错！')
        }

      },

      //温度计颜色设置
      wenduji_color(arr_) {
        let arr_wendu = $('.wendu_num span')

        for (let i = 0; i < arr_wendu.length; i++) {
          let num = arr_wendu[i].textContent * 1
          if (num >= arr_[2]) {
            $('.single_wendu i')[i].style.color = 'red'
            $('.wendu_num')[i].style.color = 'red'
          } else if (num >= arr_[1]) {
            $('.single_wendu i')[i].style.color = '#ff842b'
            $('.wendu_num')[i].style.color = '#ff842b'
          } else if (num >= arr_[0]) {
            $('.single_wendu i')[i].style.color = '#ffb444'
            $('.wendu_num')[i].style.color = '#ffb444'
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

  .icon_re {
    animation: turn 1s linear;
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
