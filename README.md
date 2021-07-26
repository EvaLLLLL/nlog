## NLOG

### 创建容器

```bash
rm -rf blog-data
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

### 创建数据库

```bash
docker exec -it xxx bash

CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

### 启动项目

```bash
yarn dev
```

### 升级数据表

```bash
yarn m:run
node dist/seed.js
```

### 部署项目

```bash
yarn build
```
