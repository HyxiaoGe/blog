---
title: Markdown代码样式测试文件
date: 2025-04-26 12:00:00
tags:
  - Markdown
  - 测试
categories: 测试
---

# Markdown代码样式测试文件

这是一个用于测试Markdown代码格式和样式的文件，包含了多种代码块和格式化内容。

## 目录

- [代码块测试](#代码块测试)
- [表格测试](#表格测试)
- [数学公式测试](#数学公式测试)
- [列表测试](#列表测试)
- [引用测试](#引用测试)

## 代码块测试

### 普通代码块

这是一个没有指定语言的代码块：

```
function normalCode() {
  console.log("这是一个普通代码块");
}
```

### Python代码块

```python
def hello_world():
    print("Hello, World!")
    
# 一个简单的类定义
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def greet(self):
        return f"你好，我是{self.name}，今年{self.age}岁"
        
# 使用类
p = Person("张三", 25)
print(p.greet())
```

### JavaScript代码块

```javascript
// 箭头函数
const add = (a, b) => a + b;

// 使用模板字符串
function greet(name) {
  return `Hello, ${name}!`;
}

// Promise示例
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: "这是一些数据" });
    }, 1000);
  });
}

// 异步函数
async function getData() {
  try {
    const result = await fetchData();
    console.log(result.data);
  } catch (error) {
    console.error("发生错误:", error);
  }
}
```

### Bash/Shell代码块

```bash
#!/bin/bash
# 这是一个简单的shell脚本

echo "当前目录是:"
pwd

# 循环示例
for i in {1..5}; do
  echo "第 $i 次迭代"
done

# 条件判断
if [ -f "config.yml" ]; then
  echo "配置文件存在"
else
  echo "配置文件不存在"
fi
```

### Java代码块

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // 创建一个对象
        Person person = new Person("李四", 30);
        System.out.println(person.greet());
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String greet() {
        return "你好，我是" + name + "，今年" + age + "岁";
    }
}
```

### 包含管道符的代码块（测试特殊字符）

下面的代码块包含了管道符 `|`，这可能会被误解为表格分隔符：

```text
# 这行包含管道符
echo "A" | grep "A"

# 数据示例
名称 | 年龄 | 职业
小明 | 25 | 工程师
小红 | 24 | 设计师
```

## 表格测试

这是一个标准的 Markdown 表格：

| 名称 | 年龄 | 职业 |
| ---- | ---- | ---- |
| 小明 | 25   | 工程师 |
| 小红 | 24   | 设计师 |
| 小李 | 26   | 医生 |

左对齐、居中和右对齐的混合表格：

| 名称 (左对齐) | 年龄 (居中) | 薪资 (右对齐) |
| :---- | :----: | ----: |
| 张三 | 25 | ¥10,000 |
| 李四 | 26 | ¥12,000 |
| 王五 | 24 | ¥9,500 |

## 数学公式测试

这里是一些数学公式测试（使用 LaTeX 语法）：

行内公式: $E = mc^2$

独立公式:

$$
\frac{d}{dx}e^x = e^x
$$

复杂公式:

$$
\begin{align}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{align}
$$

余弦相似度计算公式:

$$
similarity(A,B) = \frac{A \cdot B}{||A|| \cdot ||B||}
$$

欧氏距离计算公式:

$$
distance(A,B) = \sqrt{\sum_{i=1}^{n}(A_i-B_i)^2}
$$

## 列表测试

### 无序列表

- 第一项
- 第二项
- 第三项
  - 子项 1
  - 子项 2
    - 子子项 1
    - 子子项 2

### 有序列表

1. 第一步
2. 第二步
3. 第三步
   1. 子步骤 1
   2. 子步骤 2
      1. 详细步骤 a
      2. 详细步骤 b

### 任务列表

- [x] 已完成任务
- [ ] 未完成任务
- [ ] 另一个未完成任务
  - [x] 已完成子任务
  - [ ] 未完成子任务

## 引用测试

> 这是一个简单的引用

多层嵌套引用:

> 第一层引用
>
> > 第二层引用
> >
> > > 第三层引用
> > >
> > > 继续第三层

带有其他元素的引用:

> #### 引用中的标题
>
> - 引用中的列表项
> - 另一个列表项
>
> ```python
> # 引用中的代码块
> print("Hello from a quote!")
> ```

## 图片和链接测试

### 链接

[Markdown语法指南](https://www.markdownguide.org/)

[Hexo官方网站](https://hexo.io/)

### 图片

![示例图片](https://via.placeholder.com/600x400 "这是一个占位图片")

## 高级格式测试

### 高亮文本

使用 `<mark>` 标签可以 <mark>高亮显示文本</mark>。

### 删除线和下划线

~~这是删除线文本~~ 和 <u>这是下划线文本</u>。

### 脚注

这是一个带有脚注的文本[^1]。

[^1]: 这是脚注的内容。

## 总结

这个Markdown文档包含了多种常见的代码块和格式化元素，可以用来测试您的Hexo主题是否正确渲染这些元素。如果所有内容都能正确显示，那么您的配置应该是正确的。

如果出现问题，特别注意:
1. 代码块中的语言标记是否正确
2. 包含特殊字符的代码块是否正确渲染
3. 数学公式是否正确显示
4. 表格是否对齐且正确显示
