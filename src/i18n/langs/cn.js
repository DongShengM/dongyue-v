import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

const cn = {
  message:{
    'hello':'你好世界',
    'cn':'中文简体',
    'tw':'中文繁体',
    'queding':'确 定',
    'setup':'设置',
    'qinqiuchucuo':'请求出错'
  },
  zhiHuiSchool:{
    all_share:{
      zhihuixiaoyuan:'智慧校园',
      jiaoshigaunli:'教师管理',
      banjiguanli:'班级管理',
      shoucang:'收藏',
      shezhi:'设置',
      fanhuiqidongye:'返回启动页',
      huanyinye:'欢迎页',
      zhanghuxinxi:'账户信息',
      tuichu:'退出',
      jichuxiaojilu:'进出校记录',
      jieduantongji:'阶段统计',
      tiwentongji:'体温统计'
    },
    jiechuxiaojilu:{
      xuanzenianji:'选择年级',
      quanxiao:'全校',
      banji:'班级',
      nianji:'年级',
      ban:'班',
      xuanzebanji:'选择班级',
      xuanzeriqi:'选择日期',
      xuanzeriqishijian:'选择日期时间',
      xuanzeshijian:'选择时间',
      cike:'此刻',
      kaoqinshezhi:'考勤设置',
      kaoqintongji:'考情统计',
      zhengchang:'正常',
      chidao:'迟到',
      zaotui:'早退',
      queqin:'缺勤',
      xuehao:'学号',
      xingming:'姓名',
      xingbie:'性别',
      xingwei:'行为',
      shijian:'时间',
      tiwen:'体温',
      ruxiao:'入校',
      chuxiao:'出校',
      jinchuxiaokaoqinshezhi:'进出校考勤设置',
      morning:'上午',
      afternoon:'下午',
      kaoqin:'考勤',
      zhi:'至',
      shizhi:'设置',
      zaoyu:'早于',
      wanyu:'晚于'
    },
    jieduantongji:{
      jinchuxiaotongji:'进出校统计',
      kaoqinpaihang:'考勤排行',
      leijiceshirenshu:'累计测试人数',
      zaixiaoshengrenshu:'在校生人数',
      leijiyichangrenshu:'累计异常人数',
      tiwyichangbanji:'体温异常班级信息',
      renshu:'人数'
    },
    tiwentongji:{
      tiwenjiankong:'体温监控',
      tiwenyicha:'体温异常学生名单',
      tiwenyujin:'体温预警',
      uptiwentishi:'超过体温预警值会提示',
      fareyujin:'发热预警',
      upfaretishi:'超过发热预警值但低于高热会显著提示',
      gaoreyujin:'高热预警',
      upgaoretishi:'超过高热会更加显著且频繁的提示'
    },
    temperatureData:{
      temperatureDataTitle:"体温数据",
      checkData: "查询",
      exportData:"导出",
      studentID:"学号",
      studentName:"姓名",
      maxTemperature:"最高体温",
      minTemperature:"最低体温",
      avgTemperature:"平均体温",
      newTemperature:"最新体温",
      detectTime:"测量时间"
    },
    moveStep:{
      moveStepTitle:"运动步数",
      allSchoolSituation:"全校概况",
      dayAvgSteps:"日均步数",
      dayAvgCalories:"日均消耗卡路里",
      classData:"班级数据",
      chartTitle:"全校统计"
    }
  },
  ...zhLocale
}

export default cn;
