# 小测一下

这是一个基于 Vite + React 的纯前端生活状态测评 MVP。

## 本地运行

```powershell
npm install
npm run dev
```

## 构建

```powershell
npm run build
```

## 部署到 Vercel

可以直接部署，不需要购买服务器。

### Dashboard 方式

1. 将项目推送到 GitHub、GitLab 或 Bitbucket。
2. 在 Vercel 新建项目并导入这个仓库。
3. Framework Preset 选择 `Vite`。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。
6. 点击 Deploy。

项目已经包含 `vercel.json`，正常情况下 Vercel 会自动识别这些配置。

### CLI 方式

登录 Vercel 后，在项目根目录运行：

```powershell
npx vercel
```

需要发布正式环境时：

```powershell
npx vercel --prod
```
