-- 数据库表
-- member: 人/职员/成员 表
-- org: 组织表
-- org_tree: 组织树表 ====》 暂时没有必要
-- org_member_role: 组织成员表


DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idSequence` varchar(255) DEFAULT NULL COMMENT '自增id; 用于生成userId',
  `memberId` varchar(255) DEFAULT NULL COMMENT '职员Id',
  `memberName` varchar(255) DEFAULT NULL COMMENT '职员名',
  `memberStatus` varchar(255) DEFAULT '在职' COMMENT '职员状态; 在职、离职、停职',
  `memberWorkStatus` varchar(255) DEFAULT '在职' COMMENT '职员工作状态; 工作中、休假中、会议中',
  `memberContact` varchar(255) DEFAULT NULL COMMENT '职员联系电话',
  `memberEmail` varchar(255) DEFAULT NULL COMMENT '职员邮箱',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `memberId_index` (`memberId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 COMMENT = '职员表';


DROP TABLE IF EXISTS `org`;
CREATE TABLE `org` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idSequence` varchar(255) DEFAULT NULL COMMENT '自增id; 用于生成userId',
  `memberId` varchar(255) DEFAULT NULL COMMENT '职员Id',
  `memberName` varchar(255) DEFAULT NULL COMMENT '职员名',
  `memberStatus` varchar(255) DEFAULT '在职' COMMENT '职员状态; 在职、离职、停职',
  `memberWorkStatus` varchar(255) DEFAULT '在职' COMMENT '职员工作状态; 工作中、休假中、会议中',
  `memberContact` varchar(255) DEFAULT NULL COMMENT '职员联系电话',
  `memberEmail` varchar(255) DEFAULT NULL COMMENT '职员邮箱',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `memberId_index` (`memberId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 COMMENT = '组织表';


