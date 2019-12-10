<template>
  <div class="home">
    <el-container>
      <el-header>Student Card Data Visualization</el-header>
      <el-container>
        <el-aside width="960px">
          <Behavior></Behavior>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Behavior from '../components/Behavior'

export default {
  name: 'home',
  components: {
    Behavior
  }
}
</script>
