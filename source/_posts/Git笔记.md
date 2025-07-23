---
title: Git 命令完整笔记
date: 2024-08-23 20:33:16
tags:
  - Git
categories: 笔记
---


## 一、Git 配置

1. **配置用户信息**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   
   # 查看配置
   git config --list
   git config user.name
   ```

2. **配置别名**
   ```bash
   git config --global alias.co checkout
   git config --global alias.br branch
   git config --global alias.ci commit
   git config --global alias.st status
   git config --global alias.lg "log --oneline --graph --decorate"
   ```

3. **配置编辑器和工具**
   ```bash
   git config --global core.editor "vim"
   git config --global merge.tool vimdiff
   git config --global diff.tool vimdiff
   ```

## 二、基础操作

1. **初始化仓库**
   ```bash
   git init                    # 在当前目录初始化
   git init my-project        # 创建目录并初始化
   ```

2. **克隆仓库**
   ```bash
   git clone https://github.com/user/repo.git
   git clone -b develop https://github.com/user/repo.git    # 克隆特定分支
   git clone --depth 1 https://github.com/user/repo.git     # 浅克隆，只克隆最新提交
   ```

3. **查看状态**
   ```bash
   git status                  # 查看工作区状态
   git status -s              # 简短输出
   ```

4. **添加文件到暂存区**
   ```bash
   git add file.txt           # 添加特定文件
   git add .                  # 添加所有更改
   git add *.js              # 添加所有JS文件
   git add -p                 # 交互式添加文件块
   git add -u                 # 添加已跟踪文件的更改
   ```

5. **提交更改**
   ```bash
   git commit -m "Commit message"              # 提交带消息
   git commit -am "Add and commit message"     # 添加并提交所有更改
   git commit --amend                          # 修改最后一次提交
   git commit --amend --no-edit                # 修改但不更改提交信息
   ```

## 三、远程仓库操作

1. **设置远程仓库的URL**
   ```bash
   git remote set-url origin https://github.com/your-username/xiaohub.git
   git remote add upstream https://github.com/original/repo.git    # 添加上游仓库
   git remote -v                                                   # 查看远程仓库
   git remote show origin                                          # 查看远程仓库详情
   git remote rename origin old-origin                             # 重命名远程仓库
   git remote remove old-origin                                    # 删除远程仓库
   ```

2. **拉取远程更改**
   ```bash
   git fetch origin           # 从远程获取最新，但不合并
   git pull origin master     # 拉取并合并
   git pull --rebase         # 拉取并变基
   ```

3. **推送更改到GitHub**
   ```bash
   git push origin master                 # 推送到远程master分支
   git push -u origin feature-branch      # 推送并设置上游
   git push origin --tags                 # 推送所有标签
   git push origin v1.0.0                 # 推送特定标签
   ```

4. **强制推送到远程仓库**
   ```bash
   git push origin --force --all          # 强制推送所有分支
   git push origin --force master         # 强制推送特定分支
   git push --force-with-lease           # 更安全的强制推送
   ```

## 四、分支管理

1. **创建和切换分支**
   ```bash
   git branch                    # 查看本地分支
   git branch -a                 # 查看所有分支（包括远程）
   git branch feature-login      # 创建新分支
   git checkout feature-login    # 切换分支
   git checkout -b feature-new   # 创建并切换分支
   git switch -c feature-new     # 新版本创建并切换
   ```

2. **合并分支**
   ```bash
   git merge feature-branch      # 合并分支
   git merge --no-ff feature     # 禁用快进合并
   git merge --squash feature    # 压缩合并
   ```

3. **变基操作**
   ```bash
   git rebase master            # 变基到master
   git rebase -i HEAD~3         # 交互式变基最近3个提交
   git rebase --continue        # 解决冲突后继续变基
   git rebase --abort           # 放弃变基
   ```

4. **删除分支**
   ```bash
   git branch -d feature-branch          # 删除已合并分支
   git branch -D feature-branch          # 强制删除分支
   git push origin --delete feature      # 删除远程分支
   ```

## 五、文件管理

1. **从Git仓库中删除文件（可以使用 `-f`（force）选项来强制移除这些文件的跟踪）**
   ```bash
   git rm --cached <file>                # 从索引中删除，保留工作区文件
   git rm -r --cached <directory>        # 递归删除目录
   git rm file.txt                       # 删除文件（同时从工作区删除）
   git rm --cached -r node_modules       # 移除node_modules的跟踪
   ```

2. **移动或重命名文件**
   ```bash
   git mv oldname.txt newname.txt        # 重命名文件
   git mv file.txt directory/            # 移动文件
   ```

3. **.gitignore文件**
   ```bash
   # 示例.gitignore文件内容
   *.log
   node_modules/
   .env
   .DS_Store
   
   # 清除已跟踪但现在要忽略的文件
   git rm -r --cached .
   git add .
   git commit -m "Update .gitignore"
   ```

## 六、提交历史管理

1. **回滚到之前的提交**
   - **使用 `git reset --hard HEAD^`**: 这个命令将撤销最后一次提交，并且丢弃所有的更改。请注意，这将彻底删除最后一次提交的所有更改，所以请确保你没有需要保留的其他更改。
     ```bash
     git reset --hard HEAD^
     git reset --hard HEAD~2         # 回退2个提交
     git reset --hard commit-hash    # 回退到特定提交
     ```
   
   - **使用 `git reset --soft HEAD^`**: 如果你想保留更改但撤销提交，可以使用这个命令。这将把所有的更改放回暂存区，你可以重新编辑并再次提交。
     ```bash
     git reset --soft HEAD^
     git reset --soft HEAD~1
     git reset --mixed HEAD^         # 默认选项，保留工作区更改，重置暂存区
     ```

2. **撤销更改**
   ```bash
   git checkout -- file.txt        # 撤销工作区更改
   git restore file.txt            # 新版本撤销更改
   git clean -fd                   # 删除未跟踪的文件和目录
   git clean -n                    # 查看将要删除的文件
   ```

3. **回滚已推送的提交**
   ```bash
   git revert HEAD                 # 创建一个新提交来撤销最后的提交
   git revert commit-hash          # 撤销特定提交
   git revert -n HEAD~3..HEAD      # 撤销多个提交但不自动提交
   ```

## 七、查看日志和差异

1. **检查Git历史记录**
   ```bash
   git log --all -- <file>              # 查看文件的所有历史
   git log --graph --oneline --all      # 图形化显示所有分支
   git log --stat                       # 显示文件修改统计
   git log --patch                      # 显示具体修改内容
   git log --author="John"              # 按作者查找提交
   git log --grep="fix"                 # 按提交信息查找
   git log --since="2 weeks ago"        # 查看最近两周的提交
   ```

2. **查看最近的提交**
   ```bash
   git log -n 10                        # 查看最近10次提交
   git log --oneline -5                 # 简短格式显示最近5次提交
   git log --pretty=format:"%h - %an, %ar : %s"   # 自定义格式
   ```

3. **查看差异**
   ```bash
   git diff                             # 查看工作区和暂存区差异
   git diff --staged                    # 查看暂存区和最新提交差异
   git diff HEAD                        # 查看工作区和最新提交差异
   git diff branch1..branch2            # 比较两个分支
   git diff commit1 commit2             # 比较两个提交
   git diff --name-only                 # 只显示更改的文件名
   ```

## 八、标签管理

1. **创建标签**
   ```bash
   git tag v1.0.0                       # 创建轻量标签
   git tag -a v1.0.0 -m "Version 1.0"   # 创建带注释的标签
   git tag v1.0.0 commit-hash           # 给特定提交打标签
   ```

2. **查看和管理标签**
   ```bash
   git tag                              # 列出所有标签
   git tag -l "v1.*"                    # 列出匹配的标签
   git show v1.0.0                      # 查看标签信息
   git tag -d v1.0.0                    # 删除本地标签
   git push origin --delete v1.0.0      # 删除远程标签
   ```

## 九、储藏和清理

1. **储藏工作区**
   ```bash
   git stash                            # 储藏当前更改
   git stash save "work in progress"    # 带描述的储藏
   git stash list                       # 列出所有储藏
   git stash pop                        # 应用并删除最新储藏
   git stash apply stash@{2}            # 应用特定储藏
   git stash drop stash@{1}             # 删除特定储藏
   git stash clear                      # 清空所有储藏
   ```

2. **清理工作区**
   ```bash
   git clean -n                         # 查看将被清理的文件
   git clean -f                         # 清理未跟踪文件
   git clean -fd                        # 清理文件和目录
   git clean -xfd                       # 清理包括.gitignore忽略的文件
   ```

## 十、查找和调试

1. **定位Bug引入**
   ```bash
   git bisect start                     # 开始二分查找
   git bisect bad                       # 标记当前提交为有bug
   git bisect good commit-hash          # 标记某个提交为正常
   git bisect reset                     # 结束查找
   ```

2. **查看文件每行最后修改**
   ```bash
   git blame file.txt                   # 查看文件每行的最后修改信息
   git blame -L 10,20 file.txt         # 查看特定行范围
   ```

## 十一、Git工作流

1. **特性分支工作流**
   ```bash
   # 创建特性分支
   git checkout -b feature/login
   
   # 开发完成后
   git add .
   git commit -m "Add login feature"
   
   # 更新主分支
   git checkout master
   git pull origin master
   
   # 合并特性分支
   git merge --no-ff feature/login
   git push origin master
   
   # 删除特性分支
   git branch -d feature/login
   ```

2. **GitFlow工作流**
   ```bash
   # 创建开发分支
   git checkout -b develop master
   
   # 创建功能分支
   git checkout -b feature/login develop
   
   # 完成功能分支
   git checkout develop
   git merge --no-ff feature/login
   git branch -d feature/login
   
   # 创建发布分支
   git checkout -b release/1.0.0 develop
   
   # 完成发布
   git checkout master
   git merge --no-ff release/1.0.0
   git tag -a v1.0.0
   
   git checkout develop
   git merge --no-ff release/1.0.0
   git branch -d release/1.0.0
   ```

## 十二、高级操作

1. **子模块管理**
   ```bash
   git submodule add https://github.com/user/repo.git path/to/submodule
   git submodule init
   git submodule update
   git submodule update --remote
   git submodule foreach git pull origin master
   ```

2. **获取指定文件版本**
   ```bash
   git show HEAD:file.txt               # 查看最新版本文件
   git show branch:file.txt             # 查看特定分支文件
   git checkout commit-hash -- file.txt  # 恢复特定版本文件
   ```

3. **导出归档**
   ```bash
   git archive --format=zip HEAD > archive.zip
   git archive --format=tar.gz --prefix=project/ v1.0.0 > project.tar.gz
   ```

## 十三、常见问题解决

1. **解决合并冲突**
   ```bash
   # 出现冲突后
   git status                  # 查看冲突文件
   # 编辑冲突文件
   git add resolved-file.txt
   git commit -m "Resolve merge conflict"
   ```

2. **修改历史提交**
   ```bash
   # 修改最近N个提交
   git rebase -i HEAD~3
   # 在编辑器中将pick改为edit, reword, squash等
   ```

3. **找回丢失的提交**
   ```bash
   git reflog                   # 查看所有操作记录
   git checkout commit-hash     # 恢复到特定提交
   ```

## 十四、Git别名和快捷命令

1. **常用别名设置**
   ```bash
   git config --global alias.co checkout
   git config --global alias.br branch
   git config --global alias.ci commit
   git config --global alias.st status
   git config --global alias.unstage 'reset HEAD --'
   git config --global alias.last 'log -1 HEAD'
   git config --global alias.visual '!gitk'
   git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
   ```

## 十五、Git最佳实践

1. **提交信息规范**
   ```bash
   # 好的提交信息
   feat: 添加用户登录功能
   fix: 修复导航栏在移动端显示异常
   docs: 更新README文件
   style: 格式化代码
   refactor: 重构用户模块
   test: 添加用户登录单元测试
   chore: 更新依赖版本
   ```

2. **保持提交原子性**
   ```bash
   # 每个提交只做一件事
   git add file1.js
   git commit -m "Add user validation"
   
   git add file2.js
   git commit -m "Add password encryption"
   ```

3. **定期推送和拉取**
   ```bash
   # 每天工作开始
   git pull origin develop
   
   # 完成功能后
   git push origin feature-branch
   ```