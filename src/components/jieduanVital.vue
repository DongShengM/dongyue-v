<template>
<div>

  <div style="clear:both;"></div>

  <div class="choosee" style="width: 100%">
    <div class="col-14-16">
      <a class="btn grayBtn mr20">日</a>
      <a class="btn grayBtn mr20">周</a>
      <a class="btn grayBtn mr20">月</a>
      <a class="btn grayBtn ">年</a>
    </div>
    <div class="col-2-16">
      <input class="time_input" type="text" value="年/月/日">
    </div>

  </div>


  <div class="col-16-16 no-padding" >
    <div class="col-7-16" style="height: 400px;border: 1px solid #1a1a1a">
      <div class="f18">进出校统计</div>
      <div class="cb_school col-16-16" style="height: 360px"></div>
    </div>
    <div class="col-1-16" style="height: 400px"></div>
    <div class="col-8-16" style="height: 400px;border: 1px solid #1a1a1a">
      <div class="f18">考勤排行</div>
      <div class="zhihui_table kaoqin_table">
        <div class="col-16-16  f16 l_h40" v-for="(grade_kaoQin,i) in kaoQinInfo">
          <div class="col-2-18 t_c">{{i}}</div>
          <div class="col-4-18 t_c">初一一班</div>
          <div class="col-4-18 t_c">出勤 <span>30</span></div>
          <div class="col-4-18 t_c">迟到 <span>30</span></div>
          <div class="col-4-18 t_c">缺勤 <span>30</span></div>
        </div>

      </div>
    </div>
  </div>
  <div class="col-16-16 no-padding mt20" style="border: 1px solid #1a1a1a">
    <div class="col-8-16 tiwentongji" >
      <div class="oneline no-border">
        <div >体温统计</div>
      </div>
      <div class="oneline">
        <div>累计测试人数
        </div>
        <div>&nbsp;</div>
        <div>{{totalTestPeople}}人
        </div>
        <div class="data_tiao">
          <!--注  这里相加为99-->
          <span style="width: 80%;height: 5px" class="color_1"></span>
        </div>
      </div>
      <div class="oneline">
        <div>在校生人数
        </div>
        <div>&nbsp;</div>
        <div>{{inSchoolPeople}}人
        </div>
        <div class="data_tiao">
          <!--注  这里相加为99-->
          <span style="width: 30%;height: 5px" class="color_1"></span>
        </div>
      </div>
      <div class="oneline">
        <div>累计异常人数
        </div>
        <div>&nbsp;</div>
        <div>{{totalBadPeople}}人
        </div>
        <div class="data_tiao">
          <!--注  这里相加为99-->
          <span style="width: 8%;height: 5px" class="color_1"></span>
        </div>
      </div>
      <div class="oneline no-border">
        <div >体温异常班级信息</div>
      </div>
      <div class="zhihui_table">
        <div class="col-16-16   f16 l_h30">
          <div class="col-8-16 t_c">班级</div>
          <div class="col-8-16 t_c">人数</div>
        </div>
        <div class="col-16-16 normal_back_white  f16 l_h30" v-for="(grade_info , i ) in badTemperClass">
          <div class="col-8-16 t_c">{{grade_info.class_n}}</div>
          <div class="col-8-16 t_c people_num">{{grade_info.number}}</div>
        </div>
      </div>
    </div>
    <div class="col-8-16 wendu_togji" style="height: 400px;">

    </div>
  </div>
  <div class="shouhuan-box alert-box animated fadeIn alertType" style="display:none">
    <div class=" formType animated fadeIn">
      <div class="alert-div form-box back_white animated fadeInDownBig" style="margin-top: -161.5px;">
        <div class="form-head t_r"><a class="close-btn f18" href="javascript:;">×</a></div>
        <form >
        </form>
        <a style="height:30px;width: 49%;">&nbsp;</a>
        <a class="queding btn themeBtn t_c" style="width: 49%;margin: 0 auto;display: block;overflow: hidden">确定</a>
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
              {value:10,name:'正常人数'},
              {value:10,name:'异常人数'}]
        }
      },
      mounted(){
        //  表格颜色间隔
        let arr =$('.kaoqin_table div.col-16-16')
        for (var i=0;i<arr.length;i++){
          if (i%2==0){
            arr[i].style.background="#9acdff"
          } else{
            arr[i].style.background="#cdcdff"
          }
        }

        //圆
        this.pie_sim($('.cb_school')[0],this.sim_data)

        this.pie_wendu($('.wendu_togji')[0],this.wendunum)

        $('.people_num').on('click',function () {

          let student_num = this.innerHTML
          let class_nam =this.previousElementSibling.innerHTML
          $('.alert-div form').append("<div class=\"form-inline list-root\" v-for='()'>\n" +
            "                            <div class=\"col-16-16 t_c l_h30 f16\">一年级一班</div>\n" +
            "                            <div class=\"col-16-16 back_grayer mt10 l_h30 f16\">\n" +
            "                                <div class=\"col-2-16 t_c\">1</div>\n" +
            "                                <div class=\"col-4-16 t_c\">王可可</div>\n" +
            "                                <div class=\"col-2-16 t_c\">男</div>\n" +
            "                                <div class=\"col-2-16 t_c\">36.3</div>\n" +
            "                                <div class=\"col-6-16 t_c\">05-05 8：24</div>\n" +
            "                            </div>\n" +
            "                    </div>")

          $('.alert-box').css('display','block');
        })

        $(".close-btn").click(function () {
          $('.alert-box').css('display','none');
          $('.alert-div form')[0].innerHTML="";
        });
        $(".queding").click(function () {
          $('.alert-box').css('display','none');
          $('.alert-div form')[0].innerHTML="";
        });
      },
      methods:{
        pie_sim(div,data) {
          let myChart = echarts.init(div);
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },

            series: [
              {
                type:'pie',
                radius: '60%',
                // avoidLabelOverlap: false,
                label: {
                  // normal: {
                  //     show: false,
                  //     position: 'center'
                  // },

                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                  }

                },
                // labelLine: {
                //     normal: {
                //         show: false
                //     }
                // },
                data:data
              }
            ]
          };
          myChart.setOption(option, true);


        },
        pie_wendu(div,data) {
          let myChart = echarts.init(div);
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            // backgroundColor: '#fff',
            // title : {
            //     text: grade,
            //     x:'left'
            // },

            color:['#67e0e3','#ff9f7f'],
            // legend: {
            //     orient: 'vertical',
            //     x: 'left',
            //     data:['正常','早退','缺勤','迟到']
            // },
            series: [
              {
                type:'pie',
                radius: '60%',
                // avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    formatter:'{c}',
                    position: 'inside'
                  },

                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                  }

                },
                // labelLine: {
                //     normal: {
                //         show: false
                //     }
                // },
                data:data
              }
            ]
          };
          myChart.setOption(option, true);


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
</style>
