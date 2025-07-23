---
title: Linux常用命令
date: 2024-08-10 00:05:22
tags:
  - Linux
categories: 笔记
---

## 一、文件与目录操作

1. **列出目录内容**
   - `ls`：列出当前目录
   - `ls -l`：显示详细信息（权限、拥有者、大小、修改时间）
   - `ls -a`：包括隐藏文件（`.` 开头）
   - `ls -lh`：人性化显示文件大小（K, M, G）
   - `ls -lt`：按修改时间排序，最新在前
   - `ls -lS`：按文件大小排序，最大在前
   ```bash
   ls -la /etc          # 列出 /etc 目录的所有文件（包括隐藏文件）
   ls -lh ~/Downloads   # 显示下载目录文件，以人性化方式显示大小
   ls -lt *.log         # 按时间排序显示所有日志文件
   ```

2. **目录切换与查看**
   - `pwd`：显示当前所在目录的完整路径
   - `cd 目录`：切换目录
   - `cd ..`：返回上级目录
   - `cd -`：返回上次所在目录
   - `cd ~`：切换到用户主目录
   ```bash
   pwd                  # 显示当前工作目录
   cd /var/log          # 切换到系统日志目录
   cd ../..             # 返回上两级目录
   cd -                 # 快速返回上一个访问的目录
   cd ~/Documents       # 切换到用户文档目录
   ```
   
3. **复制/移动/删除**
   - `cp 源 目标`：复制文件或目录（加 `-r` 递归）
   - `cp -i`：覆盖前询问
   - `cp -p`：保留源文件属性（时间戳、权限等）
   - `mv 源 目标`：移动或重命名
   - `mv -i`：覆盖前询问
   - `rm 文件`：删除文件；`rm -r 目录`：递归删除目录
   - `rm -i`：删除前询问确认
   - `rm -f`：强制删除，不询问
   ```bash
   cp file1.txt file2.txt              # 复制文件
   cp -r dir1/ dir2/                   # 递归复制目录
   cp -ip old.conf new.conf            # 复制文件并保留属性，覆盖前询问
   mv oldname.txt newname.txt          # 重命名文件
   mv *.jpg ~/Pictures/                # 移动所有图片到目录
   rm -rf temp/                        # 强制删除目录及内容（慎用）
   ```

4. **创建文件与目录**
   - `mkdir 目录名`：创建目录
   - `mkdir -p 路径/目录`：创建多级目录
   - `touch 文件名`：创建空文件或更新时间戳
   - `rmdir 目录名`：删除空目录
   - `tree`：以树状图显示目录结构（若未安装可 `sudo apt install tree`）
   
5. **链接操作**
   - `ln -s 源文件 软链接`：创建软链接（符号链接）
   - `ln 源文件 硬链接`：创建硬链接
   - `readlink 链接`：查看链接指向的实际路径
   ```bash
   ln -s /usr/bin/python3 ~/bin/python           # 创建 Python 软链接
   ln important.txt backup_hard_link.txt         # 创建硬链接
   readlink /bin/sh                              # 查看链接指向的实际文件
   ls -l /bin | grep '^l'                        # 查看所有符号链接
   ```

6. **查看文件内容**
   - `cat 文件`：一次性显示全文
   - `cat -n`：显示行号
   - `more/less 文件`：分页查看，`/ + 关键字` 搜索，`n` 跳到下一个匹配
   - `head -n 10 文件`：查看前 10 行；`tail -n 10 文件`：后 10 行
   - `tail -f 文件`：实时追踪文件新增内容，常用于日志监控
   - `file 文件`：查看文件类型

------

## 二、文本处理与过滤

1. **过滤与查找**
   - `grep 模式 文件`：查找匹配行；`-i` 忽略大小写；`-n` 显示行号；`-v` 反向查找
   - `grep -r 模式 目录`：递归搜索目录
   - `grep -E '正则表达式'`：使用扩展正则表达式
   - `egrep`：等同于 `grep -E`
   - `awk '{print $1,$3}' 文件`：按空格分列，打印第 1、3 列
   - `cut -d':' -f1 /etc/passwd`：以 `:` 分割，取第一列
   - `sed 's/old/new/g' 文件`：替换（默认只输出到标准输出）；加 `-i` 直接修改文件
   - `sed -n '1,10p' 文件`：只显示第 1-10 行
   ```bash
   grep -n "ERROR" server.log                    # 查找错误日志，显示行号
   grep -r "TODO" ./src                          # 递归搜索源代码中的 TODO
   grep -E '^[0-9]{3}-[0-9]{4}

2. **排序与去重**
   - `sort 文件`：排序；`sort -n` 数值排序；`-r` 逆序；`-k n` 指定第 n 列排序
   - `uniq 文件`：去除相邻重复；`uniq -c` 统计次数；常与 `sort` 管道配合：
     ```bash
     sort abc.txt | uniq -c
     ```
   - `comm 文件1 文件2`：比较两个已排序文件的异同

3. **统计与比较**
   - `wc -l 文件`：统计行数；`-m` 字符数；`-c` 字节数；`-L` 最长行长度；`-w` 单词数
   - `diff 文件1 文件2`：比较文件差异
   - `diff -u`：以统一格式显示差异
   - `cmp 文件1 文件2`：二进制比较文件

4. **字符转换**
   - `tr 'a-z' 'A-Z' < 文件`：小写转大写
   - `tr -d '0-9'`：删除所有数字
   - `tr -s ' '`：压缩连续空格为单个空格
   ```bash
   echo "hello world" | tr 'a-z' 'A-Z'          # 转换为大写: HELLO WORLD
   echo "user123pass456" | tr -d '0-9'          # 删除数字: userpass
   echo "too    many    spaces" | tr -s ' '      # 压缩空格: too many spaces
   cat file.txt | tr '\n' ' '                    # 将换行符替换为空格
   ```

------

## 三、权限与拥有者

1. **查看权限**
   - `ls -l` 第一列如 `-rwxr-xr--`：分别是文件类型、用户/组/其他用户的读(r)/写(w)/执行(x) 权限
   - `stat 文件`：查看文件详细状态信息

2. **修改权限**
   - `chmod u+rw 文件`：用户添加读写权限；也可用数字模式，如 `chmod 755 文件`
   - `chmod g-w 文件`：组移除写权限
   - `chmod o+x 文件`：其他用户添加执行权限
   - `chmod -R 755 目录`：递归修改目录及子目录权限
   ```bash
   chmod 644 file.txt                   # 设置 rw-r--r-- 权限
   chmod u+x script.sh                  # 给所有者添加执行权限
   chmod -R 755 /var/www/html          # 递归设置 web 目录权限
   chmod a-x sensitive.dat             # 移除所有用户的执行权限
   ```

3. **修改拥有者/所属组**
   - `chown user:group 文件`：同时修改用户与组
   - `chown user 文件` 或 `chown :group 文件`
   - `chown -R user:group 目录`：递归修改目录权限

4. **特殊权限**
   - `chmod u+s 文件`：设置 SUID 权限
   - `chmod g+s 目录`：设置 SGID 权限
   - `chmod +t 目录`：设置粘滞位
   - `umask`：查看默认权限掩码
   - `umask 022`：设置默认权限掩码

5. **文件属性**
   - `lsattr 文件`：查看文件特殊属性
   - `chattr +i 文件`：设置不可修改属性
   - `chattr +a 文件`：设置只能追加属性
   ```bash
   chattr +i /etc/resolv.conf           # 防止文件被修改
   chattr +a /var/log/secure           # 只允许追加内容
   lsattr /etc/resolv.conf             # 查看文件属性
   chattr -i /etc/resolv.conf          # 移除不可修改属性
   ```

------

## 四、进程与作业管理

1. **查看进程**
   - `ps -ef`：列出所有进程；常与 `grep` 结合过滤
   - `ps aux`：显示详细进程信息
   - `pstree`：以树状图显示进程关系
   - `top` / `htop`：动态监控 CPU/内存/进程（按 q 退出）
   - `pgrep 进程名`：按名称查找进程 ID

2. **杀死进程**
   - `kill PID`：温和终止（发送 SIGTERM 信号）
   - `kill -9 PID`：强制终止（发送 SIGKILL 信号）
   - `kill -l`：列出所有信号
   - `pkill 进程名` / `killall 进程名`：按名杀死
   - `killall -u 用户名`：杀死指定用户的所有进程

3. **进程优先级**
   - `nice -n 10 命令`：以较低优先级运行命令
   - `renice +10 -p PID`：调整运行中进程的优先级

4. **后台与作业控制**
   - `command &`：后台运行
   - `jobs`：查看后台作业，`fg %1` 将第 1 个作业拉到前台，`bg %1` 让其后台运行
   - `nohup command &`：后台运行且忽略挂断信号（退出终端后继续运行）
   - `Ctrl+Z`：挂起当前进程
   - `Ctrl+C`：终止当前进程

------

## 五、网络与远程操作

1. **网络诊断**
   - `ping 主机`：连通性测试
   - `ping -c 4`：只发送 4 个数据包
   - `traceroute 主机`：路由追踪
   - `mtr 主机`：结合 ping 和 traceroute 功能
   - `netstat -anp`：查看端口、连接；常与 `grep` 结合
   - `ss -tulnp`：更现代的端口查看工具
   - `nmap 主机`：端口扫描（需要安装）

2. **DNS 查询**
   - `nslookup 域名`：查询 DNS 记录
   - `dig 域名`：详细 DNS 查询
   - `host 域名`：简单 DNS 查询
   ```bash
   nslookup google.com                  # 查询域名的 IP 地址
   dig @8.8.8.8 example.com            # 使用指定 DNS 服务器查询
   dig example.com MX                   # 查询邮件服务器记录
   host -t AAAA ipv6.google.com        # 查询 IPv6 地址
   ```

3. **网络配置**
   - `ifconfig`：查看网络接口（较旧）
   - `ip addr show`：查看 IP 地址（现代替代 ifconfig）
   - `ip route show`：查看路由表
   - `hostname`：显示主机名
   - `hostname -I`：显示所有 IP 地址
   ```bash
   ip addr show eth0                    # 显示特定网卡信息
   ip route add 192.168.1.0/24 via 192.168.1.1  # 添加静态路由
   ip link set eth0 up                  # 启用网卡
   ifconfig eth0 192.168.1.100         # 设置 IP 地址（旧方式）
   sudo hostnamectl set-hostname newname  # 修改主机名
   ```

4. **文件传输与远程登录**
   - `ssh user@host`：远程登录
   - `ssh -p 端口 user@host`：指定端口登录
   - `scp 本地 远端` / `scp user@host:远端 本地`：安全复制
   - `sftp user@host`：安全文件传输
   - `rsync -avz 源 目标`：增量同步
   - `rsync -avz --delete 源 目标`：同步并删除目标中源没有的文件

5. **下载工具**
   - `wget URL`：下载文件
   - `wget -c URL`：断点续传
   - `curl URL`：发送网络请求
   - `curl -O URL`：下载文件
   - `curl -H "Header: Value" URL`：添加请求头

6. **查看公网 IP**
   - `curl -4 ifconfig.co` 或 `curl ipinfo.io/ip`
   - `curl icanhazip.com`

------

## 六、磁盘与存储

1. **磁盘使用情况**
   - `df -h`：查看各分区总量与剩余空间
   - `df -i`：查看 inode 使用情况
   - `du -sh 目录`：查看目录总占用；`du -h --max-depth=1` 查看子目录分布
   - `du -h | sort -h`：按大小排序显示
   - `ncdu`：交互式磁盘使用分析（需要安装）

2. **块设备管理**
   - `lsblk`：列出块设备信息
   - `blkid`：显示块设备属性
   - `fdisk -l`：列出磁盘分区信息
   - `parted -l`：列出分区信息（支持 GPT）
   ```bash
   lsblk -f                             # 显示文件系统类型
   blkid /dev/sda1                      # 显示分区 UUID 和类型
   sudo fdisk -l /dev/sda               # 查看磁盘分区表
   sudo parted /dev/sda print           # 显示分区信息
   ```

3. **文件系统操作**
   - `mount 设备 挂载点`：挂载文件系统
   - `umount 设备/挂载点`：卸载文件系统
   - `mount -o remount,rw /`：重新挂载为读写模式
   - `fsck 设备`：文件系统检查和修复
   - `mkfs.ext4 设备`：创建 ext4 文件系统

4. **打包压缩**
   - `tar -czvf archive.tar.gz 目录/文件`：打包并 gzip 压缩
   - `tar -xzvf archive.tar.gz`：解压
   - `tar -tf archive.tar`：查看压缩包内容而不解压
   - `zip -r archive.zip 目录` / `unzip archive.zip`
   - `gzip 文件` / `gunzip 文件.gz`
   - `bzip2 文件` / `bunzip2 文件.bz2`
   - `xz 文件` / `unxz 文件.xz`

5. **数据复制与备份**
   - `dd if=源 of=目标 bs=块大小`：数据复制
   - `dd if=/dev/zero of=file bs=1M count=100`：创建100M空文件
   - `cp --sparse=always 文件 目标`：复制稀疏文件

------

## 七、查找与批处理

1. **查找文件**
   - `find . -name '*.log'`：当前目录及子目录查找
   - `find /path -type f -mtime -7`：查找 7 天内修改的文件
   - `find . -type f -name 'xiaohub.log.2024-06*' -delete`：批量删除
   - `find . -size +100M`：查找大于 100M 的文件
   - `find . -empty`：查找空文件或空目录
   - `find . -perm 777`：查找权限为 777 的文件

2. **快速定位**
   - `locate 文件名`：快速查找文件（基于数据库）
   - `updatedb`：更新 locate 数据库
   - `which 命令`：查找命令的完整路径
   - `whereis 命令`：查找二进制、源代码和手册页位置
   - `type 命令`：显示命令类型（别名、内置、外部命令）

3. **批量执行**
   - 与 `find` + `-exec`：
     ```bash
     find . -name '*.sh' -exec chmod +x {} \;
     find /var/log -name '*.log' -exec cp {} {}.bak \;
     find . -type f -exec md5sum {} \; > checksums.txt
     ```
   - `xargs`：
     ```bash
     find . -name '*.txt' | xargs grep '关键字'
     find . -name '*.tmp' | xargs rm -f
     ls *.jpg | xargs -I {} convert {} {}.png
     ```
   - `parallel`：并行执行命令（需要安装）
     ```bash
     find . -name '*.jpg' | parallel convert {} {.}.png
     cat urls.txt | parallel wget {}
     seq 1 10 | parallel -j4 'echo "Process {}"'
     ```

------

## 八、Shell 环境与脚本

1. **环境变量**
   - `export VAR=value`：临时设置；写入 `~/.bashrc` 或 `~/.profile` 实现持久
   - `echo $VAR`：显示变量值
   - `env`：显示所有环境变量
   - `set`：显示所有变量（包括局部变量）
   - `unset VAR`：删除变量
   - `source 文件` 或 `.`：重新加载配置

2. **Shell 配置**
   - `~/.bashrc`：bash shell 配置文件
   - `~/.bash_profile`：登录 shell 配置文件
   - `~/.bash_history`：命令历史记录

3. **常见提示**
   - `history`：查看历史命令；`!n` 重复第 n 条，`!!` 重复上一条
   - `history -c`：清除历史记录
   - `Ctrl+R`：反向搜索历史命令
   - Tab 自动补全
   - `alias ll='ls -l'`：自定义快捷命令，写入 `~/.bashrc` 生效
   - `unalias 别名`：删除别名

4. **目录操作**
   - `pushd 目录`：将目录压入堆栈并切换
   - `popd`：从堆栈弹出目录并切换
   - `dirs`：显示目录堆栈

5. **脚本规范**
   - 首行 `#!/bin/bash` 或 `#!/usr/bin/env bash`
   - 脚本执行前加执行权限：`chmod +x script.sh`
   - 参数获取：`$1,$2,…`；循环 `for arg in "$@"; do …; done`
   - `$0`：脚本名称
   - `$#`：参数个数
   - `$?`：上个命令的退出状态
   - `test` 或 `[ ]`：条件测试
   - `[[ ]]`：扩展的条件测试（支持正则）

------

## 九、系统管理

1. **服务与日志**
   - `systemctl status 服务名`：查看服务状态
   - `systemctl start/stop/restart 服务名`：启停服务
   - `systemctl enable/disable 服务名`：开机自启设置
   - `journalctl -u 服务名`：查看 systemd 日志
   - `journalctl -f`：实时查看系统日志

2. **定时任务**
   - `crontab -e`：编辑当前用户 crontab
   - `crontab -l`：列出当前用户的定时任务
   - 格式：`* * * * * command`（分 时 日 月 周）
   - `/etc/crontab`：系统级定时任务

3. **用户与组管理**
   - `useradd 用户名` / `usermod -aG group 用户名` / `userdel 用户名`
   - `passwd 用户名`：设置用户密码
   - `groups 用户名`：查看用户所属组
   - `id 用户名`：显示用户和组 ID
   - `su - 用户名`：切换用户
   - `sudo 命令`：以 root 权限执行命令

4. **系统监控**
   - `free -h`：查看内存使用情况
   - `uptime`：系统运行时间和负载
   - `dmesg`：查看内核消息
   - `lsof`：列出打开的文件
   - `lsof -i :端口`：查看端口占用情况
   - `vmstat`：虚拟内存统计
   - `iostat`：IO 统计
   - `sar`：系统活动报告（需要安装 sysstat）
   ```bash
   free -h                              # 显示人性化的内存使用信息
   uptime                               # 显示运行时间和负载
   dmesg | tail -20                     # 查看最近的内核消息
   lsof -i :80                          # 查看 80 端口占用
   lsof -p 1234                         # 查看进程 1234 打开的文件
   vmstat 2 5                           # 每 2 秒更新一次，共 5 次
   iostat -x 1                          # 每秒显示详细 IO 统计
   sar -u 1 5                           # CPU 使用率，每秒更新，共 5 次
   ```

------

## 十、软件包管理

1. **Debian/Ubuntu（APT）**
   - `apt update`：更新软件包列表
   - `apt upgrade`：升级已安装软件包
   - `apt install 软件包`：安装软件
   - `apt remove 软件包`：删除软件
   - `apt search 关键字`：搜索软件包
   - `apt show 软件包`：显示软件包信息
   - `apt autoremove`：删除不需要的依赖包

2. **RHEL/CentOS（YUM/DNF）**
   - `yum update`：更新软件包
   - `yum install 软件包`：安装软件
   - `yum remove 软件包`：删除软件
   - `yum search 关键字`：搜索软件包
   - `yum info 软件包`：显示软件包信息
   - `dnf`：新版本的 Fedora/RHEL 使用 dnf 替代 yum

3. **常用工具安装**
   - `apt install net-tools`：安装传统网络工具（ifconfig 等）
   - `apt install vim`：安装 vim 编辑器
   - `apt install htop`：安装 htop 进程监控工具
   - `apt install ncdu`：安装磁盘使用分析工具

------

## 十一、快捷键与技巧

1. **终端快捷键**
   - `Ctrl+A`：移到行首
   - `Ctrl+E`：移到行尾
   - `Ctrl+U`：删除光标前的内容
   - `Ctrl+K`：删除光标后的内容
   - `Ctrl+W`：删除光标前的单词
   - `Ctrl+L`：清屏（等同于 clear）
   - `Ctrl+D`：退出当前 shell

2. **命令行技巧**
   - `!!`：重复执行上一条命令
   - `!## 一、文件与目录操作

1. **列出目录内容**
   - `ls`：列出当前目录
   - `ls -l`：显示详细信息（权限、拥有者、大小、修改时间）
   - `ls -a`：包括隐藏文件（`.` 开头）
   - `ls -lh`：人性化显示文件大小（K, M, G）
   - `ls -lt`：按修改时间排序，最新在前
   - `ls -lS`：按文件大小排序，最大在前
   ```bash
   ls -la /etc          # 列出 /etc 目录的所有文件（包括隐藏文件）
   ls -lh ~/Downloads   # 显示下载目录文件，以人性化方式显示大小
   ls -lt *.log         # 按时间排序显示所有日志文件
   ```

2. **目录切换与查看**
   - `pwd`：显示当前所在目录的完整路径
   - `cd 目录`：切换目录
   - `cd ..`：返回上级目录
   - `cd -`：返回上次所在目录
   - `cd ~`：切换到用户主目录
   ```bash
   pwd                  # 显示当前工作目录
   cd /var/log          # 切换到系统日志目录
   cd ../..             # 返回上两级目录
   cd -                 # 快速返回上一个访问的目录
   cd ~/Documents       # 切换到用户文档目录
   ```
   
3. **复制/移动/删除**
   - `cp 源 目标`：复制文件或目录（加 `-r` 递归）
   - `cp -i`：覆盖前询问
   - `cp -p`：保留源文件属性（时间戳、权限等）
   - `mv 源 目标`：移动或重命名
   - `mv -i`：覆盖前询问
   - `rm 文件`：删除文件；`rm -r 目录`：递归删除目录
   - `rm -i`：删除前询问确认
   - `rm -f`：强制删除，不询问
   ```bash
   cp file1.txt file2.txt              # 复制文件
   cp -r dir1/ dir2/                   # 递归复制目录
   cp -ip old.conf new.conf            # 复制文件并保留属性，覆盖前询问
   mv oldname.txt newname.txt          # 重命名文件
   mv *.jpg ~/Pictures/                # 移动所有图片到目录
   rm -rf temp/                        # 强制删除目录及内容（慎用）
   ```

4. **创建文件与目录**
   - `mkdir 目录名`：创建目录
   - `mkdir -p 路径/目录`：创建多级目录
   - `touch 文件名`：创建空文件或更新时间戳
   - `rmdir 目录名`：删除空目录
   - `tree`：以树状图显示目录结构（若未安装可 `sudo apt install tree`）
   
5. **链接操作**
   - `ln -s 源文件 软链接`：创建软链接（符号链接）
   - `ln 源文件 硬链接`：创建硬链接
   - `readlink 链接`：查看链接指向的实际路径
   ```bash
   ln -s /usr/bin/python3 ~/bin/python           # 创建 Python 软链接
   ln important.txt backup_hard_link.txt         # 创建硬链接
   readlink /bin/sh                              # 查看链接指向的实际文件
   ls -l /bin | grep '^l'                        # 查看所有符号链接
   ```

6. **查看文件内容**
   - `cat 文件`：一次性显示全文
   - `cat -n`：显示行号
   - `more/less 文件`：分页查看，`/ + 关键字` 搜索，`n` 跳到下一个匹配
   - `head -n 10 文件`：查看前 10 行；`tail -n 10 文件`：后 10 行
   - `tail -f 文件`：实时追踪文件新增内容，常用于日志监控
   - `file 文件`：查看文件类型

------

## 二、文本处理与过滤

1. **过滤与查找**
   - `grep 模式 文件`：查找匹配行；`-i` 忽略大小写；`-n` 显示行号；`-v` 反向查找
   - `grep -r 模式 目录`：递归搜索目录
   - `grep -E '正则表达式'`：使用扩展正则表达式
   - `egrep`：等同于 `grep -E`
   - `awk '{print $1,$3}' 文件`：按空格分列，打印第 1、3 列
   - `cut -d':' -f1 /etc/passwd`：以 `:` 分割，取第一列
   - `sed 's/old/new/g' 文件`：替换（默认只输出到标准输出）；加 `-i` 直接修改文件
   - `sed -n '1,10p' 文件`：只显示第 1-10 行
   ```bash
   grep -n "ERROR" server.log                    # 查找错误日志，显示行号
   grep -r "TODO" ./src                          # 递归搜索源代码中的 TODO
   grep -E '^[0-9]{3}-[0-9]{4}

2. **排序与去重**
   - `sort 文件`：排序；`sort -n` 数值排序；`-r` 逆序；`-k n` 指定第 n 列排序
   - `uniq 文件`：去除相邻重复；`uniq -c` 统计次数；常与 `sort` 管道配合：
     ```bash
     sort abc.txt | uniq -c
     ```
   - `comm 文件1 文件2`：比较两个已排序文件的异同

3. **统计与比较**
   - `wc -l 文件`：统计行数；`-m` 字符数；`-c` 字节数；`-L` 最长行长度；`-w` 单词数
   - `diff 文件1 文件2`：比较文件差异
   - `diff -u`：以统一格式显示差异
   - `cmp 文件1 文件2`：二进制比较文件

4. **字符转换**
   - `tr 'a-z' 'A-Z' < 文件`：小写转大写
   - `tr -d '0-9'`：删除所有数字
   - `tr -s ' '`：压缩连续空格为单个空格
   ```bash
   echo "hello world" | tr 'a-z' 'A-Z'          # 转换为大写: HELLO WORLD
   echo "user123pass456" | tr -d '0-9'          # 删除数字: userpass
   echo "too    many    spaces" | tr -s ' '      # 压缩空格: too many spaces
   cat file.txt | tr '\n' ' '                    # 将换行符替换为空格
   ```

------

## 三、权限与拥有者

1. **查看权限**
   - `ls -l` 第一列如 `-rwxr-xr--`：分别是文件类型、用户/组/其他用户的读(r)/写(w)/执行(x) 权限
   - `stat 文件`：查看文件详细状态信息

2. **修改权限**
   - `chmod u+rw 文件`：用户添加读写权限；也可用数字模式，如 `chmod 755 文件`
   - `chmod g-w 文件`：组移除写权限
   - `chmod o+x 文件`：其他用户添加执行权限
   - `chmod -R 755 目录`：递归修改目录及子目录权限
   ```bash
   chmod 644 file.txt                   # 设置 rw-r--r-- 权限
   chmod u+x script.sh                  # 给所有者添加执行权限
   chmod -R 755 /var/www/html          # 递归设置 web 目录权限
   chmod a-x sensitive.dat             # 移除所有用户的执行权限
   ```

3. **修改拥有者/所属组**
   - `chown user:group 文件`：同时修改用户与组
   - `chown user 文件` 或 `chown :group 文件`
   - `chown -R user:group 目录`：递归修改目录权限

4. **特殊权限**
   - `chmod u+s 文件`：设置 SUID 权限
   - `chmod g+s 目录`：设置 SGID 权限
   - `chmod +t 目录`：设置粘滞位
   - `umask`：查看默认权限掩码
   - `umask 022`：设置默认权限掩码

5. **文件属性**
   - `lsattr 文件`：查看文件特殊属性
   - `chattr +i 文件`：设置不可修改属性
   - `chattr +a 文件`：设置只能追加属性
   ```bash
   chattr +i /etc/resolv.conf           # 防止文件被修改
   chattr +a /var/log/secure           # 只允许追加内容
   lsattr /etc/resolv.conf             # 查看文件属性
   chattr -i /etc/resolv.conf          # 移除不可修改属性
   ```

------

## 四、进程与作业管理

1. **查看进程**
   - `ps -ef`：列出所有进程；常与 `grep` 结合过滤
   - `ps aux`：显示详细进程信息
   - `pstree`：以树状图显示进程关系
   - `top` / `htop`：动态监控 CPU/内存/进程（按 q 退出）
   - `pgrep 进程名`：按名称查找进程 ID

2. **杀死进程**
   - `kill PID`：温和终止（发送 SIGTERM 信号）
   - `kill -9 PID`：强制终止（发送 SIGKILL 信号）
   - `kill -l`：列出所有信号
   - `pkill 进程名` / `killall 进程名`：按名杀死
   - `killall -u 用户名`：杀死指定用户的所有进程

3. **进程优先级**
   - `nice -n 10 命令`：以较低优先级运行命令
   - `renice +10 -p PID`：调整运行中进程的优先级

4. **后台与作业控制**
   - `command &`：后台运行
   - `jobs`：查看后台作业，`fg %1` 将第 1 个作业拉到前台，`bg %1` 让其后台运行
   - `nohup command &`：后台运行且忽略挂断信号（退出终端后继续运行）
   - `Ctrl+Z`：挂起当前进程
   - `Ctrl+C`：终止当前进程

------

## 五、网络与远程操作

1. **网络诊断**
   - `ping 主机`：连通性测试
   - `ping -c 4`：只发送 4 个数据包
   - `traceroute 主机`：路由追踪
   - `mtr 主机`：结合 ping 和 traceroute 功能
   - `netstat -anp`：查看端口、连接；常与 `grep` 结合
   - `ss -tulnp`：更现代的端口查看工具
   - `nmap 主机`：端口扫描（需要安装）

2. **DNS 查询**
   - `nslookup 域名`：查询 DNS 记录
   - `dig 域名`：详细 DNS 查询
   - `host 域名`：简单 DNS 查询
   ```bash
   nslookup google.com                  # 查询域名的 IP 地址
   dig @8.8.8.8 example.com            # 使用指定 DNS 服务器查询
   dig example.com MX                   # 查询邮件服务器记录
   host -t AAAA ipv6.google.com        # 查询 IPv6 地址
   ```

3. **网络配置**
   - `ifconfig`：查看网络接口（较旧）
   - `ip addr show`：查看 IP 地址（现代替代 ifconfig）
   - `ip route show`：查看路由表
   - `hostname`：显示主机名
   - `hostname -I`：显示所有 IP 地址
   ```bash
   ip addr show eth0                    # 显示特定网卡信息
   ip route add 192.168.1.0/24 via 192.168.1.1  # 添加静态路由
   ip link set eth0 up                  # 启用网卡
   ifconfig eth0 192.168.1.100         # 设置 IP 地址（旧方式）
   sudo hostnamectl set-hostname newname  # 修改主机名
   ```

4. **文件传输与远程登录**
   - `ssh user@host`：远程登录
   - `ssh -p 端口 user@host`：指定端口登录
   - `scp 本地 远端` / `scp user@host:远端 本地`：安全复制
   - `sftp user@host`：安全文件传输
   - `rsync -avz 源 目标`：增量同步
   - `rsync -avz --delete 源 目标`：同步并删除目标中源没有的文件

5. **下载工具**
   - `wget URL`：下载文件
   - `wget -c URL`：断点续传
   - `curl URL`：发送网络请求
   - `curl -O URL`：下载文件
   - `curl -H "Header: Value" URL`：添加请求头

6. **查看公网 IP**
   - `curl -4 ifconfig.co` 或 `curl ipinfo.io/ip`
   - `curl icanhazip.com`

------

## 六、磁盘与存储

1. **磁盘使用情况**
   - `df -h`：查看各分区总量与剩余空间
   - `df -i`：查看 inode 使用情况
   - `du -sh 目录`：查看目录总占用；`du -h --max-depth=1` 查看子目录分布
   - `du -h | sort -h`：按大小排序显示
   - `ncdu`：交互式磁盘使用分析（需要安装）

2. **块设备管理**
   - `lsblk`：列出块设备信息
   - `blkid`：显示块设备属性
   - `fdisk -l`：列出磁盘分区信息
   - `parted -l`：列出分区信息（支持 GPT）
   ```bash
   lsblk -f                             # 显示文件系统类型
   blkid /dev/sda1                      # 显示分区 UUID 和类型
   sudo fdisk -l /dev/sda               # 查看磁盘分区表
   sudo parted /dev/sda print           # 显示分区信息
   ```

3. **文件系统操作**
   - `mount 设备 挂载点`：挂载文件系统
   - `umount 设备/挂载点`：卸载文件系统
   - `mount -o remount,rw /`：重新挂载为读写模式
   - `fsck 设备`：文件系统检查和修复
   - `mkfs.ext4 设备`：创建 ext4 文件系统

4. **打包压缩**
   - `tar -czvf archive.tar.gz 目录/文件`：打包并 gzip 压缩
   - `tar -xzvf archive.tar.gz`：解压
   - `tar -tf archive.tar`：查看压缩包内容而不解压
   - `zip -r archive.zip 目录` / `unzip archive.zip`
   - `gzip 文件` / `gunzip 文件.gz`
   - `bzip2 文件` / `bunzip2 文件.bz2`
   - `xz 文件` / `unxz 文件.xz`

5. **数据复制与备份**
   - `dd if=源 of=目标 bs=块大小`：数据复制
   - `dd if=/dev/zero of=file bs=1M count=100`：创建100M空文件
   - `cp --sparse=always 文件 目标`：复制稀疏文件

------

## 七、查找与批处理

1. **查找文件**
   - `find . -name '*.log'`：当前目录及子目录查找
   - `find /path -type f -mtime -7`：查找 7 天内修改的文件
   - `find . -type f -name 'xiaohub.log.2024-06*' -delete`：批量删除
   - `find . -size +100M`：查找大于 100M 的文件
   - `find . -empty`：查找空文件或空目录
   - `find . -perm 777`：查找权限为 777 的文件

2. **快速定位**
   - `locate 文件名`：快速查找文件（基于数据库）
   - `updatedb`：更新 locate 数据库
   - `which 命令`：查找命令的完整路径
   - `whereis 命令`：查找二进制、源代码和手册页位置
   - `type 命令`：显示命令类型（别名、内置、外部命令）

3. **批量执行**
   - 与 `find` + `-exec`：
     ```bash
     find . -name '*.sh' -exec chmod +x {} \;
     find /var/log -name '*.log' -exec cp {} {}.bak \;
     find . -type f -exec md5sum {} \; > checksums.txt
     ```
   - `xargs`：
     ```bash
     find . -name '*.txt' | xargs grep '关键字'
     find . -name '*.tmp' | xargs rm -f
     ls *.jpg | xargs -I {} convert {} {}.png
     ```
   - `parallel`：并行执行命令（需要安装）
     ```bash
     find . -name '*.jpg' | parallel convert {} {.}.png
     cat urls.txt | parallel wget {}
     seq 1 10 | parallel -j4 'echo "Process {}"'
     ```

------

## 八、Shell 环境与脚本

1. **环境变量**
   - `export VAR=value`：临时设置；写入 `~/.bashrc` 或 `~/.profile` 实现持久
   - `echo $VAR`：显示变量值
   - `env`：显示所有环境变量
   - `set`：显示所有变量（包括局部变量）
   - `unset VAR`：删除变量
   - `source 文件` 或 `.`：重新加载配置

2. **Shell 配置**
   - `~/.bashrc`：bash shell 配置文件
   - `~/.bash_profile`：登录 shell 配置文件
   - `~/.bash_history`：命令历史记录

3. **常见提示**
   - `history`：查看历史命令；`!n` 重复第 n 条，`!!` 重复上一条
   - `history -c`：清除历史记录
   - `Ctrl+R`：反向搜索历史命令
   - Tab 自动补全
   - `alias ll='ls -l'`：自定义快捷命令，写入 `~/.bashrc` 生效
   - `unalias 别名`：删除别名

4. **目录操作**
   - `pushd 目录`：将目录压入堆栈并切换
   - `popd`：从堆栈弹出目录并切换
   - `dirs`：显示目录堆栈

5. **脚本规范**
   - 首行 `#!/bin/bash` 或 `#!/usr/bin/env bash`
   - 脚本执行前加执行权限：`chmod +x script.sh`
   - 参数获取：`$1,$2,…`；循环 `for arg in "$@"; do …; done`
   - `$0`：脚本名称
   - `$#`：参数个数
   - `$?`：上个命令的退出状态
   - `test` 或 `[ ]`：条件测试
   - `[[ ]]`：扩展的条件测试（支持正则）

------

## 九、系统管理

1. **服务与日志**
   - `systemctl status 服务名`：查看服务状态
   - `systemctl start/stop/restart 服务名`：启停服务
   - `systemctl enable/disable 服务名`：开机自启设置
   - `journalctl -u 服务名`：查看 systemd 日志
   - `journalctl -f`：实时查看系统日志

2. **定时任务**
   - `crontab -e`：编辑当前用户 crontab
   - `crontab -l`：列出当前用户的定时任务
   - 格式：`* * * * * command`（分 时 日 月 周）
   - `/etc/crontab`：系统级定时任务

3. **用户与组管理**
   - `useradd 用户名` / `usermod -aG group 用户名` / `userdel 用户名`
   - `passwd 用户名`：设置用户密码
   - `groups 用户名`：查看用户所属组
   - `id 用户名`：显示用户和组 ID
   - `su - 用户名`：切换用户
   - `sudo 命令`：以 root 权限执行命令

4. **系统监控**
   - `free -h`：查看内存使用情况
   - `uptime`：系统运行时间和负载
   - `dmesg`：查看内核消息
   - `lsof`：列出打开的文件
   - `lsof -i :端口`：查看端口占用情况
   - `vmstat`：虚拟内存统计
   - `iostat`：IO 统计
   - `sar`：系统活动报告（需要安装 sysstat）
   ```bash
   free -h                              # 显示人性化的内存使用信息
   uptime                               # 显示运行时间和负载
   dmesg | tail -20                     # 查看最近的内核消息
   lsof -i :80                          # 查看 80 端口占用
   lsof -p 1234                         # 查看进程 1234 打开的文件
   vmstat 2 5                           # 每 2 秒更新一次，共 5 次
   iostat -x 1                          # 每秒显示详细 IO 统计
   sar -u 1 5                           # CPU 使用率，每秒更新，共 5 次
   ```

------

## 十、软件包管理

1. **Debian/Ubuntu（APT）**
   - `apt update`：更新软件包列表
   - `apt upgrade`：升级已安装软件包
   - `apt install 软件包`：安装软件
   - `apt remove 软件包`：删除软件
   - `apt search 关键字`：搜索软件包
   - `apt show 软件包`：显示软件包信息
   - `apt autoremove`：删除不需要的依赖包

2. **RHEL/CentOS（YUM/DNF）**
   - `yum update`：更新软件包
   - `yum install 软件包`：安装软件
   - `yum remove 软件包`：删除软件
   - `yum search 关键字`：搜索软件包
   - `yum info 软件包`：显示软件包信息
   - `dnf`：新版本的 Fedora/RHEL 使用 dnf 替代 yum

3. **常用工具安装**
   - `apt install net-tools`：安装传统网络工具（ifconfig 等）
   - `apt install vim`：安装 vim 编辑器
   - `apt install htop`：安装 htop 进程监控工具
   - `apt install ncdu`：安装磁盘使用分析工具

------

## 十一、快捷键与技巧

1. **终端快捷键**
   - `Ctrl+A`：移到行首
   - `Ctrl+E`：移到行尾
   - `Ctrl+U`：删除光标前的内容
   - `Ctrl+K`：删除光标后的内容
   - `Ctrl+W`：删除光标前的单词
   - `Ctrl+L`：清屏（等同于 clear）
   - `Ctrl+D`：退出当前 shell

：引用上条命令的最后一个参数
   - `!*`：引用上条命令的所有参数
   - `command1 && command2`：前一个命令成功后才执行后一个
   - `command1 || command2`：前一个命令失败后才执行后一个
   - `command1; command2`：顺序执行，不管是否成功
   - `$(command)`：命令替换
   - `` `command` ``：命令替换（旧式）
   ```bash
   sudo !!                              # 以 root 权限重新执行上条命令
   cd !$                                # 切换到上条命令的最后一个参数
   echo !*                              # 显示上条命令的所有参数
   mkdir test && cd test                # 创建目录并进入
   ping -c1 google.com || echo "网络不通"  # 网络不通时提示
   echo "今天是 $(date +%Y-%m-%d)"      # 命令替换显示日期
   for file in *.txt; do echo $file; done  # 遍历文件
   ```

3. **通配符与正则**
   - `*`：匹配任意多个字符
   - `?`：匹配单个字符
   - `[abc]`：匹配中括号内任一字符
   - `[a-z]`：匹配范围内任一字符
   - `{a,b,c}`：匹配大括号内任一字符串
   
4. **重定向与管道**
   - `>`：输出重定向（覆盖）
   - `>>`：输出重定向（追加）
   - `2>`：错误输出重定向
   - `&>`：标准输出和错误都重定向
   - `|`：管道，将前一个命令的输出作为后一个命令的输入
   - `tee`：将输出同时写入文件和标准输出 phone.txt      # 正则匹配电话号码格式
   ps aux | grep nginx | grep -v grep            # 查找 nginx 进程（排除 grep 自身）
   awk -F: '{print $1,$7}' /etc/passwd           # 显示用户名和 shell
   df -h | awk 'NR>1{print $5,$6}'              # 显示磁盘使用率和挂载点
   sed -i 's/localhost/127.0.0.1/g' config.ini   # 直接替换文件内容
   sed -n '/start/,/end/p' log.txt               # 显示两个标记之间的行
   ```

2. **排序与去重**
   - `sort 文件`：排序；`sort -n` 数值排序；`-r` 逆序；`-k n` 指定第 n 列排序
   - `uniq 文件`：去除相邻重复；`uniq -c` 统计次数；常与 `sort` 管道配合：
     ```bash
     sort abc.txt | uniq -c
     ```
   - `comm 文件1 文件2`：比较两个已排序文件的异同

3. **统计与比较**
   - `wc -l 文件`：统计行数；`-m` 字符数；`-c` 字节数；`-L` 最长行长度；`-w` 单词数
   - `diff 文件1 文件2`：比较文件差异
   - `diff -u`：以统一格式显示差异
   - `cmp 文件1 文件2`：二进制比较文件

4. **字符转换**
   - `tr 'a-z' 'A-Z' < 文件`：小写转大写
   - `tr -d '0-9'`：删除所有数字
   - `tr -s ' '`：压缩连续空格为单个空格

------

## 三、权限与拥有者

1. **查看权限**
   - `ls -l` 第一列如 `-rwxr-xr--`：分别是文件类型、用户/组/其他用户的读(r)/写(w)/执行(x) 权限
   - `stat 文件`：查看文件详细状态信息

2. **修改权限**
   - `chmod u+rw 文件`：用户添加读写权限；也可用数字模式，如 `chmod 755 文件`
   - `chmod g-w 文件`：组移除写权限
   - `chmod o+x 文件`：其他用户添加执行权限
   - `chmod -R 755 目录`：递归修改目录及子目录权限

3. **修改拥有者/所属组**
   - `chown user:group 文件`：同时修改用户与组
   - `chown user 文件` 或 `chown :group 文件`
   - `chown -R user:group 目录`：递归修改目录权限

4. **特殊权限**
   - `chmod u+s 文件`：设置 SUID 权限
   - `chmod g+s 目录`：设置 SGID 权限
   - `chmod +t 目录`：设置粘滞位
   - `umask`：查看默认权限掩码
   - `umask 022`：设置默认权限掩码

5. **文件属性**
   - `lsattr 文件`：查看文件特殊属性
   - `chattr +i 文件`：设置不可修改属性
   - `chattr +a 文件`：设置只能追加属性

------

## 四、进程与作业管理

1. **查看进程**
   - `ps -ef`：列出所有进程；常与 `grep` 结合过滤
   - `ps aux`：显示详细进程信息
   - `pstree`：以树状图显示进程关系
   - `top` / `htop`：动态监控 CPU/内存/进程（按 q 退出）
   - `pgrep 进程名`：按名称查找进程 ID

2. **杀死进程**
   - `kill PID`：温和终止（发送 SIGTERM 信号）
   - `kill -9 PID`：强制终止（发送 SIGKILL 信号）
   - `kill -l`：列出所有信号
   - `pkill 进程名` / `killall 进程名`：按名杀死
   - `killall -u 用户名`：杀死指定用户的所有进程

3. **进程优先级**
   - `nice -n 10 命令`：以较低优先级运行命令
   - `renice +10 -p PID`：调整运行中进程的优先级

4. **后台与作业控制**
   - `command &`：后台运行
   - `jobs`：查看后台作业，`fg %1` 将第 1 个作业拉到前台，`bg %1` 让其后台运行
   - `nohup command &`：后台运行且忽略挂断信号（退出终端后继续运行）
   - `Ctrl+Z`：挂起当前进程
   - `Ctrl+C`：终止当前进程

------

## 五、网络与远程操作

1. **网络诊断**
   - `ping 主机`：连通性测试
   - `ping -c 4`：只发送 4 个数据包
   - `traceroute 主机`：路由追踪
   - `mtr 主机`：结合 ping 和 traceroute 功能
   - `netstat -anp`：查看端口、连接；常与 `grep` 结合
   - `ss -tulnp`：更现代的端口查看工具
   - `nmap 主机`：端口扫描（需要安装）

2. **DNS 查询**
   - `nslookup 域名`：查询 DNS 记录
   - `dig 域名`：详细 DNS 查询
   - `host 域名`：简单 DNS 查询

3. **网络配置**
   - `ifconfig`：查看网络接口（较旧）
   - `ip addr show`：查看 IP 地址（现代替代 ifconfig）
   - `ip route show`：查看路由表
   - `hostname`：显示主机名
   - `hostname -I`：显示所有 IP 地址

4. **文件传输与远程登录**
   - `ssh user@host`：远程登录
   - `ssh -p 端口 user@host`：指定端口登录
   - `scp 本地 远端` / `scp user@host:远端 本地`：安全复制
   - `sftp user@host`：安全文件传输
   - `rsync -avz 源 目标`：增量同步
   - `rsync -avz --delete 源 目标`：同步并删除目标中源没有的文件

5. **下载工具**
   - `wget URL`：下载文件
   - `wget -c URL`：断点续传
   - `curl URL`：发送网络请求
   - `curl -O URL`：下载文件
   - `curl -H "Header: Value" URL`：添加请求头

6. **查看公网 IP**
   - `curl -4 ifconfig.co` 或 `curl ipinfo.io/ip`
   - `curl icanhazip.com`

------

## 六、磁盘与存储

1. **磁盘使用情况**
   - `df -h`：查看各分区总量与剩余空间
   - `df -i`：查看 inode 使用情况
   - `du -sh 目录`：查看目录总占用；`du -h --max-depth=1` 查看子目录分布
   - `du -h | sort -h`：按大小排序显示
   - `ncdu`：交互式磁盘使用分析（需要安装）

2. **块设备管理**
   - `lsblk`：列出块设备信息
   - `blkid`：显示块设备属性
   - `fdisk -l`：列出磁盘分区信息
   - `parted -l`：列出分区信息（支持 GPT）

3. **文件系统操作**
   - `mount 设备 挂载点`：挂载文件系统
   - `umount 设备/挂载点`：卸载文件系统
   - `mount -o remount,rw /`：重新挂载为读写模式
   - `fsck 设备`：文件系统检查和修复
   - `mkfs.ext4 设备`：创建 ext4 文件系统

4. **打包压缩**
   - `tar -czvf archive.tar.gz 目录/文件`：打包并 gzip 压缩
   - `tar -xzvf archive.tar.gz`：解压
   - `tar -tf archive.tar`：查看压缩包内容而不解压
   - `zip -r archive.zip 目录` / `unzip archive.zip`
   - `gzip 文件` / `gunzip 文件.gz`
   - `bzip2 文件` / `bunzip2 文件.bz2`
   - `xz 文件` / `unxz 文件.xz`

5. **数据复制与备份**
   - `dd if=源 of=目标 bs=块大小`：数据复制
   - `dd if=/dev/zero of=file bs=1M count=100`：创建100M空文件
   - `cp --sparse=always 文件 目标`：复制稀疏文件

------

## 七、查找与批处理

1. **查找文件**
   - `find . -name '*.log'`：当前目录及子目录查找
   - `find /path -type f -mtime -7`：查找 7 天内修改的文件
   - `find . -type f -name 'xiaohub.log.2024-06*' -delete`：批量删除
   - `find . -size +100M`：查找大于 100M 的文件
   - `find . -empty`：查找空文件或空目录
   - `find . -perm 777`：查找权限为 777 的文件

2. **快速定位**
   - `locate 文件名`：快速查找文件（基于数据库）
   - `updatedb`：更新 locate 数据库
   - `which 命令`：查找命令的完整路径
   - `whereis 命令`：查找二进制、源代码和手册页位置
   - `type 命令`：显示命令类型（别名、内置、外部命令）

3. **批量执行**
   - 与 `find` + `-exec`：
     ```bash
     find . -name '*.sh' -exec chmod +x {} \;
     ```
   - `xargs`：
     ```bash
     find . -name '*.txt' | xargs grep '关键字'
     ```
   - `parallel`：并行执行命令（需要安装）
     ```bash
     find . -name '*.jpg' | parallel convert {} {.}.png
     ```

------

## 八、Shell 环境与脚本

1. **环境变量**
   - `export VAR=value`：临时设置；写入 `~/.bashrc` 或 `~/.profile` 实现持久
   - `echo $VAR`：显示变量值
   - `env`：显示所有环境变量
   - `set`：显示所有变量（包括局部变量）
   - `unset VAR`：删除变量
   - `source 文件` 或 `.`：重新加载配置

2. **Shell 配置**
   - `~/.bashrc`：bash shell 配置文件
   - `~/.bash_profile`：登录 shell 配置文件
   - `~/.bash_history`：命令历史记录

3. **常见提示**
   - `history`：查看历史命令；`!n` 重复第 n 条，`!!` 重复上一条
   - `history -c`：清除历史记录
   - `Ctrl+R`：反向搜索历史命令
   - Tab 自动补全
   - `alias ll='ls -l'`：自定义快捷命令，写入 `~/.bashrc` 生效
   - `unalias 别名`：删除别名

4. **目录操作**
   - `pushd 目录`：将目录压入堆栈并切换
   - `popd`：从堆栈弹出目录并切换
   - `dirs`：显示目录堆栈

5. **脚本规范**
   - 首行 `#!/bin/bash` 或 `#!/usr/bin/env bash`
   - 脚本执行前加执行权限：`chmod +x script.sh`
   - 参数获取：`$1,$2,…`；循环 `for arg in "$@"; do …; done`
   - `$0`：脚本名称
   - `$#`：参数个数
   - `$?`：上个命令的退出状态
   - `test` 或 `[ ]`：条件测试
   - `[[ ]]`：扩展的条件测试（支持正则）

------

## 九、系统管理

1. **服务与日志**
   - `systemctl status 服务名`：查看服务状态
   - `systemctl start/stop/restart 服务名`：启停服务
   - `systemctl enable/disable 服务名`：开机自启设置
   - `journalctl -u 服务名`：查看 systemd 日志
   - `journalctl -f`：实时查看系统日志

2. **定时任务**
   - `crontab -e`：编辑当前用户 crontab
   - `crontab -l`：列出当前用户的定时任务
   - 格式：`* * * * * command`（分 时 日 月 周）
   - `/etc/crontab`：系统级定时任务

3. **用户与组管理**
   - `useradd 用户名` / `usermod -aG group 用户名` / `userdel 用户名`
   - `passwd 用户名`：设置用户密码
   - `groups 用户名`：查看用户所属组
   - `id 用户名`：显示用户和组 ID
   - `su - 用户名`：切换用户
   - `sudo 命令`：以 root 权限执行命令

4. **系统监控**
   - `free -h`：查看内存使用情况
   - `uptime`：系统运行时间和负载
   - `dmesg`：查看内核消息
   - `lsof`：列出打开的文件
   - `lsof -i :端口`：查看端口占用情况
   - `vmstat`：虚拟内存统计
   - `iostat`：IO 统计
   - `sar`：系统活动报告（需要安装 sysstat）

------

## 十、软件包管理

1. **Debian/Ubuntu（APT）**
   - `apt update`：更新软件包列表
   - `apt upgrade`：升级已安装软件包
   - `apt install 软件包`：安装软件
   - `apt remove 软件包`：删除软件
   - `apt search 关键字`：搜索软件包
   - `apt show 软件包`：显示软件包信息
   - `apt autoremove`：删除不需要的依赖包

2. **RHEL/CentOS（YUM/DNF）**
   - `yum update`：更新软件包
   - `yum install 软件包`：安装软件
   - `yum remove 软件包`：删除软件
   - `yum search 关键字`：搜索软件包
   - `yum info 软件包`：显示软件包信息
   - `dnf`：新版本的 Fedora/RHEL 使用 dnf 替代 yum

3. **常用工具安装**
   - `apt install net-tools`：安装传统网络工具（ifconfig 等）
   - `apt install vim`：安装 vim 编辑器
   - `apt install htop`：安装 htop 进程监控工具
   - `apt install ncdu`：安装磁盘使用分析工具

------

## 十一、快捷键与技巧

1. **终端快捷键**
   - `Ctrl+A`：移到行首
   - `Ctrl+E`：移到行尾
   - `Ctrl+U`：删除光标前的内容
   - `Ctrl+K`：删除光标后的内容
   - `Ctrl+W`：删除光标前的单词
   - `Ctrl+L`：清屏（等同于 clear）
   - `Ctrl+D`：退出当前 shell

2. **命令行技巧**
   - `!!`：重复执行上一条命令
   - `!$`：引用上条命令的最后一个参数
   - `!*`：引用上条命令的所有参数
   - `command1 && command2`：前一个命令成功后才执行后一个
   - `command1 || command2`：前一个命令失败后才执行后一个
   - `command1; command2`：顺序执行，不管是否成功
   - `$(command)`：命令替换
   - `` `command` ``：命令替换（旧式）

3. **通配符与正则**
   - `*`：匹配任意多个字符
   - `?`：匹配单个字符
   - `[abc]`：匹配中括号内任一字符
   - `[a-z]`：匹配范围内任一字符
   - `{a,b,c}`：匹配大括号内任一字符串
   
4. **重定向与管道**
   - `>`：输出重定向（覆盖）
   - `>>`：输出重定向（追加）
   - `2>`：错误输出重定向
   - `&>`：标准输出和错误都重定向
   - `|`：管道，将前一个命令的输出作为后一个命令的输入
   - `tee`：将输出同时写入文件和标准输出