# Front-End
BuaaSummer Front-End part
由于浏览器同源策略限制了不同目录下cookie的读取，所以暂时将所有展示使用的功能页面统一放在conference目录下

项目结构：
-conference:会议相关页面
|----conference-main.html:会议展示页面
|----paper.docx:用于测试下载的论文模板
|----other.zip:用于测试下载的其他参考资料
|----createmeetings.html:创建会议的页面
|----search.html:搜索会议的页面
|----leftnav.txt:会议展示页面左侧导航栏的html结构
|----topnav.txt:顶部导航栏的html结构
|----maincontent.txt:会议展示页面主要内容的html结构
-institution:机构相关页面
|----institution-register.html:机构注册页面
-libs:开发需要的外部文件

项目运行说明：因为conference目录下页面使用了jquery.load()方法，所以需要在Front_End目录下启动服务器，
再输入对应的url才能正常访问conference页面，直接打开页面只能看到一部分页面。
