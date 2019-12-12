<template>
  <div class="home">
    <el-container>
      <el-header>
        <h3>Student Card Data Visualization</h3>
      </el-header>
      <el-container>
        <el-aside width="960px" style="overflow:auto">
          <Behavior></Behavior>
        </el-aside>
        <el-main>
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
export default {
  name: 'home',
  components: {
    Behavior,
    BehaviorDetail
  }
}
</script>
<style>
.el-header{
  border: 3px solid;
}
</style>
