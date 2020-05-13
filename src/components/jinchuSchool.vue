<template>
  <div>


    <div style="clear:both;"></div>
    <div class="choosegrade">
      <span>{{$t('zhiHuiSchool.jiechuxiaojilu.xuanzenianji')}}:</span>
      <ul>
        <li v-for="sing in grade_num" :class="sing==grade_xuanzhong?'focus':''">{{sing}}{{$t('zhiHuiSchool.jiechuxiaojilu.nianji')}}</li>
        <li>{{$t('zhiHuiSchool.jiechuxiaojilu.quanxiao')}}</li>
      </ul>
    </div>
    <div class="chooseclass">
      <span>{{$t('zhiHuiSchool.jiechuxiaojilu.xuanzebanji')}}:</span>
      <ul>
        <li v-for="sing in grade_num" :class="sing==grade_xuanzhong?'focus':''">{{sing}}{{$t('zhiHuiSchool.jiechuxiaojilu.nianji')}}一班</li>

        <li>{{$t('zhiHuiSchool.jiechuxiaojilu.quanxiao')}}</li>
      </ul>
    </div>
    <div class="choosedata">
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

    <div class="zhihuiBox no-padding">
      <div class="ktbg-content mt20 clearfix">
        <div class="title_zhihui t_l">
          <div class="col-8-16">
            <span class="mr20 ">{{$t('zhiHuiSchool.all_share.jichuxiaojilu')}}</span>
          </div>
          <div class="col-8-16 t_r">
            <span class="mr20 kaoqinshezhi" >{{$t('zhiHuiSchool.jiechuxiaojilu.kaoqinshezhi')}}</span>
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
        </div>
      </div>
      <div class="right">
        <div class="title_zhihui">
          <span class=" t_l">{{$t('zhiHuiSchool.jiechuxiaojilu.kaoqintongji')}}</span>
        </div>

        <div class="pie-chart-box-zhihui"></div>
        <div class="pie-chart-box-zhihui"></div>
      </div>
    </div>
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
                <div class="col-6-32 no-padding t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.chidao')}}{{$t('zhiHuiSchool.jiechuxiaojilu.shizhi')}}</div>
                <div class="col-6-32 no-padding t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.wanyu')}}</div>
                <div class="col-12-32 no-padding"><input type="time"></div>
              </div>
              <div class="form-inline clearfix mt10 file-root">
                <div class="col-6-32 no-padding t_c">{{$t('zhiHuiSchool.jiechuxiaojilu.zaotui')}}{{$t('zhiHuiSchool.jiechuxiaojilu.shizhi')}}</div>
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
    data () {
      return {
        picker_input:this.$t('zhiHuiSchool.jiechuxiaojilu.xuanzeriqishijian'),
        grade_xuanzhong:'一',
        grade_num:['一','二','三','四','五','六'],
        msg: 'Welcome to Your Vue.js App',
        time:['7:30','8:00','8:30','9:00','9:30','10:00','10:30',
          '14:30','15:00','15:30','16:00','16:30'],
        data_inSchool:[11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12],
        data_outSchool:[-1, -2, -2, -5, -3, -2, 0,-1, -2, -2, -5, -3],
        piedata:[
          {value:666, name:this.$t('zhiHuiSchool.jiechuxiaojilu.zhengchang')},
          {value:110, name:this.$t('zhiHuiSchool.jiechuxiaojilu.zaotui')},
          {value:134, name:this.$t('zhiHuiSchool.jiechuxiaojilu.queqin')},
          {value:135, name:this.$t('zhiHuiSchool.jiechuxiaojilu.chidao')}
        ],
        value1:''
      }
    },
    mounted(){

      $('.kaoqinshezhi').click(function () {
        $('.alert-box').css('display','block');
      })
      $(".close-btn").click(function () {
        $('.alert-box').css('display','none');
      });
      $(".queding").click(function () {
        $('.alert-box').css('display','none');
      });
      this.line_zhihui($('#line_chart')[0],this.time,this.data_inSchool,this.data_outSchool)

      $('.pie-chart-box-zhihui')[0].style.height=$('.pie-chart-box-zhihui')[0].clientWidth-7+'px'
      $('.pie-chart-box-zhihui')[1].style.height=$('.pie-chart-box-zhihui')[1].clientWidth-7+'px'
      this.pie_zhihui( $('.pie-chart-box-zhihui')[0],'一年级一班',this.piedata)
      this.pie_zhihui( $('.pie-chart-box-zhihui')[1],'一年级二班',this.piedata)
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
            data:[this.$t('zhiHuiSchool.jiechuxiaojilu.ruxiao'),this.$t('zhiHuiSchool.jiechuxiaojilu.chuxiao')]
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
     /* open() {
        this.$alert('<div><el-time-picker\n' +
          '    is-range\n' +
          '    v-model="value_t"\n' +
          '    range-separator="至"\n' +
          '    start-placeholder="开始时间"\n' +
          '    end-placeholder="结束时间"\n' +
          '    placeholder="选择时间范围">\n' +
          '  </el-time-picker></div>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
      }*/
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../common/css/main.less";
</style>
