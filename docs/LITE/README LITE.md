# This script does not require a token or ID or join-to-use
# 本版本是Unipus网课助手的轻量版，仅支持普通练习和刷时长，不需要绑定token或者id，完整版在Github上，支持单元测试
# 如果有可以做班级测试的账号，可以提供给作者，以开发班级测试相关功能，作者手头并没有账号

<h1 align="center">Unipus网课助手</h1>

<p align="center">显示U校园题目答案；自动答题；不支持单元测试、班级测试；刷时长；开放自定义设置</p>

<p align="center">
<a href="https://github.com/SSmJaE/UnipusHelper">Github</a> · 
<a href="https://chrome.google.com/webstore/search/unipus%E7%BD%91%E8%AF%BE%E5%8A%A9%E6%89%8B">Chrome扩展</a> · 
<a href="docs/DEVELOPMENT.md">参与开发</a> · 
<a href="docs/CHANGELOG.md">更新日志</a> · 
<a href="https://github.com/SSmJaE/UnipusHelper/issues">问题反馈</a>
<!-- 
<a href="https://github.com/SSmJaE/WELearnHelper/issues">功能请求</a> · -->
</p>

## 友情链接
- <a href="https://jq.qq.com/?_wv=1027&amp;k=Hh7gvvDz" rel="nofollow">大学生优惠购物,每天都能领优惠券还能获得返利!!!买前看一看,一年省下一部手机钱.</a>【广告】

## 声明
- 本项目基于GPL-3.0，完全开源，免费，仅供技术学习和交流，开发者团队并未授权任何组织、机构以及个人将其用于商业或者盈利性质的活动。也从未使用本项目进行任何盈利性活动。未来也不会将其用于开展营利性业务。个人或者组织，机构如果使用本项目产生的各类纠纷，法律问题，均由其本人承担。
- 如果您开始使用本项目，即视为同意项目免责声明中的一切条款，条款更新不再另行通知。

## 安装
- 安装最新版本的Chrome
- 油猴
  - 安装最新版本的Tamper Monkey
  - 安装最新版本的完整版脚本(支持单元测试)
    - 可以在Github右侧Release下载UnipusHelper[版本号].user.js文件
    - 油猴理应自动弹出
    - 如果油猴未弹出，在油猴中新建脚本，并复制粘贴保存
  - 安装最新版本的轻量版脚本(无需绑定)(不支持单元测试)
    - 通过[GreasyFork](https://greasyfork.org/zh-CN/scripts/405123)安装
- Chrome扩展
  - 直接在[Chrome网上应用店](https://chrome.google.com/webstore/search/unipus%E7%BD%91%E8%AF%BE%E5%8A%A9%E6%89%8B)安装
  - 在Release中下载UnipusHelper[版本号].crx.zip压缩包，添加至chrome即可

## 使用
- 点击***左上角齿轮***进行功能设定
- 练习
  - 进入练习页面，如果是支持的课程，会自动显示答案
  - 自动答题
    - 只支持<b>部分课程</b>的部分题型
    - 默认关闭
- 时长
  - 集成U校园时长专门(也可以说U校园时长专门是这一模块的独立版本)
  - 默认关闭

## 辅助功能
- 点击悬浮窗中的答案会<b>自动复制</b>到粘贴板
- 点击折叠按钮折叠悬浮窗
- 双击"Unipus Helper"展开悬浮窗

## 常见问题
- 为什么脚本没有反应？
  - 用的是最新版的Chrome浏览器吗？
  - 用的是最新版的tamper monkey吗？
  - 重启浏览器试试
  - 重装脚本试试
  - 是否在油猴中开启了脚本？
- 悬浮窗一直跟随鼠标怎么办？
  - 可以按Esc键强制退出跟随状态

## 其它
- 用爱发电，佛系更新
- 感谢李恒道, 王一之, [DanDan](https://github.com/Dandanla), [askar882](https://greasyfork.org/zh-CN/users/291023-askar882), U++原作者
- 本项目基于Typescript + Vue, 很欢迎感兴趣的同学一起来[开发](docs/DEVELOPMENT.md)

