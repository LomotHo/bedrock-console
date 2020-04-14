<template>
  <div class="api">
    <h1>http 接口</h1>
    <pre>
GET /api/v1/sendcmd
    用法: GET www.xx.xx:3000/api/v1/sendcmd?cmd=xxxx,
    示例:
        list: GET www.xx.xx:3000/api/v1/sendcmd?cmd=list, (暂时不能返回数据)
        op: GET www.xx.xx:3000/api/v1/sendcmd?cmd=op%20"lomot%20coyote" cmd后面的参数需要进行url编码，原命令为 op "lomot coyote"
    </pre>
    <!-- <p>版本: 0.2.0</p>
    <p>项目主页:
      <el-link href="https://github.com/LomotHo/bedrock-console" target="_blank" type="primary">https://github.com/LomotHo/bedrock-console</el-link>
    </p> -->
  </div>
</template>


<style lang="less">
.api{
  // .el-main {
      background-color: #E9EEF3;
      // background-color: #eee;
      color: #333;
      text-align: left;
    p{
      margin: 0;
    }
  // }

}
</style>