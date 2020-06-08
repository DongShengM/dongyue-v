<template>
<div>

  <div style="clear:both;"></div>

  <div class="choosegrade" style="padding-left: 20px;height: 70px;line-height: 70px">
    <div class="col-16-16">
     <div class="nav_box">
       <div class="btn_box">7天</div>
       <div class="btn_box">1月</div>
       <div class="btn_box">3月</div>
     </div>
      <div class="nav_box" style="width: 30%">
        <div class="block">
          <el-date-picker
            v-model="value_time"
            style="width: 100%"
            @change="changeTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </div>
      <div class="nav_box" style="width: 10%">
        <el-button style="width: 100%" plain type="primary"@click="testCheck">
          查询
        </el-button>
      </div>
      <!--<div class="nav_box">-->

      <!--</div>-->
    </div>

  </div>

  <div class=" " style="padding:10px 10px 20px 20px; overflow:auto">
    <div class="new_jieduan_box">
      <div class="jiduanbox_child">
        <div class="title_zhihui t_l">
          <div class="col-16-16">
            <span class="mr20 f16">{{$t('zhiHuiSchool.all_share.tiwentongji')}}</span>
          </div>
          </div>
        <div class="wendu_togji info_nox" style="height: 300px" >
        </div>
      </div>
      <div class="jiduanbox_child">
        <div class="title_zhihui t_l">
          <div class="col-16-16">
            <span class="mr20 f16">{{$t('zhiHuiSchool.all_share.jichuxiaojilu')}}</span>
          </div>
          </div>
        <div class="cb_school info_nox" style="height: 300px" >
        </div>
      </div>
      <div class="jiduanbox_child">
        <div class="title_zhihui t_l">
          <div class="col-16-16">
            <span class="mr20 f16">{{$t('zhiHuiSchool.jieduantongji.tiwyichangbanji')}}</span>
          </div>
        </div>
        <div class="info_nox">
          <el-table  :data="slicdata_e()"
                     style="width: 100%" :show-header="false" >
            <el-table-column align="center" property="className" label="班级" :max-height="20"></el-table-column>
            <el-table-column align="center" property="studentNum" label="人数" :max-height="20"></el-table-column>
          </el-table>
        </div>

        <div class="col-16-16 t_c">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pagesize"
            :total="this.allPage_e"
            @current-change="current_change_e">
          </el-pagination>
        </div>

      </div>
      <div class="jiduanbox_child">
        <div class="title_zhihui t_l">
          <div class="col-16-16">
            <span class="mr20 f16">{{$t('zhiHuiSchool.jieduantongji.kaoqinpaihang')}}</span>
          </div>
        </div>
        <div class="info_nox" >
          <el-table  :data="this.table_data_k"
                     style="width: 100%" :show-header="false" >
            <el-table-column align="center" type="index" width="50"></el-table-column>
            <el-table-column align="center" property="grade" label="班级" :max-height="20">
              <template slot-scope="scope">
                <span >{{scope.row.gradeName}}{{scope.row.className}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" property="normal" label="出勤" :max-height="20">
              <template slot-scope="scope">
                <span >出勤：{{scope.row.normal}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" property="late" label="迟到" :max-height="20">
              <template slot-scope="scope">
                <span >迟到：{{scope.row.late}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" property="absenteeism" label="缺勤" :max-height="20">
              <template slot-scope="scope">
                <span >缺勤：{{scope.row.absenteeism}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-16-16 t_c">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pagesize"
            :total="this.table_data_k.length"
            @current-change="current_change">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'
    export default {
        name: "TemperatureVital",
      data(){
          return{
            //体温统计
            //正常学生
            normalStudent:10,
            //异常学生
            abnormalStudent:12,
            //总测试
            allTest:13,
            //总学生
            allStudent:100,
            //总异常
            allAbnormal:15,
            //在校生
            inSchoolStudent:30,
            //查出来的学生正常和异常的人数
            wendunum:[
              {value:10,name:'正常'},
              {value:10,name:'异常'}
            ],
            //左边图的总人数
            leftChartNum:0,

            //进出校记录
            sim_data:[
              {value:666, name:'正常'},
              {value:135, name:'早退'},
              {value:134, name:'缺勤'},
              {value:135, name:'迟到'}

            ],

            //体温异常班级
            table_data_cl:[{
              className: '一年级一班',
              studentNum: '13',
            }, {
              className: '一年级一班',
              studentNum: '15',
            }, {
              className: '一年级一班',
              studentNum: '12',
            }, {
              className: '一年级一班',
              studentNum: '17',
            }],

            //分页 数据
            total_table_e:[],
            //每页条数
            pagesize_e:5,
            //翻到的页数
            currentPage_e: 1,
            //总页数
            allPage_e:4,

            testData:"",
            totalTestPeople:2500,
            inSchoolPeople:500,
            totalBadPeople:51,
            badTemperClass:[{class_n:'一年级一班',number:'3'},
              {class_n:'一年级三班',number:'3'},
              {class_n:'一年级二班',number:'3'},
              {class_n:'二年级一班',number:'3'},
              {class_n:'二年级二班',number:'3'}
            ],
            kaoQinInfo:[[],[],[],[]],

            pieChart:null,
            pieChart2:null,



            value_time:'',

            //  表格分页标签  数据像
            total_table: [],//默认数据总数

            pagesize: 5,//每页的数据条数

            currentPage_e: 1,//默认开始页面}
            table_data_k:[{
                    "studentClassAttendanceId": 19,
                    "classId": 9391,  //班级id
                    "className": "(1)班",//班级名称
                    "grade": 13,   //年级id
                    "gradeName": "初三", //年级名称
                    "schoolId": 710,  //学校id
                    "late": 0,  //迟到
                    "leaveEarly": 0,  //早退
                    "absenteeism": 55,  //缺勤
                    "normal": 0,  //正常
                }]
        }
      },
      mounted(){
        this.getTemperatureTotal();
        //圆
        this.getEntranceSchool();

        //体温异常班级获取
        this.getAbnormalClassInfo();

        window.onresize = ()=>{
          this.pieChart.resize();
          this.pieChart2.resize();
        }
      },
      methods:{
        //获取体温统计
        async getTemperatureTotal(){
          try {
            let data = {
              "startTime": "2020-04-28T00:00",
              "endTime": "2020-04-29T00:00"
            }
            let Response = await this.$axios.post("/studentHeat/statisticsStudentHeat",data);
            console.log(Response.data.studentTotalCount);
              //测试接口
            //let Response = await this.$axios.get("http://rap2.taobao.org:38080/app/mock/255345/temperatureTotal");
            this.allStudent = Response.data.studentTotalCount;

            this.allAbnormal = Response.data.highTemperatureCount;
            this.allTest = Response.data.studentHeatCount;
            this.inSchoolStudent = Response.data.studentTotalCount;
            this.leftChartNum = Response.data.highTemperatureCount+Response.data.studentTotalCount+Response.data.studentHeatCount;
            this.wendunum = [
              {value:Response.data.normalStudentCount,name:'正常'},
              {value:Response.data.highTemperatureCount,name:'异常'}
            ];
            console.log(Response.data.lists)
            this.pie_wendu($('.wendu_togji')[0],this.leftChartNum,this.allAbnormal,this.inSchoolStudent,this.allTest,this.wendunum);
          }catch (err){

          }
        },
        //获取进出校记录统计
        async getEntranceSchool(){
          try {
            let Response = await this.$axios.get("http://rap2.taobao.org:38080/app/mock/255345/entranceSchool");

            this.sim_data = [
              {value: Response.data.normalNul, name: '正常'},
              {value: Response.data.leaveEarlyNum, name: '早退'},
              {value: Response.data.absenceNum, name: '缺勤'},
              {value: Response.data.lateNum, name: '迟到'}
            ];

            this.pie_sim($('.cb_school')[0], this.sim_data);
          }catch (err){

          }
        },
        //体温异常班级获取
        async getAbnormalClassInfo(){
          let data = {
            "startTime": "2020-04-28T00:00",
            "endTime": "2020-04-29T00:00"
          }
          //let Response = await this.$axios.get("http://rap2.taobao.org:38080/app/mock/255345/abnormalData");
          let Response = await this.$axios.post("/studentHeat/getHighDegreeClass",data);
          console.log(Response);
          //总数据
//          this.table_data_cl = Response.data.lists;
//          this.allPage_e = parseInt((Response.data.lists.length));
         //分页
//          this.total_table_e = this.slicdata_e();

        },
        //体温异常班级分页
        slicdata_e() {
          return this.table_data_cl.slice((this.currentPage_e-1)*this.pagesize_e,this.currentPage_e*this.pagesize_e)
        },
        //考勤排行数据获取
        current_change_e:function (currentPage) {
          this.currentPage_e = currentPage;
        },
        async testCheck(){

          let data = {
            "startTime": "2020-04-28T00:00",
            "endTime": "2020-04-29T00:00"
           }
          let Response = await this.$axios.post("/studentHeat/statisticsStudentHeat",data);
          console.log(Response);
        },
        pie_sim(div, data) {
          this.pieChart = echarts.init(div);
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            backgroundColor: '#fff',
            // title: {
            //   text: grade,
            //   x: '32%',
            //   y: '45%',
            // },

            // color:['#96d771','#37a2da','#ffdb5c'],
            color: ['#96a5c2', '#37a2da', '#ffdb5c', '#96d771'],
            legend: {
              // orient: 'vertical',
              right:' 38%',
              bottom: '7%',
              data:['正常','早退','缺勤','迟到']
            },
            series: [
              {
                type: 'pie',
                radius: ['35%', '50%'],
                center:['50%','50%'],
                // avoidLabelOverlap: false,
                label: {
                  normal: {
                      show: true,
                    formatter:function (d) {
                      return d.name+" : "+d.value+'人'
                    }
                  },

                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'bold'
                  }

                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: data
              }
            ]
          };
          this.pieChart.setOption(option, true);

        },

        pie_wendu(div , total_people,all_bad_people,inSchool_student,add_test_people,pie_huan_data) {
          this.pieChart2 = echarts.init(div);
          var placeHolderStyle = {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: "rgba(0,0,0,0)",
              borderWidth: 0
            },
            emphasis: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0
            }
          };


          /* var dataStyle = {
               normal: {
                   formatter: 'jgjhg{c}%',
                   position: 'center',
                   show: true,
                   textStyle: {
                       fontSize: '16',
                       fontWeight: 'normal',
                       color: '#34374E'
                   }
               }
           };*/
          let option = {
            backgroundColor: '#fff',

            color:['#96d771','#e18c9f'],
            title: [{
              left: '29.8%',
              top: '60%',
              textAlign: 'center',
              textStyle: {
                fontWeight: 'normal',
                fontSize: '16',
                color: '#AAAFC8',
                textAlign: 'center',
              },
            }, {
              left: '70%',
              top: '60%',
              textAlign: 'center',
              textStyle: {
                color: '#AAAFC8',
                fontWeight: 'normal',
                fontSize: '16',
                textAlign: 'center',
              },
            }],
//            tooltip: {
//              name:'园园',
//              trigger: 'item',
//              formatter: "{b}: {c} ({d}%)"
//            },
            legend: {
              // orient: 'vertical',
              right:' 40%',
              bottom: '7%',
              data:['正常','异常']
            },

            //第一个图表
            series: [{
              type: 'pie',
              hoverAnimation: false, //鼠标经过的特效
              radius: ['20%', '22%'],
              center: ['10%', '20%'],
              startAngle: 225,
              labelLine: {
                normal: {
                  show: false
                }
              },
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: total_people,      //总人数
                itemStyle: {
                  normal: {
                    color: '#E1E8EE'
                  }
                },
              }, {
                value: 35,
                itemStyle: placeHolderStyle,
              },

              ]
            },
              //上层环形配置
              {
                type: 'pie',
                hoverAnimation: false, //鼠标经过的特效
                radius: ['20%', '22%'],
                center: ['10%', '20%'],
                startAngle: 225,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  value: all_bad_people,     //累计异常人数
                  itemStyle: {
                    normal: {
                      color: '#e18c9f'
                    }
                  },
                  label: {
                    normal: {
                      formatter: '累计异常 \n {c}人',
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'normal',
                        color: '#34374E'
                      }
                    }
                  },
                }, {
                  value: this.leftChartNum,
                  itemStyle: placeHolderStyle,
                },

                ]
              },


              //第二个图表
              {
                type: 'pie',
                hoverAnimation: false,
                radius: ['20%', '22%'],
                center: ['10%', '50%'],
                startAngle: 225,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  value: total_people,
                  itemStyle: {
                    normal: {
                      color: '#E1E8EE'


                    }
                  },

                }, {
                  value: 35,
                  itemStyle: placeHolderStyle,
                },

                ]
              },

              //上层环形配置
              {
                type: 'pie',
                hoverAnimation: false,
                radius: ['20%', '22%'],
                center: ['10%', '50%'],
                startAngle: 225,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  value: inSchool_student,
                  itemStyle: {
                    normal: {
                      color: '#ffdb5c'
                    }
                  },
                  label: {
                    normal: {
                      formatter: '在校生\n{c}人',
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'normal',
                        color: '#34374E'
                      }
                    }
                  },
                }, {
                  value: this.leftChartNum,
                  itemStyle: placeHolderStyle,
                },

                ]
              },

              //第三个图表
              {
                type: 'pie',
                hoverAnimation: false,
                radius: ['20%', '22%'],
                center: ['10%', '80%'],
                startAngle: 225,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  value: total_people,
                  itemStyle: {
                    normal: {
                      color: '#E1E8EE'


                    }
                  },

                }, {
                  value: 35,
                  itemStyle: placeHolderStyle,
                },

                ]
              },

              //上层环形配置
              {
                type: 'pie',
                hoverAnimation: false,
                radius: ['20%', '22%'],
                center: ['10%', '80%'],
                startAngle: 225,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  value: add_test_people,
                  itemStyle: {
                    normal: {
                      color: '#37a2da'
                    }
                  },
                  label: {
                    normal: {
                      formatter: '累计测试 \n{c}人',
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'normal',
                        color: '#34374E'
                      }
                    }
                  },
                }, {
                  value: this.leftChartNum,
                  itemStyle: placeHolderStyle,
                },

                ]
              },
              {
                type: 'pie',

                radius: ['35%', '50%'],
                center:['53%','50%'],
                // avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    // position: 'center',
                    formatter:function (d) {
                      return d.name+" : "+d.value+'人'
                    }
                  },
                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'bold'
                  }

                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:pie_huan_data
              }
            ]
          };
          if (option && typeof option === "object") {
            this.pieChart2.setOption(option, true);
          }
        },

        changeTime(){
          let start = this.value_time[0]
          let end = this.value_time[1]


          let canshu = {
            "statisticsDateStart":start,
            "statisticsDateEnd":end,
          }

          console.log('aaddad')
          //进出校记录  饼图
          this.getNewKQTable(canshu)
          this.getkQPHdata(canshu)
        },
        updataPieChart(data) {
          this.pieChart.setOption({
            series: [
              {data: data}
            ]
          })
        },
        //当前考勤排行
        async getkQPHdata(date) {
          let pdata = await this.$axios.post("/studentClassAttendance/getStudentClassAttendanceList", date)
          this.table_data_k = await pdata.data
          console.log(this.table_data_k)
        },
        async getNewKQTable(date) {

          //date 的形式  yyyy-MM-dd
          let pdata = await this.$axios.post("/studentClassAttendance/getStudentClassAttendanceSum", date)

          let da= await pdata.data
          let changepie_data
          if (da){
            changepie_data= [
              {value:da.normal, name:'正常'},
              {value:da.leaveEarly, name:'早退'},
              {value:da.absenteeism, name:'缺勤'},
              {value:da.late, name:'迟到'}
            ]
          } else{
            changepie_data= [
              {value:0, name:'正常'},
              {value:0, name:'早退'},
              {value:0, name:'缺勤'},
              {value:0, name:'迟到'}
            ]
          }

          this.updataPieChart(changepie_data)
        },
        slicdata_mx(){
          return this.table_data_k.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        current_change:function (currentPage) {
          this.currentPage = currentPage;
        },
        /* open() {
          this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
            dangerouslyUseHTMLString: true
          });
        }*/
      }
    }
</script>

<style lang="less">
  @import "../common/css/main.less";
  .nav_box{
    width: 20%;
    height: 40px;
    float: left;
    margin-top: 15px;
    line-height: 40px;
    margin-right: 20px;
    .btn_box{
      width: 33%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      float: left;
      border: 1px solid #cfcfcf;
      &focus{
        color: @themeColor;
      }
    }
  }
  .new_jieduan_box{
    width: 100%;
    height: auto;
    .jiduanbox_child{
      width: 49%;
      background-color: white;
      height: 370px;
      margin-top: 10px;
      float: left;
      margin-right: 1%;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,.05);
      .info_nox{
        width: 100%;
        height: 260px;
      }
    }
  }
</style>
