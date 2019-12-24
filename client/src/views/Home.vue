<template>
  <div class="home">
    <el-container>
      <el-header>
        <p class='headerfont'>STUDENT CARD DATA VISUALIZATION</p>
      </el-header>
      <el-container class="maincontainer">
        <el-aside width="200px" height="1020px" style="background: linear-gradient(90deg, rgba(186,231,255,01), rgba(0,0,0,0) )">
          <div>
            <div style="padding-top:50px">
              <span class='functitle'> Function</span>
            </div>
            <div>
              <span class='functitle'> Side </span>
            </div>
            
            <div style="padding-top: 50px;">
              <div id="side_costmatrix" class="side">
                  <el-dropdown @command="handleMatrix1">
                    <span class="el-dropdown-link">
                      CostMatrix1<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                      <el-dropdown-item :command="index" v-for="(val, index) in costmatrix1">{{val}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
              </div>
              <div id="side_costmatrix" class="side matrix2">
                  <el-dropdown @command="handleMatrix2">
                    <span class="el-dropdown-link">
                      CostMatrix2<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                      <el-dropdown-item :command="index" v-for="(val, index) in costmatrix2">{{val}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
              </div>
              <el-divider></el-divider>
              <div id="side_hallcondition" class="side">
                <el-dropdown @command="handlehallCondition">
                    <span class="el-dropdown-link">
                      HallCondition<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                      <el-dropdown-item :command="index" v-for="(val, index) in hallcondition">{{val}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

              </div>
              <el-divider></el-divider>
              <div id="side_frequentpattern" class="side">
                <el-dropdown @command="handlehallFrequentpattern">
                    <span class="el-dropdown-link">
                      FrequentPattern<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                      <el-dropdown-item :command="index" v-for="(val, index) in frequentpattern">{{val}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                
              </div>
              <el-divider></el-divider>
              <div id="side_cluster" class="side">
                <el-dropdown @command="handlehallCluster">
                    <span class="el-dropdown-link">
                      Cluster<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                      <el-dropdown-item :command="index" v-for="(val, index) in cluster">{{val}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

              </div>
            </div>

          </div>
        </el-aside>
        <el-aside width="880px" height="1020px" style="overflow:auto">
            <el-main class="detailcontainer">
              <Behavior></Behavior>
            </el-main>
        </el-aside>

        <el-aside width="10px" height="1020px" style="background: linear-gradient(270deg, rgba(186,231,255,0.5), rgba(0,0,0,0) )"></el-aside>
        <el-aside width="10px" height="1020px" style="background: linear-gradient(90deg, rgba(186,231,255,0.5), rgba(0,0,0,0) )"></el-aside>
          
          <el-main height="1020px">
            <BehaviorDetail></BehaviorDetail>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Behavior from '../components/Behavior'
import BehaviorDetail from '../components/BehaviorDetail'
import ControlPanel from '../components/ControlPanel'
import DataManager from '../components/DataManager'
export default {
  data(){
    return{
        costmatrix1: [
        "18工业设计", "18机械制造", "18计算机应用", "18电气自动化", "18国贸实务","18软件技术","18宝玉石鉴定","18电子商务","18模具设计",
        "18连锁经营","18旅游管理","18视觉传播","18国际金融","18会计","18商务英语","18金融管理","18审计","18嵌入式技术","18建筑设计"],
        costmatrix2:["18皮具艺术","18国际商务","18计算机网络","18工商企管","18市场营销","18首饰设计","18工程造价","18工业工程","18物流管理","18商务日语",
        "18建筑工程","18艺术设计","18工业机器人","18社会工作","18汽车检测","18市政工程","18酒店管理","18产品艺术","18机械制造（学徒）",
        "18动漫设计","18环境艺术","18投资与理财"],
        hallcondition:['hall_weekday', 'hall_weekend'],
        frequentpattern:[1,2,3],
        cluster:[-1, 1, 3, 8, 9, 12, 13, 16, 17, 18],
        value: '',
        radio: '1'
    }
  },
  name: 'home',
  components: {
    Behavior,
    BehaviorDetail,
    ControlPanel
  },
  mounted(){
  },
  methods:{
      handleMatrix1(command) {
        let that = this
        //this.$message('click on item ' + that.costmatrix1[command]);
        this.$store.commit('costmatrix', that.costmatrix1[command])
      },
      handleMatrix2(command) {
        let that = this
        //this.$message('click on item ' + that.costmatrix2[command]);
        this.$store.commit('costmatrix', that.costmatrix2[command])
      },
      handlehallCondition(command){
        let that = this
        //this.$message('click on item ' + that.hallcondition[command]);
        this.$store.commit('hallcondition', that.hallcondition[command])
      },
      handlehallFrequentpattern(command){
        let that = this
        //this.$message('click on item ' + that.frequentpattern[command]);
        this.$store.commit('frequentpattern', that.frequentpattern[command])
      },
      handlehallCluster(command){
        let that = this
        //this.$message('click on item ' + that.cluster[command]);
        this.$store.commit('cluster', that.cluster[command])
      }
  }
}
</script>
<style>
body{
  margin: 0px !important;
}
.maincontainer{
  height: 1005px !important;
}
.el-header{
  height: none !important;
  color: white;
  background-color: rgb(58,161,255);
  padding: 0 0 !important;
}
.el-footer{
  height: 150px !important;
  background-color: grey;
}

.headerfont{
  font-size: 33px;
  margin-block-start: 6px;
  margin-block-end: 0;
  letter-spacing: 4px;
  padding-top: 6px;
  font-family: fantasy;
}
.side{
  height: 100px;
  padding-top:20px;
}


.side span{
  color: grey;
  font-size: 15px;
  font-weight: bolder;
}

.functitle{
  font-family:fantasy;
  color:lightslategrey;
  padding-top: 20px;
  font-size: 30px;
}
.detailcontainer{
  overflow: hidden !important;
}

</style>
