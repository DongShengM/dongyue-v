<template>
  <!--运动步数-->
  <div class="moveStep-outBox">
      <!--全校概况-->
      <div class="allSchoolSituation">
        <div class="allSchoolSituation-Title">
          <el-row>
            <el-col :spam="3">
              <div class="allSchoolSituation">
                {{$t(('zhiHuiSchool.moveStep.allSchoolSituation'))}}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="allSchoolSituation-Data">
            <el-row :gutter="30">
                <el-col :span="5">
                    <div class="dayAvgSteps dayAvgStyle" >
                      <div class="dayAvgSteps-title">
                        {{$t(('zhiHuiSchool.moveStep.dayAvgSteps'))}}
                      </div>
                      <div class="dayAvgSteps-number dayAvgNumberStyle">
                        {{ this.dayAvgSteps }}
                      </div>
                    </div>
                </el-col>
                <el-col :span="5">
                  <div class="dayAvgCalories dayAvgStyle">
                    <div class="dayAvgCalories-title">
                      {{$t(('zhiHuiSchool.moveStep.dayAvgCalories'))}}
                    </div>
                    <div class="dayAvgCalories-number dayAvgNumberStyle">
                      {{ this.dayAvgCalories }}
                    </div>
                  </div>
                </el-col>
            </el-row>
        </div>
      </div>
      <!--班级数据-->
      <div class="allSchoolSituation-classData">
        <div class="allSchoolSituation-Title">
        <el-row>
          <el-col :spam="3">
            <div class="allSchoolSituation">
              {{$t(('zhiHuiSchool.moveStep.classData'))}}
            </div>
          </el-col>
        </el-row>
      </div>
        <div class="allSchoolSituation-select">
          <el-row :gutter="30">
            <el-col :span="5">
              <el-select v-model="value2_nian" clearable placeholder="可选年级"   style="width: 100%" >
                <el-option
                  v-for="item_c in options_grade"
                  :key="item_c.value"
                  :label="item_c.label"
                  :value="item_c.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="value_ban" clearable placeholder="可选班级"  @change="selectChange" style="width: 100%">
                <el-option
                  v-for="item in options_class"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
      </div>
         <div class="class-table">
          <div class="moveStep-tableBox">
            <el-row :gutter="30">
              <el-col :span="14">
                <el-table  style="width: 100%" :data="slicdata()" :border='false' :header-cell-style="{background:'#e4eaf1'}">
                  <el-table-column  label="姓名/性别" >
                    <template slot-scope="scope">
                      <span>{{scope.row.studentName}}
                      </span >
                      <i v-if="scope.row.sex==1" class="icon-boy tableBox-icon-position"></i>
                      <i v-if="scope.row.sex==2"  class="icon-girl tableBox-icon-position"></i>
                    </template>
                  </el-table-column>
                  <el-table-column prop="everydayStep" label="每日步数" ></el-table-column>
                  <el-table-column prop="inSchoolStep" label="在校步数" ></el-table-column>
                  <el-table-column prop="leaveSchoolStep" label="离校步数" ></el-table-column>
                  <el-table-column prop="calories" label="卡路里" ></el-table-column>
                  <el-table-column prop="classAvgStep" label="班级平均步数" min-width="105" ></el-table-column>
                  <el-table-column label="评级" >
                    <template slot-scope="scope">
                      <div class="start-box">
                        <div v-if="scope.row.Rank==1" class="start2">
                         <i class="icon-level1"></i>
                        </div>
                        <div v-if="scope.row.Rank==2" class="start2">
                          <i class="icon-level2 start-size"></i>
                          <i class="icon-level2 start-size"></i>
                        </div>
                        <div v-if="scope.row.Rank==3" class="start2">
                          <i  class="icon-level3 start-size" style="text-align: center"></i>
                          <br>
                          <i  class="icon-level3 start-size"></i>
                          <i  class="icon-level3 start-size"></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="moveStep-table-pagination">
                  <el-pagination v-if="studnetTotal>0"
                    background
                    layout="prev, pager, next"  :total="this.studnetTotal"
                    @current-change="studentPagination">
                  </el-pagination>
                </div>
              </el-col>
              <el-col :span="10">
                <el-table  style="width: 100%" :data="slicdata2()" :border='false' :header-cell-style="{background:'#e4eaf1'}">
                  <el-table-column  label="班级排名" >
                    <template slot-scope="scope">
                      <span>{{scope.row.classNum}}. {{scope.row.className}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="everyDayStep" label="每日步数" ></el-table-column>
                  <el-table-column prop="inSchoolStep" label="在校步数" ></el-table-column>
                  <el-table-column prop="leaveSchoolStep" label="离校步数" ></el-table-column>
                </el-table>
                <div class="moveStep-table-pagination">
                  <el-pagination v-if="classTotal>0"
                    background
                    layout="prev, pager, next"  :total="this.classTotal"
                    @current-change="classPagination">
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </div>
      </div>
      </div>
      <!--全校统计-->
      <div class="allSchoolCharts">
        <div class="allSchoolSituation-chartTitle">
          <el-row>
            <el-col :spam="3">
              <div class="allSchoolSituation">
                {{$t(('zhiHuiSchool.moveStep.chartTitle'))}}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="allSchoolSituation-select">
          <el-row :gutter="30">
            <el-col :span="5">
              <el-select v-model="value_tongji" clearable placeholder="按日统计"   style="width: 100%" >
                <el-option
                  v-for="item_c in options_time"
                  :key="item_c.value"
                  :label="item_c.label"
                  :value="item_c.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <div class="block">
                <el-date-picker class="demonstration"
                                v-model="value_time"
                                style="width: 100%"
                                type="daterange"
                                range-separator=" 至 "
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="3">
              <el-button style="width: 100%" plain type="primary" @click="stepAlldata">
                查询
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div class="allSchoolSituation-chart">
            <el-row>
              <el-col :span="24">
                <div class="columnarChart" id="columnarChart">

                </div>
              </el-col>
            </el-row>
        </div>
      </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import ElCol from "element-ui/packages/col/src/col";
  import echarts from 'echarts';

  export default{
    components: {ElCol},
    name: "MoveStep",
    data(){
      return {
        dayAvgSteps:"8000",
        dayAvgCalories:"8000",
        value_ban:'',
        value2_nian: '',
        value_tongji:'',
        value_time:'',
        options_grade: [{value: '11', label: '初一'}, {value: '12', label: '初二'},
          {value: '13', label: '初三'}],
        options_class: [{value: '1', label: '1'}],
        options_time:[{value:'1',label:"按日统计"},{value:'2',label:"按周统计"},{value:'3',label:"按月统计"},{value:'4',label:"按学期统计"}],
        //班级测试数据
        tableData: [
          {
            studentName: '张三',
            studentSex:'1',
            everydayStep:"8000",
            inSchoolStep:"3000",
            leaveSchoolStep:"123",
            calories:"123",
            classAvgStep: '123',
            level:"1"
          },
          {
            studentName: '张三',
            studentSex:'1',
            everydayStep:"8000",
            inSchoolStep:"3000",
            leaveSchoolStep:"123",
            calories:"123",
            classAvgStep: '123',
            level:"1"
          },
          {
            studentName: '张三',
            studentSex:'1',
            everydayStep:"8000",
            inSchoolStep:"3000",
            leaveSchoolStep:"123",
            calories:"123",
            classAvgStep: '123',
            level:"1"
          }
        ],
        //学生测试数据
        tableData2: [
          {
            classLever: '1',
            studentSex:'1',
            everydayStep:"8000",
            inSchoolStep:"3000",
            leaveSchoolStep:"123"
          },
          {
            classLever: '2',
            studentSex:'1',
            everydayStep:"8000",
            inSchoolStep:"3000",
            leaveSchoolStep:"123"
          },
          {
            classLever: '3',
            studentSex:'1',
            everydayStep:"8000",
            inSchoolStep:"3000",
            leaveSchoolStep:"123"
          }
        ],

        //学生数据
        //学生总数据存放
        studentAllData:[],
        //学生分页数据存放
        studentPageData:[],
        //学生数据总数
        studnetTotal:0,
        //学生每页显示
        studnetPagesize:10,
        //学生当前显示页数
        studnetCurrentPage:1,

        //班级数据
        //班级总数据存放
        classAllData:[],
        //班级分页数据存放
        classPageData:[],
        //班级数据总数
        classTotal:0,
        //班级每页显示
        classPagesize:10,
        //班级当前显示页数
        classCurrentPage:1,
        //柱状图数据
        chartsData:[],
        //柱状图日期
        chartsDate:[]
      }
    },
    mounted(){
      //this.columnarChart($('#columnarChart')[0],data);
    },
    methods:{
      //获取学生数据
      async getStudnetData(num){
        let Response = await this.$axios.get("http://rap2.taobao.org:38080/app/mock/255345/motionStep?");
        //总数
        this.studnetTotal = parseInt((Response.data.lists.length));
        //总数据(导出用)
        this.studentAllData = Response.data.lists;
        //分页数据
        this.studentPageData = this.slicdata();
        //console.log(this.tableResponseData);
      },
      //获取班级数据
      async getClassData(num){
        let Response = await this.$axios.get("http://rap2.taobao.org:38080/app/mock/255345/classStep");
        //总数
        this.classTotal = parseInt((Response.data.lists.length));
        //总数据(导出用)
        this.classAllData = Response.data.lists;
        //分页数据
        this.classPageData = this.slicdata2();
        //console.log(this.tableResponseData);
      },
      //学生分页
      slicdata(){
        return this.studentAllData.slice((this.studnetCurrentPage-1)*this.studnetPagesize,this.studnetCurrentPage*this.studnetPagesize)
      },
      //班级分页
      slicdata2(){
        return this.classAllData.slice((this.classCurrentPage-1)*this.classPagesize,this.classCurrentPage*this.classPagesize)
      },
      //下拉列表触发
      selectChange(num){
        this.getStudnetData(num);
        this.getClassData();
      },
      //学生分页按钮触发
      studentPagination(num){
        this.studnetCurrentPage=num;
      },
      //班级分页按钮触发
      classPagination(num){
        this.classCurrentPage=num;
      },
      //柱状图
      columnarChart(div,data,date){
        let myChart = echarts.init(div);
        let option = {
          color:'rgba(2,167,240,0.8)',
          xAxis: {
            type: 'category',
            data: date ,
            axisLabel: {
              interval: 0,
              rotate: 30
            },
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          series: [{
            data: data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }]
        };
        myChart.setOption(option, true);
      },
      //查询数据
      async stepAlldata(){
        let Response = await this.$axios.get("http://rap2.taobao.org:38080/app/mock/255345/allStep");
        let responseData = Response.data.lists;
        this.chartsData=[];
        this.chartsDate=[];
        responseData.forEach((e,i)=>{
            this.chartsData.push(responseData[i].allSteps);
            this.chartsDate.push(responseData[i].date)
        })
        console.log(this.chartsDate);

        this.columnarChart($('#columnarChart')[0],this.chartsData,this.chartsDate);
      }
    }
   }
</script>
<style lang="less">
  .moveStep-outBox{
    padding: 13px 30px 30px 30px;
    background-color: #fff;
  }
  .allSchoolSituation-Title{
    padding:17px 0px 17px 0px;
    box-sizing: border-box;
    background-color: white;
    font-size: 17px;
  }
  .allSchoolSituation-Data{
    background-color: white;
    padding:0px 0px;
    box-sizing: border-box;

    .dayAvgStyle{
      background:rgba(2, 167, 240, 1);
      color:#ffffff;
      padding:10px;
      border-radius: 5px;
      height: 100%;
      .dayAvgNumberStyle{
        text-align: center;
        padding: 15px 0px;
        font-size:25px;
      }
    }
  }
  .class-table{
    margin-top:30px;
    .moveStep-tableBox{

    }
  }
  .moveStep-table-pagination{
    margin-top:20px;
    text-align: right;
  }
  .columnarChart{
    width: 100%;
    height: 400px;
  }
  .tableBox-icon-position{
    margin-left: 3px;
    font-size: 12px;
  }
  .start-box{
    max-width: 40px;

  }
  .start-size{
    font-size: 12px;

  }
  .start2{
    text-align: center;
    width: 100%;
    height: 100%;
    margin-left:-6px ;
    line-height: 16px;
  }
  .allSchoolSituation-chartTitle{
    padding:17px 0px 17px 0px;
    box-sizing: border-box;
    background-color: white;
    font-size: 17px;
  }
</style>
