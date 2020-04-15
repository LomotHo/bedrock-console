[Minecraft服务端下载]:https://minecraft.net/en-us/download/server/bedrock/

# bedrock-console
本项目是一个使用Nodejs实现的Minecraft Bedrock服务器的web控制台，同时支持使用http接口向后台发送命令。

当前版本(0.3.3)暂时还没有添加用户验证功能，如果需要请回退到[0.1.3](https://github.com/LomotHo/bedrock-console/tree/0.1.3)

![screenshot](https://raw.githubusercontent.com/LomotHo/bedrock-console/master/screenshot/bedrock-console-ui.png)
## 运行

### 直接运行
```sh
# 1. clone项目
git clone https://github.com/LomotHo/bedrock-console.git && cd bedrock-console

# 2. 创建bedrock文件夹，解压服务端程序到bedrock
mkdir bedrock && cd bedrock && unzip bedrock-server-1.xx.xx.xx.zip
cd ..

# 3.构建vue（要先安装nodejs, 当前构建使用版本为12.16）
cd vue
npm i
npm run build
cd ..

# 4.运行
npm i
node app.js
```

### 使用 docker 容器（推荐）

 - 指定端口
    ```sh
    docker run -d --restart=always --name=mcpe-console \
      -p 19132:19132/udp -p 3000:3000 \
      -v /opt/mcpe-data:/server/bedrock \
      lomot/bedrock-web-console:latest
    ```

 - 使用host模式
    ```sh
    docker run -d --restart=always --name=mcpe-console --net=host \
      -v /opt/mcpe-data:/server/bedrock \
      lomot/bedrock-web-console:latest
    ```

注意: 
 - 服务端数据文件夹```/opt/mcpe-data```需要包括完整的服务器文件才能运行, 第一次配置建议从官方网站下载并解压[Minecraft服务端下载]
 - 替换配置文件：在```/opt/mcpe-data```中添加```console.js```文件可以覆盖默认配置，格式为：

    ```json
    var config = {
      "localPort": 3000
    };
    module.exports = config;
    ```

## 配置
默认配置文件是config/config-default.js，当前可用项目：
 - localPort: 控制台网页端口


## HTTP api 接口
#### GET /api/v1/sendcmd
 - 用法: ```GET www.xx.xx:3000/api/v1/sendcmd?cmd=xxxx```, 
 - 示例: 
  - list: ```GET www.xx.xx:3000/api/v1/sendcmd?cmd=list```, (暂时不能返回数据)
  - op: ```GET www.xx.xx:3000/api/v1/sendcmd?cmd=op%20"lomot%20coyote"``` cmd后面的参数需要进行url编码，原命令为```op "lomot coyote"```

## 使用

默认主页为：http://www.xxx.com:3000

## todo list
 - http api（待拓展）
 - 身份验证
 - 白名单

## 关联项目
### [LomotHo/minecraft-bedrock](https://github.com/LomotHo/minecraft-bedrock)
使用docker包装的bsd服务器，快速部署

### [LomotHo/bedrock-webconsole-ui](https://github.com/LomotHo/bedrock-webconsole-ui)
bedrock-console项目的web界面

### [LomotHo/bedrock-api](https://github.com/LomotHo/bedrock-api)
bedrock http api，通过http向bds后台发送命令，相当于bedrock-console项目的无后台界面版

