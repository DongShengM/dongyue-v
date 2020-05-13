<template>
  <div>


  <div style="clear:both;"></div>
  <div class="choosegrade">
    <span>选择年级:</span>
    <ul>
      <li class="focus">一年级</li>
      <li>二年级</li>
      <li>三年级</li>
      <li>四年级</li>
      <li>五年级</li>
      <li>六年级</li>
      <li>全校</li>
    </ul>
  </div>
  <div class="chooseclass">
    <span>选择班级:</span>
    <ul>
      <li class="focus">一年级一班</li>
      <li>一年级一班</li>
      <li>一年级一班</li>
      <li>一年级一班</li>
      <li>一年级一班</li>
      <li>一年级一班</li>
      <li>全校</li>
    </ul>
  </div>
  <div class="choosedata">
    <span>选择日期:</span>
    <div class="ml25 f_l">
      　<select id="year" onchange="addDay()"></select>

      　　<select id="month" onchange="addDay()"></select>

      　　<select id="date"></select>
    </div>
  </div>

  <div class="zhihuiBox no-padding">
    <div class="ktbg-content mt20 clearfix">
      <div class="title_zhihui t_l">
        <div class="col-8-16">
          <span class="mr20 ">进出校记录</span>
        </div>
        <div class="col-8-16 t_r">
          <span class="mr20 kaoqinshezhi">考勤设置</span>
        </div>

      </div>
      <div class="left clearfix left-new" id="line_chart">
      </div>
    </div>
  </div>
  <div class="zhihuiBox no-padding ">
    <div class="left">
      <div class="zhihui_table">
        <div class="col-16-16  col_hei f16">
          <div class="col-2-16 t_c">班级</div>
          <div class="col-2-16 t_c">学号</div>
          <div class="col-2-16 t_c">姓名</div>
          <div class="col-2-16 t_c">性别</div>
          <div class="col-3-16 t_c">行为</div>
          <div class="col-3-16 t_c">时间</div>
          <div class="col-2-16 t_c">体温</div>
        </div>
        <div class="col-16-16 normal_back_white col_hei f16" v-for="(student,i) in serverData">
          <div class="col-2-16 t_c">一年级一班</div>
          <div class="col-2-16 t_c">1</div>
          <div class="col-2-16 t_c">{{student.name}}</div>
          <div class="col-2-16 t_c">男</div>
          <div class="col-3-16 t_c">进校</div>
          <div class="col-3-16 t_c">05-05 8:24</div>
          <div class="col-2-16 t_c">37℃</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title_zhihui">
        <span class=" t_l">考勤统计{{$t('message.hello')}}</span>
      </div>

      <div class="pie-chart-box-zhihui"></div>
      <div class="pie-chart-box-zhihui"></div>
    </div>
  </div>

  </div>

</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      time:['7:30','8:00','8:30','9:00','9:30','10:00','10:30',
        '14:30','15:00','15:30','16:00','16:30'],
      data_inSchool:[11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12],
      data_outSchool:[-1, -2, -2, -5, -3, -2, 0,-1, -2, -2, -5, -3],
      piedata:[
        {value:666, name:'正常'},
        {value:110, name:'早退'},
        {value:134, name:'缺勤'},
        {value:135, name:'迟到'}
      ],
      serverData:null
    }
  },
  mounted(){
    this.line_zhihui($('#line_chart')[0],this.time,this.data_inSchool,this.data_outSchool)

    $('.pie-chart-box-zhihui')[0].style.height=$('.pie-chart-box-zhihui')[0].clientWidth-7+'px'
    $('.pie-chart-box-zhihui')[1].style.height=$('.pie-chart-box-zhihui')[1].clientWidth-7+'px'
    this.pie_zhihui( $('.pie-chart-box-zhihui')[0],'一年级一班',this.piedata)
    this.pie_zhihui( $('.pie-chart-box-zhihui')[1],'一年级二班',this.piedata)

    this.getData()
  },
  methods:{
    line_zhihui(div,xdata,data_inSchool,data_outSchool) {
      let myChart = echarts.init(div);
      let option = {
        // title: {
        //     text: '未来一周气温变化',
        //     subtext: '纯属虚构'
        // },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            return params[0].name + '<br/>'
              +params[0].marker+ params[0].seriesName + ' : ' + params[0].value + ' 人<br/>'
              +params[1].marker+ params[1].seriesName + ' : ' + -params[1].value + '人';
          }
        },
        legend: {
          data:['入校','出校']
        },
        grid:{
          left:'5%',
          top:'5%',
          bottom:'12%',
          right:'5%'
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          nameGap:5,
          data: xdata
        },
        yAxis: {
          show:false,
          type: 'value',
          axisLabel: {
            formatter: '{value} °C',
            show:false
          },
          splitLine: {
            show: false
          },
        },
        series: [
          {
            name:'入校',
            type:'line',
            smooth:true,
            data:data_inSchool,

          },
          {
            name:'出校',
            type:'line',
            smooth:true,
            data:data_outSchool,
          }
        ]
      };
      myChart.setOption(option, true);
    },
    pie_zhihui(div,grade,data) {
      let myChart = echarts.init(div);
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        backgroundColor: '#fff',
        title : {
          text: grade,
          x:'left'
        },

        color:['#37a2da','#67e0e3','#ffdb5c','#ff9f7f'],
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
    getData(){
      this.$axios.get("http://101.37.88.224:2002/studentHeat/getStudentRealTimeHeat/9391")
        .then(Response=>{
          console.log(Response)
          // this.serverData = Response.data
          // console.log(this.serverData)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../common/css/main.less";
</style>
