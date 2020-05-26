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
            :change="changeTime()"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </div>
      <!--<div class="nav_box">-->

      <!--</div>-->
    </div>

  </div>

  <div class=" " style="padding: 0 20px">
    <div class="new_jieduan_box">
      <div class="jiduanbox_child">
        <div class="title_zhihui t_l">
          <div class="col-16-16">
            <span class="mr20 f16">{{$t('zhiHuiSchool.all_share.tiwentongji')}}</span>
          </div>
          </div>
        <div class="wendu_togji info_nox" >
        </div>
      </div>
      <div class="jiduanbox_child">
        <div class="title_zhihui t_l">
          <div class="col-16-16">
            <span class="mr20 f16">{{$t('zhiHuiSchool.all_share.jichuxiaojilu')}}</span>
          </div>
          </div>
        <div class="cb_school info_nox"  >
        </div>
      </div>
      <div class="jiduanbox_child">
        <div class="title_zhihui t_l">
          <div class="col-16-16">
            <span class="mr20 f16">{{$t('zhiHuiSchool.jieduantongji.tiwyichangbanji')}}</span>
          </div>
        </div>
        <div class="info_nox">
          <el-table  :data="table_data_cl"
                     style="width: 100%" :show-header="false" >
            <el-table-column align="center" property="date" label="姓名" :max-height="20"></el-table-column>
            <el-table-column align="center" property="name" label="性别" :max-height="20"></el-table-column>
            <el-table-column align="center" property="name" label="体温" :max-height="20"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="jiduanbox_child">
        <div class="title_zhihui t_l">
          <div class="col-16-16">
            <span class="mr20 f16">{{$t('zhiHuiSchool.jieduantongji.kaoqinpaihang')}}</span>
          </div>
        </div>
        <div class="info_nox">
          <el-table  :data="table_data_k"
                     style="width: 100%" :show-header="false" >
            <el-table-column align="center" property="date" label="姓名" :max-height="20"></el-table-column>
            <el-table-column align="center" property="name" label="性别" :max-height="20"></el-table-column>
            <el-table-column align="center" property="name" label="体温" :max-height="20"></el-table-column>
          </el-table>
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
            sim_data:[
              {value:666, name:'正常'},
              {value:134, name:'缺勤'},
              {value:135, name:'迟到'}
            ],
            wendunum:[
              {value:10,name:'正常'},
              {value:10,name:'异常'}],

            value_time:'',
            table_data_k:[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
            table_data_cl:[{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
      },
      mounted(){

        //圆
        this.pie_sim($('.cb_school')[0],this.sim_data)

        this.pie_wendu($('.wendu_togji')[0],100,70,30,30,this.wendunum)

      },
      methods:{

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

            color:['#96d771','#37a2da','#ffdb5c'],
            legend: {
              // orient: 'vertical',
              right:' 38%',
              bottom: '7%',
              data:['正常','缺勤','迟到']
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
          var myChart = echarts.init(div);
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
            tooltip: {
              name:'园园',
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
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
                      color: '#96d771'
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
                  value: 35,
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
                  value: 55,
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
                  value: 60,
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
            myChart.setOption(option, true);
          }
        },

        changeTime(){
          let start = this.value_time[0]
          let end = this.value_time[1]


        }
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
      .info_nox{
        width: 100%;
        height: 320px;
      }
    }
  }
</style>
