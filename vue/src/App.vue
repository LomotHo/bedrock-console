<template>
<el-container class="main-body">
  <el-aside width="160px">
    <el-menu class="el-menu-demo"
    :router=true
    @select="handleSelect"
    background-color="#545c64"
    active-text-color="#ffd04b"
    text-color="#fff"
    mode="vertical" >
      <li class="nav-title">
        Bedrock Console
      </li>
      <el-menu-item index="/">
        <i class="el-icon-s-platform"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-menu-item index="api">
        <i class="el-icon-upload2"></i>
        <span slot="title">http接口</span>
      </el-menu-item>
      <el-menu-item index="whitelist">
        <i class="el-icon-s-order"></i>
        <span slot="title">白名单</span>
      </el-menu-item>
      <el-menu-item index="about">
        <i class="el-icon-more"></i>
        <span slot="title">关于</span>
      </el-menu-item>
    </el-menu>
  </el-aside>

  <el-container direction="vertical">
    <!-- <el-header>Header</el-header> -->
    <el-main>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </el-main>

    <lo-footer/>
  </el-container>
</el-container>
</template>

<style lang="less">
html,body, .main-body{
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.nav-title{
  // padding-left: 20px;
  text-align: center;
  color: #222;
  line-height: 36px;
  font-size: 14px;
  // background-color: #545c64;
  background-color: #ffc942;
  // border-bottom-style: solid;
  // border-bottom-color: #545c64;
  // border-bottom-width: 2px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  // text-align: center;
  line-height: 200px;
  .el-menu {
    border-right-width: 0px;

  }
  .el-menu-item {
    // border-bottom-style: solid;
    // border-bottom-color: #ffc942;
    // border-bottom-width: 1px;
  }
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
  
.el-main {
  background-color: #E9EEF3;
  // background-color: #eee;
  color: #333;
  text-align: center;
  // line-height: 80px;
}

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    "lo-footer": Footer
  },
  methods: {
    enableRouter(){
      return true;
    },
    handleSelect(){

    },

  }
}
</script>