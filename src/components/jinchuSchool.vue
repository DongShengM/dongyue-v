<template>
  <div>


    <div style="clear:both;"></div>
    <div class="choosegrade" style="padding-left: 20px">
      <span>{{$t('zhiHuiSchool.jiechuxiaojilu.nianji')}}:</span>
      <ul>
        <li v-for="sing in grade_num" :class="sing==grade_xuanzhong?'focus':''">
          {{sing}}{{$t('zhiHuiSchool.jiechuxiaojilu.nianji')}}
        </li>
        <li>{{$t('zhiHuiSchool.jiechuxiaojilu.quanxiao')}}</li>
      </ul>
    </div>
    <div class="chooseclass" style="padding-left: 20px">
      <span>{{$t('zhiHuiSchool.jiechuxiaojilu.banji')}}:</span>
      <ul>
        <li v-for="sing in grade_num" :class="sing==grade_xuanzhong?'focus':''">
          {{sing}}{{$t('zhiHuiSchool.jiechuxiaojilu.nianji')}}一班
        </li>

        <li>{{$t('zhiHuiSchool.jiechuxiaojilu.quanxiao')}}</li>
      </ul>
    </div>
    <div class="choosedata" style="padding-left: 20px">
      <span>{{$t('zhiHuiSchool.jiechuxiaojilu.xuanzeriqi')}}:</span>
      <div class="ml25 f_l">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="datetime"
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
            <div class="col-8-16 t_c">
              <i class="el-icon-arrow-left" @click="class_sub"></i>
              <div style="width: 100px;height: 40px;display: inline-grid">
                <span class="banji_pie" v-for="item in kqTJData" :class="item.className==class_choose?'choose':'nochoose'">一年级{{item.className}}班</span>
              </div>
              <i class="el-icon-arrow-right" @click="class_add"></i>
            </div>
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
        <!-- <div class="zhihui_table">
           <div class="col-16-16  col_hei f16">
             <div class="col-2-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.banji')}}</div>
             <div class="col-2-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.xuehao')}}</div>
             <div class="col-2-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.xingming')}}</div>
             <div class="col-2-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.xingbie')}}</div>
             <div class="col-3-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.xingwei')}}</div>
             <div class="col-3-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.shijian')}}</div>
             <div class="col-2-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.tiwen')}}</div>
           </div>
           <div class="col-16-16 normal_back_white col_hei f16">
             <div class="col-2-16 t_c">一{{$t('zhiHuiSchool.jiechuxiaojilu.nianji')}}一班</div>
             <div class="col-2-16 t_c">1</div>
             <div class="col-2-16 t_c">王可可</div>
             <div class="col-2-16 t_c">男</div>
             <div class="col-3-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.ruxiao')}}</div>
             <div class="col-3-16 t_c">05-05 8:24</div>
             <div class="col-2-16 t_c">37℃</div>
           </div>
           <div class="col-16-16 normal_back_white col_hei f16">
             <div class="col-2-16 t_c">一{{$t('zhiHuiSchool.jiechuxiaojilu.nianji')}}一班</div>
             <div class="col-2-16 t_c">1</div>
             <div class="col-2-16 t_c">王可可</div>
             <div class="col-2-16 t_c">男</div>
             <div class="col-3-16 t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.ruxiao')}}</div>
             <div class="col-3-16 t_c">05-05 8:24</div>
             <div class="col-2-16 t_c">37℃</div>
           </div>
         </div>-->
        <el-table
          :data="tableData"
          :border='false'
          :header-cell-style="{background:'#e4eaf1'}"
          style="width: 100%">
          <el-table-column align="center" prop="className" :label="$t('zhiHuiSchool.jiechuxiaojilu.banji')" width="180"></el-table-column>
          <el-table-column align="center" prop="studentCode" :label="$t('zhiHuiSchool.jiechuxiaojilu.xuehao')" width="180"></el-table-column>
          <el-table-column align="center" prop="studentName" :label="$t('zhiHuiSchool.jiechuxiaojilu.xingming')">
            <template slot-scope="scope">
              <span >{{scope.row.studentName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sex" :formatter="filterSex"  :label="$t('zhiHuiSchool.jiechuxiaojilu.xingbie')">

          </el-table-column>
          <el-table-column align="center" prop="entranceStatus" :label="$t('zhiHuiSchool.jiechuxiaojilu.xingwei')">
            <template slot-scope="scope">
              <span :style="{color:scope.row.entranceStatus==='1'? '#58abed':'#D60000'}">{{scope.row.entranceStatus==='1'? '进校':'出校'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="detectTime" :label="$t('zhiHuiSchool.jiechuxiaojilu.shijian')"></el-table-column>
          <el-table-column align="center" prop="degree" :formatter="formatterDegree" :label="$t('zhiHuiSchool.jiechuxiaojilu.tiwen')+'℃'"></el-table-column>
        </el-table>
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
        grade_xuanzhong: '一',
        grade_num: ['一', '二', '三', '四', '五', '六'],
        msg: 'Welcome to Your Vue.js App',
        time: ['7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30',
          '14:30', '15:00', '15:30', '16:00', '16:30'],
        data_inSchool: [11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12],
        data_outSchool: [1, 2, 2, 5, 3, 2, 0, 1, 2, 2,5, 3],
        piedata: [
          {value: 666, name: '正常'},
          {value: 110, name: '早退'},
          {value: 134, name: '缺勤'},
          {value: 135, name: '迟到'}
        ],
        //弹窗时间
        value_time_morn:'',
        value_time_after:'',
        value_chi:'',
        value_tui:'',

        value1: '',
        // class_arr: ['1', '2', '3'],
        class_choose:"1",
        pieChart: null,
        dialogKQVisible:false,    //考勤tanchaung
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
        kqTJData:[
            {//班级id
              "classId": "9388",//班级id
              "className": "1",//班级名称
              "grade": 12,//年级
              "late": 12,//迟到
              "leaveEarly": 23,//早退
              "absenteeism": 14,//缺勤
              "normal": 45//正常
            },
             {//班级id
              "classId": "9387",//班级id
              "className": "2",//班级名称
              "grade": 12,//年级
              "late": 5,//迟到
              "leaveEarly": 10,//早退
              "absenteeism": 6,//缺勤
              "normal": 30//正常
            }
        ]
      }
    },
    mounted() {

      // $('.kaoqinshezhi').click(function () {
      //   $('.alert-box').css('display', 'block');
      // })
      // $(".close-btn").click(function () {
      //   $('.alert-box').css('display', 'none');
      // });
      // $(".queding").click(function () {
      //   $('.alert-box').css('display', 'none');
      // });
      this.line_zhihui($('#line_chart')[0], this.time, this.data_inSchool, this.data_outSchool)

      // $('.pie-chart-box-zhihui')[0].style.height=$('.pie-chart-box-zhihui')[0].clientWidth-7+'px'
      // $('.pie-chart-box-zhihui')[1].style.height=$('.pie-chart-box-zhihui')[1].clientWidth-7+'px'
      this.pie_zhihui($('.pie-chart-box-zhihui')[0], '一年级一班', this.piedata)
      // this.pie_zhihui( $('.pie-chart-box-zhihui')[1],'一年级二班',this.piedata)
    },
    methods: {
      line_zhihui(div, xdata, data_inSchool, data_outSchool) {
        let myChart = echarts.init(div);
        let option = {
          // title: {
          //     text: '未来一周气温变化',
          //     subtext: '纯属虚构'
          // },
          color:['#58abed','#D60000'],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return params[0].name + '<br/>'
                + params[0].marker + params[0].seriesName + ' : ' + params[0].value + ' 人<br/>'
                + params[1].marker + params[1].seriesName + ' : ' + -params[1].value + '人';
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
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            nameGap:5,
            data: xdata,
            axisLabel: {
              margin: 10,
              textStyle: {
                // fontSize: 14,
                color: '#909399'
              }
            },
            axisLine:{
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
            axisLine:{
              show:false
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
        myChart.setOption(option, true);
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

          color:['#96a5c2','#37a2da','#ffdb5c','#96d771'],
          legend: {
              orient: 'vertical',
            right:' 10%',
            top: '30%',
              data:['正常','早退','缺勤','迟到']
          },
          series: [
            {
              type: 'pie',
              radius: ['35%', '50%'],
              center:['40%','50%'],
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
      updataPieChart(title, data) {
        this.pieChart.setOption({
          title: {
            text: title
          },
          series: [
            {data: data}
          ]
        })
      },

      //考勤统计的左右
      class_add() {
        if (this.class_choose < this.kqTJData.length) {
          this.class_choose++
          this.updataPieChart("一年级"+this.class_choose+"班", this.change_pieData(this.class_choose-1))
        }
      },
      class_sub() {
        if (this.class_choose > 1) {
          this.class_choose--
          console.log(this.class_choose + '  ' + this.piedata)
          this.updataPieChart("一年级"+this.class_choose+"班", this.change_pieData(this.class_choose-1))
        }
      },

      filterSex(value, row, column){
        let sex
        switch (column*1){
          case 1:sex='男';break;
          case 2:sex='女';break;
          default :sex='未知';break;
        }
        return  sex
      },
      formatterDegree(row, column, cellValue){
        return cellValue/10
      },
      change_pieData(num){
        let arr = []
       let late =  this.kqTJData[num].late
       let leaveEarly =  this.kqTJData[num].leaveEarly
       let absenteeism =  this.kqTJData[num].absenteeism
       let normal =  this.kqTJData[num].normal
        arr=[ {value: late, name: '正常'},
          {value: leaveEarly, name: '早退'},
          {value: absenteeism, name: '缺勤'},
          {value: normal, name: '迟到'}
      ]

        console.log(arr)
        return arr
      }

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
  .has-gutter{
    background-color: #e4eaf1;
  }
  .kaoqing_dio{
    width: 90%;
    margin: 0 auto;
    height: 50px;
    .nav_diog_l{
      /*width: 20%;*/
      height: 50px;
      line-height: 50px;
      float: left;
    }
    .nav_diog_r{
      width: 80%;
      margin-left: 10px;
      float: left;
      height: 50px;
      line-height: 50px;
    }
  }
</style>
