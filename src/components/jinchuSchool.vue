<template>
  <div>


    <div style="clear:both;"></div>
    <div class="choosegrade" style="padding-left: 20px">
      <span>{{$t('zhiHuiSchool.jiechuxiaojilu.nianji')}}:</span>
      <ul>
        <li v-for="(sing,i) in school_info" :class="sing.grade==grade_xuanzhong?'focus':''"
            @click="changeN(sing.grade)">
          {{sing.gradeName}}
        </li>
        <!--<li>{{$t('zhiHuiSchool.jiechuxiaojilu.quanxiao')}}</li>-->
      </ul>
    </div>
    <div class="chooseclass" style="padding-left: 20px">
      <span>{{$t('zhiHuiSchool.jiechuxiaojilu.banji')}}:</span>
      <ul>
        <li v-for="(sing,i) in class_info" :class="sing.classId==class_xuanzhong?'focus':''"
            @click="changeB(sing.className,sing.classId)">
          {{sing.className}}
        </li>
        <!--<li>{{$t('zhiHuiSchool.jiechuxiaojilu.quanxiao')}}</li>-->
      </ul>
    </div>
    <div class="choosedata" style="padding-left: 20px">
      <span>{{$t('zhiHuiSchool.jiechuxiaojilu.xuanzeriqi')}}:</span>
      <div class="ml25 f_l">
        <div class="block">
          <el-date-picker
            v-model="first_value_time"
            @change="changejingTime"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('zhiHuiSchool.jiechuxiaojilu.xuanzeriqishijian')">
          </el-date-picker>
        </div>
      </div>
    </div>

    <div class="ktbg-content mt20 clearfix">

      <div class="col-16-16" style="padding: 0 1%">

        <div class="line-chart-box">
          <div class="title_zhihui t_l">
            <div class="col-8-16">
              <span class="mr20 ">{{$t('zhiHuiSchool.all_share.jichuxiaojilu')}}</span>
            </div>
            <div class="col-8-16 t_r">
              <span class="mr20 kaoqinshezhi" @click="dialogKQVisible= true">{{$t('zhiHuiSchool.jiechuxiaojilu.kaoqinshezhi')}}</span>
            </div>
          </div>
          <div id="line_chart">

          </div>
        </div>
        <div class="piechart_box_z">
          <div class="title_zhihui t_l">
            <div class="col-4-16">
              <span class="mr20 ">{{$t('zhiHuiSchool.jiechuxiaojilu.kaoqintongji')}}</span>
            </div>
            <!--  <div class="col-8-16 t_c">
                <i class="el-icon-arrow-left" @click="class_sub"></i>
                <div style="width: 100px;height: 40px;display: inline-grid">
                  <span class="banji_pie" v-for="item in kqTJData" :class="item.classId==class_choose?'choose':'nochoose'">一年级{{item.className}}班</span>
                </div>
                <i class="el-icon-arrow-right" @click="class_add"></i>
              </div>-->
          </div>

          <div class="pie-chart-box-zhihui"></div>

        </div>

      </div>
      <!--<div class="title_zhihui t_l">-->
      <!--<div class="col-8-16">-->
      <!--<span class="mr20 ">{{$t('zhiHuiSchool.all_share.jichuxiaojilu')}}</span>-->
      <!--</div>-->
      <!--<div class="col-8-16 t_r">-->
      <!--<span class="mr20 kaoqinshezhi" >{{$t('zhiHuiSchool.jiechuxiaojilu.kaoqinshezhi')}}</span>-->
      <!--</div>-->

      <!--</div>-->
      <!---->
      <!--<div class="left clearfix left-new" id="line_chart">-->
    </div>

    <div class="zhihuiBox no-padding ">
      <div class=" l_h40" style="padding: 0 25px;font-size: 18px;background-color: white;width: 98%;margin-left: 1%">
        详细记录表
      </div>
      <div class="col-16-16" style="padding: 0 25px">
        <el-table
          :data="slicdata_j()"
          :border='false'
          :header-cell-style="{background:'#e4eaf1'}"
          style="width: 100%">
          <el-table-column align="center" prop="classId" :formatter="filterClassName" :label="$t('zhiHuiSchool.jiechuxiaojilu.banji')"
                           width="180"></el-table-column>
          <el-table-column align="center" prop="studentCode" :label="$t('zhiHuiSchool.jiechuxiaojilu.xuehao')"
                           width="180"></el-table-column>
          <el-table-column align="center" prop="studentName" :label="$t('zhiHuiSchool.jiechuxiaojilu.xingming')">
            <template slot-scope="scope">
              <span>{{scope.row.studentName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sex" :formatter="filterSex"
                           :label="$t('zhiHuiSchool.jiechuxiaojilu.xingbie')">

          </el-table-column>
          <el-table-column align="center" prop="entranceStatus" :label="$t('zhiHuiSchool.jiechuxiaojilu.xingwei')">
            <template slot-scope="scope">
              <span :style="{color:scope.row.entranceStatus==='1'? '#58abed':'#D60000'}">{{scope.row.entranceStatus==='1'? '进校':'出校'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="detectTime" :formatter="formatterTime"
                           :label="$t('zhiHuiSchool.jiechuxiaojilu.shijian')"></el-table-column>
          <el-table-column align="center" prop="degree" :formatter="formatterDegree"
                           :label="$t('zhiHuiSchool.jiechuxiaojilu.tiwen')+'℃'"></el-table-column>
        </el-table>
      </div>
      <div class="col-16-16 t_c">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagesize"
          :total="this.total_table.length"
          @current-change="current_change">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="$t('zhiHuiSchool.jiechuxiaojilu.kaoqinshezhi')" :visible.sync="dialogKQVisible" width="30%">
      <div class="kaoqing_dio">
        <div class="nav_diog_l f14">
          上午考勤：
        </div>
        <div class="nav_diog_r">
          <div class="block">
            <el-date-picker
              v-model="value_time_morn"
              style="width: 100%"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>


      </div>
      <div class="kaoqing_dio">
        <div class="nav_diog_l f14">
          下午考勤：
        </div>
        <div class="nav_diog_r">
          <div class="block">
            <el-date-picker
              v-model="value_time_after"
              style="width: 100%"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>


      </div>

      <div class="kaoqing_dio">
        <div class="nav_diog_l f14">
          迟到设置：
        </div>
        <div class="nav_diog_r">
          <el-time-picker
            v-model="value_chi"
            :picker-options="{
              selectableRange: '7:00:00 -12:00:00'
                }"
            style="width: 100%"
            placeholder="晚于">
          </el-time-picker>
        </div>


      </div>
      <div class="kaoqing_dio">
        <div class="nav_diog_l f14">
          早退设置：
        </div>
        <div class="nav_diog_r">
          <el-time-picker
            v-model="value_tui"
            :picker-options="{
              selectableRange: '14:00:00 -20:00:00'
                }"
            style="width: 100%"
            placeholder="早于">
          </el-time-picker>
        </div>


      </div>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogsettingVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="dialogKQVisible = false;" style="width: 100%;background-color:#82b64a">{{$t('message.queding')}}</el-button>
  </span>
    </el-dialog>
    <div class=" kaoqin_box alert-box animated fadeIn alertType" style="display:none">
      <div class="alert-box formType animated fadeIn">
        <div class="alert-div form-box back_white animated fadeInDownBig" style="margin-top: -161.5px;">
          <form id="loadRealia" action="loadRealiaExcel.do" method="post" enctype="multipart/form-realia">
            <div class="form-head t_r"><a class="close-btn f18" href="javascript:;">×</a></div>
            <h3 class="form-title t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.jinchuxiaokaoqinshezhi')}}</h3>
            <div class="form-content ">
              <div class="form-inline clearfix mt10 file-root">
                <div class="col-6-32 no-padding t_c">上午考勤</div>
                <div class="col-12-32 no-padding"><input type="time"></div>
                <div class="col-2-32 no-padding t_c">至</div>
                <div class="col-12-32 no-padding"><input type="time"></div>
              </div>
              <div class="form-inline clearfix mt10 file-root">
                <div class="col-6-32 no-padding t_c">下午考勤</div>
                <div class="col-12-32 no-padding"><input type="time"></div>
                <div class="col-2-32 no-padding t_c">至</div>
                <div class="col-12-32 no-padding"><input type="time"></div>
              </div>
              <div class="form-inline clearfix mt10 file-root">
                <div class="col-6-32 no-padding t_c">
                  {{$t('zhiHuiSchool.jiechuxiaojilu.chidao')}}{{$t('zhiHuiSchool.jiechuxiaojilu.shizhi')}}
                </div>
                <div class="col-6-32 no-padding t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.wanyu')}}</div>
                <div class="col-12-32 no-padding"><input type="time"></div>
              </div>
              <div class="form-inline clearfix mt10 file-root">
                <div class="col-6-32 no-padding t_c">
                  {{$t('zhiHuiSchool.jiechuxiaojilu.zaotui')}}{{$t('zhiHuiSchool.jiechuxiaojilu.shizhi')}}
                </div>
                <div class="col-6-32 no-padding t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.zaoyu')}}</div>
                <div class="col-12-32 no-padding"><input type="time"></div>
              </div>

              <div class="form-line submitBtn mt10 clearfix">
                <a href="javascript:;" class="queding blockBtn themeBtn form-confirm">{{$t('message.queding')}}</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        picker_input: this.$t('zhiHuiSchool.jiechuxiaojilu.xuanzeriqishijian'),
        grade_xuanzhong: '',
        class_xuanzhong: '',
        grade_id: [],
        class_id: [],
        grade_num: ['一', '二', '三', '四', '五', '六'],
        class_info: [],
        msg: 'Welcome to Your Vue.js App',
        time: ['14', '15', '16', '17', '18', '19', '20', '21',
          '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',
          '32', '33', '34', '35', '36', '37', '38'],
        data_inSchool: ['','',11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12],
        data_outSchool: [1, 2, 2, 5, 3, 2, 0, 1, 2, 2, 5, 3],
        LineData_total: null,
        piedata: [
            {value: 666, name: '正常'},
            {value: 110, name: '早退'},
            {value: 134, name: '缺勤'},
            {value: 135, name: '迟到'}
        ],
        //弹窗时间
        value_time_morn: '',
        value_time_after: '',
        value_chi: '',
        value_tui: '',

        first_value_time: '',
        // class_arr: ['1', '2', '3'],
        class_choose: "",  //考情选择的当前班级
        pieChart: null,
        LineChart: null,
        dialogKQVisible: false,    //考勤tanchaung
        tableData: [
          {
            studentEntranceId: '12',
            studentCode: '1',
            studentName: '张三',
            classId: '4545',
            grade: '一年级',
            schoolId: '788',
            detectTime: '9:00',
            entranceStatus: '1',
            deviceMac: 'hh555',
            sex: '1',
            className: '（1）班',
            degree: 367
          },
          {
            studentEntranceId: '12',
            studentCode: '15',
            studentName: '李四三',
            classId: '4545',
            grade: '一年级',
            schoolId: '788',
            detectTime: '15:00',
            entranceStatus: '2',
            deviceMac: 'hh555',
            sex: '2',
            className: '（5）班',
            degree: 377
          },
          {
            studentEntranceId: '12',
            studentCode: '154',
            studentName: '李四77',
            classId: '445',
            grade: '一年级',
            schoolId: '788',
            detectTime: '15:00',
            entranceStatus: '2',
            deviceMac: 'hh555',
            sex: '0',
            className: '（7）班',
            degree: 377
          }
        ],
        school_info: [
          {
            "grade": "一年级",
            "gradeId": '1',
            "grade_info": [{
              "classId": "9387",//班级id
              "className": "一班",//班级名称
            },
              {
                "classId": "9386",//班级id
                "className": "二班",//班级名称
              }]
          },
          {
            "grade": "二年级",//班级id
            "gradeId": '2',
            "grade_info": [{
              "classId": "9385",//班级id
              "className": "一班",//班级名称
            }, {
              "classId": "9384",//班级id
              "className": "二班",//班级名称
            }, {
              "classId": "9383",//班级id
              "className": "三班",//班级名称
            }
            ]
          },

        ],
        //  表格分页标签  数据像
        total_table: [],//默认数据总数

        pagesize: 10,//每页的数据条数

        currentPage: 1,//默认开始页面}


        kqTJData: []
      }
    },
    mounted() {
      let that = this

      /*      //获取考情数据
            this.getkQData()*/

      //获取表格的数据
      // this.getXXTable()

      //获取年级信息数据
      this.getNavData()


      this.line_zhihui($('#line_chart')[0], this.time, this.data_inSchool, this.data_outSchool)

      this.pie_zhihui($('.pie-chart-box-zhihui')[0], '', this.piedata)

    },
    methods: {
      line_zhihui(div, xdata, data_inSchool, data_outSchool) {
        this.LineChart = echarts.init(div);
        let option = {
          // title: {
          //     text: '未来一周气温变化',
          //     subtext: '纯属虚构'
          // },
          color: ['#58abed', '#D60000'],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return params[0].name + '<br/>'
                + params[0].marker + params[0].seriesName + ' : ' + params[0].value + ' 人<br/>'
                + params[1].marker + params[1].seriesName + ' : ' + params[1].value + '人';
            }
          },
          legend: {
            data: [this.$t('zhiHuiSchool.jiechuxiaojilu.ruxiao'), this.$t('zhiHuiSchool.jiechuxiaojilu.chuxiao')]
          },
          grid: {
            left: '5%',
            top: '5%',
            bottom: '12%',
            right: '5%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            nameGap: 5,
            data: xdata,
            axisLabel: {
              margin: 10,
              textStyle: {
                // fontSize: 14,
                color: '#909399'
              },
              formatter: (d) => {
                let h = d / 2
                let m = d % 2
                if (m == 0) {
                  return parseInt(h) + ":00"
                } else {
                  return parseInt(h) + ":30"
                }
              }
            },
            axisLine: {
              lineStyle: {
                color: '#909399'
              }
            },
          },
          yAxis: {
            // show:false,
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                color: '#909399'
              }
            },

          },
          series: [
            {
              name: '入校',
              type: 'line',
              smooth: true,
              data: data_inSchool,
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(88,171, 237, 0.3)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(88,171, 237, 0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              }
            },
            {
              name: '出校',
              type: 'line',
              smooth: true,
              data: data_outSchool,
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(214, 0, 0, 0.3)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(214, 0, 0, 0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },

            }
          ]
        };
        this.LineChart.setOption(option, true);
      },
      pie_zhihui(div, grade, data) {
        this.pieChart = echarts.init(div);
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
          },
          backgroundColor: '#fff',
          title: {
            text: grade,
            x: '32%',
            y: '45%',
          },

          color: ['#96a5c2', '#37a2da', '#ffdb5c', '#96d771'],
          legend: {
            orient: 'vertical',
            right: ' 10%',
            top: '30%',
            data: ['正常', '早退', '缺勤', '迟到']
          },
          series: [
            {
              type: 'pie',
              radius: ['35%', '50%'],
              center: ['40%', '50%'],
              // avoidLabelOverlap: false,
              // label: {
              //   // normal: {
              //   //     show: false,
              //   //     position: 'center'
              //   // },
              //
              //   textStyle: {
              //     fontSize: '16',
              //     fontWeight: 'bold'
              //   }
              //
              // },
              // labelLine: {
              //     normal: {
              //         show: false
              //     }
              // },
              data: data
            }
          ]
        };
        this.pieChart.setOption(option, true);
      },
      updataLineChart(data_inSchool, data_outSchool) {
        this.LineChart.setOption({
          series: [
            {
              name: '入校',
              data: data_inSchool,
            },
            {
              name: '出校',
              data: data_outSchool,
            },
          ]
        })
      },
      updataPieChart(data) {
        this.pieChart.setOption({
          series: [
            {data: data}
          ]
        })
      },

      filterClassName(value, row, column){
        let arr = this.school_info
        let gradeN
        let classN
        let arr2
        for (let i in arr){
          if (arr[i].grade == value.grade) {
            arr2=  arr[i].classInfo
            gradeN = arr[i].gradeName
            break
          }
        }
        for (let i in arr2){
          if (arr2[i].classId == column) {
            classN =arr2[i].className
            break
          }
        }
       return gradeN+classN
      },
      filterSex(value, row, column) {
        let sex
        switch (column * 1) {
          case 1:
            sex = '男';
            break;
          case 2:
            sex = '女';
            break;
          default :
            sex = '未知';
            break;
        }
        return sex
      },
      formatterDegree(row, column, cellValue) {
        return cellValue / 10
      },
      formatterTime(row, column, cellValue){
        return cellValue[0]+':'+cellValue[1]+':'+cellValue[2]+' ' +
          cellValue[3]+':'+cellValue[4]+':'+cellValue[5]
      },


      //考勤数据
      async getkQData(url) {
        try {
          let resdate = await this.$axios.get(url)

          this.kqTJData = await resdate.data
          console.log(resdate.data)

        } catch (err) {
          // alert('考勤数据请求报错')
        }
      },
      //线图数据
      async getLineData(url) {
        try {
          let resdate = await this.$axios.get(url)

          let str = resdate.data
          let strobj=eval('(' + str + ')')
          this.LineData_total = strobj

          console.log(strobj)

          /*   this.kqTJData= await resdate.data
             console.log(this.kqTJData)*/
        } catch (err) {
          // alert('考勤数据请求报错')
        }
      },
      //详细记录表的数据
      async getXXTable(date) {

        let pdata = await this.$axios.post("api/dy-heat/studentEntrance/getStudentEntrance", date)

        this.total_table= await pdata.data

        console.log(pdata.data)

      },


      //当前考勤数据
      getNowkQdata(banji_id) {
        let t = banji_id.toString()
        let data = this.kqTJData
        console.log(data)
        if (data){
          let first_p = [
            {value: data[t].normal, name: '正常'},
            {value: data[t].leaveEarly, name: '早退'},
            {value: data[t].absenteeism, name: '缺勤'},
            {value: data[t].late, name: '迟到'}
          ]
          this.piedata = first_p

          this.updataPieChart(first_p)
        }

      },
      getNowLinedata(cl_id) {
        console.log(this.LineData_total)
        let n_data = this.LineData_total
        let inS=[]
        let outS=[]

        if (n_data) {
          for (let i=0;i<this.time.length;i++){
            let key =this.time[i]
            if (n_data.classInMap[key]) {
              inS.push(n_data.classInMap[key][cl_id])
            }else {
              inS.push('')
            }
            if (n_data.classOutMap[key]) {
              outS.push(n_data.classOutMap[key][cl_id])
            }else {
              outS.push('')
            }
          }
        }
        this.updataLineChart(inS,outS)
      },

      //获取学校班级信息
      async getNavData() {
        try {
          let that = this
          let resdate = await this.$axios.get('api/dy-heat/school/getSchoolInfo')

          that.school_info = await resdate.data
          that.grade_xuanzhong = that.school_info[0].grade
          that.nav_class_info(that.grade_xuanzhong)
        } catch (err) {
          // alert('班级信息请求报错')
        }


      },
      changeN:function(grade_n) {
        this.grade_xuanzhong = grade_n


        this.nav_class_info(grade_n)

        /* if (!this.class_xuanzhong){

         } */
      },
      changeB:function(title, class_n) {
        this.class_xuanzhong = class_n
        let date_1

        if (this.first_value_time) {
          let y = this.first_value_time.substring(0, 4)
          let m = this.first_value_time.substring(5, 7)
          let d = this.first_value_time.substring(8, 10)
          date_1 = {
            classId :class_n,
            detectTimeStart: new Date(y*1, m*1-1, d*1, 8, 0, 0),
            detectTimeEnd: new Date(y*1, m*1-1, d*1+1, 7, 59, 59)
          }
          this.getXXTable(date_1)
          this.getNowLinedata(class_n)   //根据班级id 换此时线图数据数据
          this.getNowkQdata(class_n)   //根据班级id 换考勤统计数据
        }


      },
      nav_class_info(id) {
        let that = this
        that.class_info = []
        for (let i = 0; i < that.school_info.length; i++) {
          if (id == that.school_info[i].grade) {
            that.class_info = that.school_info[i].classInfo
            that.class_xuanzhong = ''

            // this.getNowkQdata(that.class_xuanzhong)
            break
          }
        }
      },
      async changejingTime() {
        let time = this.first_value_time
        let date_2
        if (this.class_xuanzhong) {
          let y = this.first_value_time.substring(0, 4)
          let m = this.first_value_time.substring(5, 7)
          let d = this.first_value_time.substring(8, 10)
          /*         let start = new Date(y, m-1, d, 8, 0, 0)
                   let end = new Date(y, m-1, d+1, 7, 59, 59)*/
          date_2 = {
            classId :this.class_xuanzhong,
            detectTimeStart: new Date(y*1, m*1-1, d*1, 8, 0, 0),
            detectTimeEnd: new Date(y*1, m*1-1, d*1+1, 7, 59, 59)
          }
          this.getXXTable(date_2)
        }
        await this.getkQData('api/dy-heat/studentEntrance/selectAttendance/' + time)
        await this.getLineData('api/dy-heat/studentEntranceStatistics/getStudentEntranceStatistics/' + time)

        if (this.class_xuanzhong && this.grade_xuanzhong) {
          this.getNowLinedata(this.class_xuanzhong)
          this.getNowkQdata(this.class_xuanzhong)
        }
      },
      slicdata_j(){
        return this.total_table.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      },
      current_change:function (currentPage) {
        this.currentPage = currentPage;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../common/css/main.less";

  .line-chart-box {
    width: 55%;
    height: 400px;
    background-color: white;
    float: left;
  }

  .piechart_box_z {
    width: 44%;
    height: 400px;
    margin-left: 1%;
    background-color: white;
    float: left;
    i {
      width: 25px;
      height: 25px;
      border: 1px solid #cfcfcf;
      line-height: 25px;
    }
    .pie-chart-box-zhihui {
      width: 100%;
      height: 355px;
      &.choose {
        display: block;
      }
      &.nochoose {
        display: none;
      }
    }
  }

  #line_chart {
    width: 100%;
    height: 355px;
    /*background-color: red;*/
  }

  .banji_pie {
    display: none;
    &.choose {
      display: block;
    }
    &.nochoose {
      display: none;
    }
  }

  .has-gutter {
    background-color: #e4eaf1;
  }

  .kaoqing_dio {
    width: 90%;
    margin: 0 auto;
    height: 50px;
    .nav_diog_l {
      /*width: 20%;*/
      height: 50px;
      line-height: 50px;
      float: left;
    }
    .nav_diog_r {
      width: 80%;
      margin-left: 10px;
      float: left;
      height: 50px;
      line-height: 50px;
    }
  }
</style>
