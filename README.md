# jianghujs-org


## 需求

- 企业组织
- 组织树
- 人 <==多对多==> 组织
- 组织 ===> 多个下属组织
> 备注: 
>
> 组织===部门
> 树节点最多：10层

## 数据库表

- member: 人/职员/成员 表
- org: 组织表
- org_tree: 组织树表 ====》 暂时没有必要
- org_member_role: 组织成员表

> 备注: 
>
>  - orgId: 路径法生成, E.g: 01-04-03-03
>  - roleId: 负责人、成员


## 页面

- memberManagement: 职员crud
- orgManagement: 组织crud & 组织成员crud & 组织下属组织成员展示


## 配置

1. npm install
2. 复制 `config.local.example.js` 为 `config.local.js`
3. 并且修改数据库配置为自己的数据库, 例如：
   ```
   host: '127.0.0.1',
   port: 3306,
   user: 'root',
   password: '123456',
   database: 'jianghujs_org'
   ```
4. 启动 npm run dev
   
## 数据库

```sql
# 数据库初始化
create database `jianghujs_org` default character set utf8mb4 collate utf8mb4_bin;
use jianghujs_org;
# 运行 sql/init.sql 文件
```

## 测试账号 & 测试环境

- admin/123456



