# 使用官方 Node.js 镜像
FROM node:23 AS build

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制整个项目
COPY . .

# 安装所有工作区的依赖
RUN pnpm install

# 进入文件目录
WORKDIR /app/apps/video-hls

# 构建 Nuxt 项目
RUN pnpm build

# 创建生产镜像
FROM node:23 AS production

# 设置工作目录
WORKDIR /app

# 复制构建后的文件
COPY --from=build /app/apps/video-hls/.output ./

# 启动应用
CMD ["node", "server/index.mjs"]
