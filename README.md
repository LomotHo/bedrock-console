[Minecraft服务端下载]:https://minecraft.net/en-us/download/server/bedrock/

# bedrock-console
version: 0.2.0


![snapshot](https://static-1251996892.cos.ap-chengdu.myqcloud.com/img/markdown/2020/bedrock-console-ui.jpg)
## 运行

### 直接运行
```
// 1. clone项目
git clone https://github.com/LomotHo/bedrock-console.git && cd bedrock-console

// 2. 创建bedrock文件夹，解压服务端程序到bedrock
mkdir bedrock && unzip bedrock-server-1.xx.xx.xx.zip

// 3.运行（要先安装nodejs）
npm i
node app.js
```

### docker
```
docker run -d --restart=always --name=mcpe-console --net=host \
  -v /opt/mcpe-data:/server/bedrock \
  lomot/minecraft-bedrock:base-console
```

注意: 
 - 服务端数据文件夹/opt/mcpe-data需要包括完整的服务器文件才能运行, 第一次配置建议从官方网站下载并解压[Minecraft服务端下载]
 - 替换配置文件：在```/opt/mcpe-data```中添加```console.js```文件可以替换默认配置，格式为：

  ```json
  var config = {
    "localPort": 3000,
    "password": "123456"
  };
  module.exports = config;
  ```

## 配置
#### 配置文件是config/index.js，当前可用项目：
 - localPort: 控制台网页端口
 - password: 控制台密码 默认为123456

## 使用

默认登录页面为：http://www.xxx.com:3000/index.html

## 引用
### Minecraft-Nodejs-live-web-console
部分代码来自于此项目: https://github.com/robinp7720/Minecraft-Nodejs-live-web-console
