# hs-test-cli

# 这是一个测试 cli 工具

用以快速生成 react + express + ssr 项目

---

# 安装

```
# npm
$ npm install -g hs-test-cli

# or yarn
$ yarn global add hs-test-cli
```

# 使用

```
$ hs create <dirname>

# dev
# 开发环境需要 nodemon 服务执行
$ npm install -g nodemon
$ npm run dev

# prod
$ npm run build
$ npm run server
```

# TODO

- [ ] 第三方库可选，如 react-router、redux 等，目前是没有提供可选择项，后续应该采用 ejs 模板替换完成
- [ ] 开发体验问题优化，如：端口号变更、监听模式
- [ ] 按需加载，路由分割
- [ ] 开发环境下，服务器端实现热更新，目前是只有前端是使用热更新
- [ ] ssr 与 csr 通过命令切换，两个模式的开发都可以实现
- [ ] 前端代码的优化
- [ ] 接入国际化 i8n
- [ ] ... ...
