<template>
  <div class="temperatureData-outBox">
    <div class="zhihuiBox new-zhui " style="height: 50px;margin-top: 0;padding:10px 20px 0px 20px;background-color: white">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="value2_nian" clearable placeholder="请选择" @change="initializationClass"  style="width: 100%" id="selece_nian">
            <el-option
              v-for="item_c in options_grade"
              :key="item_c.value"
              :label="item_c.label"
              :value="item_c.value">
            </el-option>
          </el-select>

        </el-col>
        <el-col :span="4">
          <el-select v-model="value_ban" clearable placeholder="请选择" @change="" style="width: 100%" id="selece_ban">
            <el-option
              v-for="item in options_class"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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
        <el-col :span="2">
           <el-button style="width: 100%" plain type="primary"@click="getStudnetData">
              查询
           </el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="width: 100%" plain type="primary" @click="exportToCsv">
            导出
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="zk-table">
      <!--学生表格-->
      <div class="temperatureData-tableBox" >
        <el-row>
          <el-col :span="24">
              <el-table  style="width: 100%" :data="slicdata()" :border='false' :header-cell-style="{background:'#e4eaf1'}">
                <el-table-column prop="time" label="时间" ></el-table-column>
                <el-table-column prop="grade" label="年级"></el-table-column>
                <el-table-column prop="class" label="班级" ></el-table-column>
                <el-table-column prop="studentName" label="姓名" ></el-table-column>
                <el-table-column prop="studentid" label="学号" ></el-table-column>
                <el-table-column prop="temperature" label="温度" ></el-table-column>
                <el-table-column prop="degreeLevel" label="是否异常" ></el-table-column>
                <!--<el-table-column prop="detectTime" :label="$t('zhiHuiSchool.temperatureData.detectTime')" ></el-table-column>-->
              </el-table>
          </el-col>
        </el-row>
      </div>

      <div class="page-weiba t_r"  >
        <el-pagination
          background
          layout="prev, pager, next"  :total="this.pageTotal"
          @current-change="current_change_z">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
  import echarts from 'echarts'
  import $ from 'jquery'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default{
    components: {
      ElCol,
      ElRow,
   },
    name: "TemperatureData",
    data(){
          return{
            time: new Date(),
            value_ban: '',
            value2_nian: '',
            value_time:'',
            options_grade: [],
            options_class: [{value: '(1)班', label: '(1)班'}],
            //单日学生总数据
            tableOriginData:[],
            //单日学生分页数据
            tableResponseData:[],
            pageTotal:3,
            tableData: [
              {
                studentCode: '1',
                studentName: '张三',
                maxTemperature:"36.3",
                minTemperature:"36.3",
                avgTemperature:"36.3",
                newTemperature:"36.7",
                detectTime: '9:00'
              },
              {
                studentCode: '1',
                studentName: '张三2',
                maxTemperature:"36.4",
                minTemperature:"36.3",
                avgTemperature:"36.5",
                newTemperature:"36.7",
                detectTime: '9:00'
              },
              {
                studentCode: '1',
                studentName: '张三',
                maxTemperature:"36.3",
                minTemperature:"36.3",
                avgTemperature:"36.7",
                newTemperature:"36.7",
                detectTime: '9:30'
              }
            ],
            //  主页面分页
            //数据总数
            total_z:0,
            //每页显示
            pagesize_z:10,
            //默认开始页面
            currentPage_z:1,
            selectNian:'',
            selectBan:''
          }

      },
      mounted() {
        this.initializationSelect();
      },
      methods:{
        //单日获取学生数据
        async getStudnetData(){
            if(this.value_time[0]==undefined||this.value_time[1]==undefined){
                alert('清先选择时间');
                return;
            }else if(this.value2_nian==""){
              alert('清先选择年级');
              return;
            }else if(this.value_ban==""){
              alert('清先选择班级');
              return;
            }else{
                this.selectNian = $("#selece_nian").val();
                this.selectBan = $("#selece_ban").val()
                console.log(this.value_time[0]+"T00:00");
                  let testData={
                    "grade": this.value2_nian,
                    "classId": this.value_ban,
                    "startTime": this.value_time[0]+"T00:00",
                    "endTime": this.value_time[1]+"T00:00"
                  }
                  let Response = await this.$axios.post("http://t.jiankangtiyu.com/studentHeat/queryStudentHeat",testData);
                  //总数
                  this.pageTotal = parseInt((Response.data.length));
                  //总数据整理
                  let allData=[];
                    console.log($("#selece_nian").val());
                  Response.data.forEach((e,i)=>{
                    allData.push(
                        {
                          "time":e.detectTime[0]+" "+e.detectTime[1]+" "+e.detectTime[2]+" "+e.detectTime[3]+":"+e.detectTime[4]+":"+(e.detectTime[5]==undefined?"00":e.detectTime[5]),
                          //原数据  e.grade
                          "grade":this.selectNian,
                          //原数据  e.classId
                          "class":this.selectBan,
                          "studentName":e.studentName,
                          //学号暂时为空
                          "studentid":"",
                          "temperature":(e.degree)/10,
                          "degreeLevel":e.degreeLevel==null?"无":"有"
                        }
                      );
                  })
                this.tableOriginData = allData;
                console.log(this.tableOriginData);
                //分页数据
                this.tableResponseData = this.slicdata();
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
        async getData(url,tim) {

          await this.new_getD(url)
          let end = new Date()
          let la_tim = ((end - tim) > 1000) ? (end - tim) : 1000

          setTimeout(() => {
            this.loading = false;
            this.isrefresh = false;
          }, la_tim);
          //温度计
          //this.wenduji_color(this.setup_police)
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
        //分页
        slicdata(){
          return this.tableOriginData.slice((this.currentPage_z-1)*this.pagesize_z,this.currentPage_z*this.pagesize_z)
        },

        current_change_z: function (currentPage) {
          this.currentPage_z = currentPage;
        },

        //数组转excel下载
        exportToCsv(){
              if(this.tableOriginData==""||this.tableOriginData==null){
                  alert("请先查询");
                  return ;
              }
              let CsvString = "";
              let changeArray;
              changeArray = JSON.parse(JSON.stringify(this.tableOriginData));
//              let str = $t('zhiHuiSchool.temperatureData.studentID')+","+zhiHuiSchool.temperatureData.studentName+","+zhiHuiSchool.temperatureData.maxTemperature
//          +","+zhiHuiSchool.temperatureData.minTemperature+","+zhiHuiSchool.temperatureData.avgTemperature+","+zhiHuiSchool.temperatureData.newTemperature
//          +","+zhiHuiSchool.temperatureData.detectTime+"\n";
              let str = `时间,年级,班级,姓名,学号,温度,是否异常\n`;
              for(let i = 0 ; i < changeArray.length ; i++ ){
                for(let item in changeArray[i]){
                  str+=`${changeArray[i][item] + '\t'},`;
                }
                str+='\n';
              }
              let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
              //通过创建a标签实现
              let link = document.createElement("a");
              link.href = uri;
              //对下载的文件命名
              link.download =  this.value_time[0]+"到"+this.value_time[1]+"体温数据表.csv";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
        },
        //初始化下拉菜单
        async initializationSelect(){
            //清空班级
          let Response = await this.$axios.get("http://t.jiankangtiyu.com/dy-heat/school/getSchoolInfo");
          let allData = [];
          Response.data.forEach((e,i)=>{
            allData.push({
              "value":e.grade,
              "label":e.gradeName,
              "classInfo":e.classInfo
            })
          })

          this.options_grade = allData;
        },
        //选择年级初始化对应班级
        initializationClass(event){
          let allData=[];
          this.options_grade.forEach((e,i)=>{
                if(event == e.value){
                    e.classInfo.forEach((e2,i2)=>{
                      allData.push({
                       "value": e2.classId,
                       "label": e2.className
                      });
                    })
                }
          })
          this.options_class = allData;
          this.value_ban = '';
        }
      },

  }
</script>
<style lang="less">
  @import "../common/css/main.less";
  .temperatureData-tableBox{
    height: 530px;
  }
  .el-table__empty-block{
    width: 100% !important;
  }

</style>
