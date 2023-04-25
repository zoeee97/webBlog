---
date: 2023-04-24
category:
  - sundry
tag:
  - 杂项
---
# Js（V8/Node）处理输入输出流+在vscode调试js编程题
## 前言
昨晚第一次写带编程题的笔试，之前用c++刷题的时候也知道面试是acm模式，所以也有练；但后来用js刷题，由于刷牛客和力扣这两边都是核心代码模式，就以为js没有acm模式（什么逻辑啊——）。而且昨晚笔试只支持js，所以总之就是大惨败，只写得出核心代码模式的题目。
[牛客OJ在线编程常见输入输出练习场](https://ac.nowcoder.com/acm/contest/5657#question)
这个链接可以专门去练习一下输入输出的处理。

## V8
用readline方法，接收的输入数据一律为字符串，要自己处理成相应的数据类型。
注意先要下载readline-sync依赖。
### 处理多行输入
#### 单行输出
```js
//前面四行都是一样的
//牛客网：readline
//赛码：read_line
var print = console.log;
var __readline = require('readline-sync');
__readline.setDefaultOptions({prompt: ''});
var readline = __readline.prompt;

let line = '';
//readline()方法接收输入，每次读一行，返回的是字符串
while (line = readline()) {
    var lines = line.split(' ');
    var a = parseInt(lines[0]);
    var b = parseInt(lines[1]);
    //输出结果
    console.log(a + b);
    //用print输出结果也可以
    print(a+b)
}
```
#### 多行输出
用数组来存放。
### 处理单行输入
用一次readline()即可。
## Node
在node环境下输入，是利用了process（进程）对象，process是全局对象，而且process有两个属性可以获取到输入输出流。

1.process.stdout属性返回一个对象，表示标准输出。

2.process.stdin返回一个对象，表示标准输入。

```js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function (line) {
    const tokens = line.split(' ');
    console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});
```
## 本地IDE调试JS编程题
首先用vscode打开一个空文件夹，在里面创建一个js后缀的文件用于写编程题，选择顶部的运行-添加配置，选择Nodejs，然后它会自动创建好launch.json。之后就可以选中左侧的小蜘蛛图标【运行和调试】去打断点调试了，或者直接在终端输入node xxx.js即可运行。