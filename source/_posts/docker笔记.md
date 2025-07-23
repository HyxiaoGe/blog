---
title: Docker 命令完整笔记
date: 2024-07-15 22:48:43
tags:
  - Docker
categories: 笔记
---


## 一、Docker 基础配置

1. **安装后配置**
   ```bash
   # 将当前用户添加到docker组（避免每次使用sudo）
   sudo usermod -aG docker $USER
   
   # 配置Docker开机自启
   sudo systemctl enable docker
   sudo systemctl start docker
   
   # 查看Docker版本
   docker version
   docker info
   ```

2. **配置镜像加速器**
   ```bash
   # 编辑Docker配置文件
   sudo vim /etc/docker/daemon.json
   
   # 添加镜像加速器配置
   {
     "registry-mirrors": [
       "https://docker.m.daocloud.io",
       "https://dockerproxy.com",
       "https://docker.mirrors.ustc.edu.cn",
       "https://docker.nju.edu.cn",
       "https://iju9kaj2.mirror.aliyuncs.com",
       "http://hub-mirror.c.163.com",
       "https://cr.console.aliyun.com",
       "https://hub.docker.com",
       "http://mirrors.ustc.edu.cn"
     ]
   }
   
   # 重启Docker服务
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

## 二、镜像管理

1. **搜索和拉取镜像**
   ```bash
   docker search nginx                 # 搜索镜像
   docker pull nginx                   # 拉取最新版本
   docker pull nginx:1.21              # 拉取指定版本
   docker pull ubuntu:20.04            # 拉取Ubuntu 20.04
   ```

2. **查看本地镜像**
   ```bash
   docker images                       # 列出本地镜像
   docker images -a                    # 显示所有镜像（包括中间层）
   docker images nginx                 # 查看特定镜像
   docker images --format "{{.ID}}: {{.Repository}}"  # 自定义格式输出
   ```

3. **镜像详细信息**
   ```bash
   docker inspect nginx                # 查看镜像详细信息
   docker history nginx                # 查看镜像历史
   docker image prune                  # 清理未使用的镜像
   docker rmi nginx:1.21               # 删除指定镜像
   docker rmi $(docker images -q)      # 删除所有镜像
   ```

4. **保存和加载镜像**
   ```bash
   docker save -o nginx.tar nginx:latest     # 保存镜像到tar文件
   docker load -i nginx.tar                  # 从tar文件加载镜像
   docker save nginx:latest | gzip > nginx.tar.gz  # 压缩保存
   ```

5. **构建镜像**
   ```bash
   docker build -t myapp:1.0 .              # 从Dockerfile构建
   docker build -t myapp:1.0 -f Dockerfile.dev .  # 指定Dockerfile
   docker build --no-cache -t myapp:1.0 .   # 不使用缓存构建
   ```

## 三、容器管理

1. **运行容器**
   ```bash
   docker run nginx                    # 运行nginx容器
   docker run -d nginx                 # 后台运行
   docker run -p 8080:80 nginx         # 端口映射
   docker run --name mynginx nginx     # 指定容器名称
   docker run -it ubuntu bash          # 交互式运行
   docker run -e MYSQL_ROOT_PASSWORD=123456 mysql  # 设置环境变量
   docker run -v /host/data:/container/data nginx  # 挂载数据卷
   docker run --rm nginx               # 容器退出后自动删除
   ```

2. **查看容器**
   ```bash
   docker ps                           # 查看运行中的容器
   docker ps -a                        # 查看所有容器
   docker ps -q                        # 只显示容器ID
   docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"
   ```

3. **容器操作**
   ```bash
   docker start container_id           # 启动容器
   docker stop container_id            # 停止容器
   docker restart container_id         # 重启容器
   docker pause container_id           # 暂停容器
   docker unpause container_id         # 恢复容器
   docker rm container_id              # 删除容器
   docker rm -f container_id           # 强制删除运行中的容器
   docker container prune              # 清理停止的容器
   ```

4. **容器交互**
   ```bash
   docker exec -it container_id bash   # 进入运行中的容器
   docker exec container_id ls /app    # 在容器中执行命令
   docker attach container_id          # 附加到容器
   docker cp file.txt container_id:/app/  # 复制文件到容器
   docker cp container_id:/app/file.txt ./  # 从容器复制文件
   ```

5. **查看容器信息**
   ```bash
   docker logs container_id            # 查看容器日志
   docker logs -f container_id         # 实时查看日志
   docker logs --tail 100 container_id # 查看最后100行
   docker top container_id             # 查看容器进程
   docker stats                        # 查看容器资源使用
   docker inspect container_id         # 查看容器详细信息
   ```

## 四、网络管理

1. **网络操作**
   ```bash
   docker network ls                   # 列出网络
   docker network create mynet         # 创建网络
   docker network inspect bridge       # 查看网络详情
   docker network rm mynet             # 删除网络
   ```

2. **容器网络**
   ```bash
   docker run --network=mynet nginx    # 指定网络运行容器
   docker network connect mynet container_id    # 连接容器到网络
   docker network disconnect mynet container_id  # 断开连接
   ```

3. **端口映射**
   ```bash
   docker run -p 8080:80 nginx         # 映射端口8080到容器80
   docker run -p 127.0.0.1:8080:80 nginx  # 只绑定本地地址
   docker run -P nginx                 # 随机映射端口
   docker port container_id            # 查看端口映射
   ```

## 五、数据卷管理

1. **创建和管理数据卷**
   ```bash
   docker volume create mydata         # 创建数据卷
   docker volume ls                    # 列出数据卷
   docker volume inspect mydata        # 查看数据卷详情
   docker volume rm mydata             # 删除数据卷
   docker volume prune                 # 清理未使用的数据卷
   ```

2. **使用数据卷**
   ```bash
   docker run -v mydata:/app nginx     # 挂载命名数据卷
   docker run -v /host/path:/container/path nginx  # 挂载主机目录
   docker run --mount source=mydata,target=/app nginx  # 使用--mount
   docker run -v $(pwd):/app nginx     # 挂载当前目录
   ```

## 六、Docker Compose

1. **基本命令**
   ```bash
   docker-compose up                   # 启动服务
   docker-compose up -d                # 后台启动
   docker-compose down                 # 停止并删除容器
   docker-compose ps                   # 查看服务状态
   docker-compose logs                 # 查看日志
   docker-compose logs -f service_name # 查看特定服务日志
   ```

2. **服务管理**
   ```bash
   docker-compose start                # 启动服务
   docker-compose stop                 # 停止服务
   docker-compose restart              # 重启服务
   docker-compose build                # 构建服务
   docker-compose pull                 # 拉取服务镜像
   ```

3. **docker-compose.yml示例**
   ```yaml
   version: '3'
   services:
     web:
       image: nginx:latest
       ports:
         - "80:80"
       volumes:
         - ./html:/usr/share/nginx/html
       networks:
         - webnet
     
     db:
       image: mysql:5.7
       environment:
         MYSQL_ROOT_PASSWORD: password
       volumes:
         - db_data:/var/lib/mysql
       networks:
         - webnet
   
   volumes:
     db_data:
   
   networks:
     webnet:
   ```

## 七、Dockerfile编写

1. **基础指令**
   ```dockerfile
   # 基础镜像
   FROM node:14-alpine
   
   # 维护者信息
   LABEL maintainer="name@example.com"
   
   # 设置工作目录
   WORKDIR /app
   
   # 复制文件
   COPY package*.json ./
   COPY . .
   
   # 运行命令
   RUN npm install
   
   # 环境变量
   ENV NODE_ENV=production
   ENV PORT=3000
   
   # 暴露端口
   EXPOSE 3000
   
   # 启动命令
   CMD ["npm", "start"]
   ```

2. **多阶段构建**
   ```dockerfile
   # 构建阶段
   FROM node:14 AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   # 生产阶段
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. **最佳实践**
   ```dockerfile
   # 使用特定版本的基础镜像
   FROM node:14.17.0-alpine
   
   # 使用非root用户
   RUN addgroup -S appgroup && adduser -S appuser -G appgroup
   USER appuser
   
   # 利用构建缓存
   COPY package*.json ./
   RUN npm install
   COPY . .
   
   # 减少层数
   RUN apt-get update && apt-get install -y \
       package1 \
       package2 \
       && rm -rf /var/lib/apt/lists/*
   ```

## 八、镜像仓库操作

1. **登录和推送**
   ```bash
   docker login                        # 登录Docker Hub
   docker login registry.example.com   # 登录私有仓库
   docker tag myapp:1.0 username/myapp:1.0  # 标记镜像
   docker push username/myapp:1.0      # 推送镜像
   ```

2. **私有仓库**
   ```bash
   # 运行私有仓库
   docker run -d -p 5000:5000 --name registry registry:2
   
   # 标记并推送到私有仓库
   docker tag myapp:1.0 localhost:5000/myapp:1.0
   docker push localhost:5000/myapp:1.0
   
   # 从私有仓库拉取
   docker pull localhost:5000/myapp:1.0
   ```

## 九、容器资源限制

1. **CPU限制**
   ```bash
   docker run --cpus=2 nginx           # 限制使用2个CPU
   docker run --cpu-shares=512 nginx   # CPU共享权重
   docker run --cpuset-cpus="0,1" nginx  # 指定CPU核心
   ```

2. **内存限制**
   ```bash
   docker run -m 512m nginx            # 限制内存512MB
   docker run --memory-swap=1g nginx   # 限制总内存(含swap)
   docker run --oom-kill-disable nginx # 禁用OOM killer
   ```

3. **其他资源限制**
   ```bash
   docker run --device-read-bps /dev/sda:1mb nginx  # 限制磁盘读取速度
   docker run --device-write-bps /dev/sda:1mb nginx # 限制磁盘写入速度
   docker run --pids-limit 100 nginx   # 限制进程数
   ```

## 十、Docker健康检查

1. **Dockerfile中定义**
   ```dockerfile
   HEALTHCHECK --interval=30s --timeout=3s \
     CMD curl -f http://localhost/ || exit 1
   ```

2. **运行时指定**
   ```bash
   docker run -d --health-cmd="curl -f http://localhost/ || exit 1" \
              --health-interval=30s \
              --health-timeout=3s \
              --health-retries=3 \
              nginx
   ```

3. **查看健康状态**
   ```bash
   docker inspect --format='{{.State.Health.Status}}' container_id
   docker ps --filter health=healthy
   ```

## 十一、日志管理

1. **日志驱动配置**
   ```bash
   # 配置JSON文件日志驱动
   docker run --log-driver=json-file \
              --log-opt max-size=10m \
              --log-opt max-file=3 \
              nginx
   
   # 配置syslog日志驱动
   docker run --log-driver=syslog \
              --log-opt syslog-address=tcp://192.168.0.42:123 \
              nginx
   ```

2. **查看日志**
   ```bash
   docker logs container_id            # 查看容器日志
   docker logs -f --tail 100 container_id  # 实时查看最后100行
   docker logs --since 30m container_id    # 查看最近30分钟的日志
   ```

## 十二、清理和维护

1. **系统清理**
   ```bash
   docker system df                    # 查看Docker磁盘使用
   docker system prune                 # 清理未使用的数据
   docker system prune -a              # 清理所有未使用的数据
   docker system prune --volumes       # 同时清理数据卷
   ```

2. **资源清理**
   ```bash
   docker container prune              # 清理停止的容器
   docker image prune                  # 清理未使用的镜像
   docker volume prune                 # 清理未使用的数据卷
   docker network prune                # 清理未使用的网络
   ```

## 十三、故障排查

1. **容器调试**
   ```bash
   docker logs container_id            # 查看容器日志
   docker inspect container_id         # 查看容器详细信息
   docker exec -it container_id sh     # 进入容器shell
   docker diff container_id            # 查看容器文件变化
   docker events                       # 查看Docker事件
   ```

2. **网络调试**
   ```bash
   docker network inspect bridge       # 查看网络详情
   docker exec container_id ping other_container  # 测试容器间连通性
   docker exec container_id nslookup other_container  # DNS解析测试
   ```

3. **性能分析**
   ```bash
   docker stats                        # 实时查看资源使用
   docker top container_id             # 查看容器进程
   docker inspect -f '{{.State.Pid}}' container_id  # 获取容器PID
   ```

## 十四、安全最佳实践

1. **运行时安全**
   ```bash
   # 以只读模式运行容器
   docker run --read-only nginx
   
   # 限制容器capabilities
   docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx
   
   # 使用非root用户运行
   docker run --user=1000:1000 nginx
   ```

2. **镜像安全**
   ```bash
   # 扫描镜像漏洞
   docker scan nginx:latest
   
   # 使用官方镜像或可信来源
   docker pull docker.io/library/nginx:latest
   
   # 签名验证
   docker trust inspect nginx:latest
   ```

## 十五、常用技巧和别名

1. **实用别名**
   ```bash
   # 添加到~/.bashrc或~/.zshrc
   alias dps='docker ps'
   alias dpsa='docker ps -a'
   alias di='docker images'
   alias drm='docker rm $(docker ps -aq)'
   alias drmi='docker rmi $(docker images -q)'
   alias dex='docker exec -it'
   alias dlog='docker logs -f'
   ```

2. **常用组合命令**
   ```bash
   # 停止所有容器
   docker stop $(docker ps -aq)
   
   # 删除所有停止的容器
   docker rm $(docker ps -aq -f status=exited)
   
   # 删除所有未打标签的镜像
   docker rmi $(docker images -f "dangling=true" -q)
   
   # 查看容器IP地址
   docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_id
   
   # 导出容器文件系统
   docker export container_id > container.tar
   ```

## 十六、Docker Swarm集群管理

1. **初始化和加入集群**
   ```bash
   # 初始化Swarm集群
   docker swarm init --advertise-addr 192.168.1.100
   
   # 获取加入token
   docker swarm join-token worker
   docker swarm join-token manager
   
   # 加入集群
   docker swarm join --token SWMTKN-1-xxx 192.168.1.100:2377
   ```

2. **服务管理**
   ```bash
   # 创建服务
   docker service create --name web --replicas 3 -p 80:80 nginx
   
   # 扩展服务
   docker service scale web=5
   
   # 更新服务
   docker service update --image nginx:1.21 web
   
   # 查看服务
   docker service ls
   docker service ps web
   ```

## 十七、实际应用示例

1. **Web应用部署**
   ```bash
   # 创建网络
   docker network create webapp-net
   
   # 运行数据库
   docker run -d \
     --name db \
     --network webapp-net \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_DATABASE=webapp \
     -v mysql-data:/var/lib/mysql \
     mysql:5.7
   
   # 运行Web应用
   docker run -d \
     --name webapp \
     --network webapp-net \
     -p 8080:80 \
     -e DB_HOST=db \
     -e DB_USER=root \
     -e DB_PASSWORD=secret \
     -e DB_NAME=webapp \
     webapp:latest
   ```

2. **开发环境搭建**
   ```yaml
   # docker-compose.yml
   version: '3'
   services:
     frontend:
       build: ./frontend
       volumes:
         - ./frontend:/app
         - /app/node_modules
       ports:
         - "3000:3000"
       command: npm start
     
     backend:
       build: ./backend
       volumes:
         - ./backend:/app
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=development
       depends_on:
         - db
     
     db:
       image: postgres:13
       volumes:
         - pgdata:/var/lib/postgresql/data
       environment:
         - POSTGRES_PASSWORD=secret
         - POSTGRES_DB=myapp
   
   volumes:
     pgdata:
   ```

3. **CI/CD集成**
   ```bash
   # Jenkinsfile示例
   pipeline {
     agent { docker { image 'node:14' } }
     stages {
       stage('Build') {
         steps {
           sh 'npm install'
           sh 'npm run build'
         }
       }
       stage('Test') {
         steps {
           sh 'npm test'
         }
       }
       stage('Docker Build') {
         steps {
           sh 'docker build -t myapp:${BUILD_NUMBER} .'
         }
       }
       stage('Deploy') {
         steps {
           sh 'docker push myapp:${BUILD_NUMBER}'
         }
       }
     }
   }
   ```