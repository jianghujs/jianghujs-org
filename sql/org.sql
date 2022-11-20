-- 数据库表
-- staff: 员工表
-- org: 组织表
-- org_tree: 组织树表 ====》 暂时没有必要
-- org_staff_role: 组织员工表


DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idSequence` varchar(255) DEFAULT NULL COMMENT '自增id; 用于生成userId',
  `staffId` varchar(255) DEFAULT NULL COMMENT '职员Id',
  `staffName` varchar(255) DEFAULT NULL COMMENT '职员名',
  `staffStatus` varchar(255) DEFAULT '在职' COMMENT '职员状态; 在职、离职、停职',
  `staffWorkStatus` varchar(255) DEFAULT '在职' COMMENT '职员工作状态; 工作中、休假中、会议中',
  `staffContact` varchar(255) DEFAULT NULL COMMENT '职员联系电话',
  `staffEmail` varchar(255) DEFAULT NULL COMMENT '职员邮箱',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `staffId_index` (`staffId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 COMMENT = '职员表';


DROP TABLE IF EXISTS `org`;
CREATE TABLE `org` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orgId` varchar(255) DEFAULT NULL COMMENT '组织Id; 路径法生成 01-03-01-11',
  `orgName` varchar(255) DEFAULT NULL COMMENT '组织名',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `orgId_index` (`orgId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 COMMENT = '组织表';

DROP TABLE IF EXISTS `org_staff_role`;
CREATE TABLE `org_staff_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orgId` varchar(255) DEFAULT NULL COMMENT '组织Id;',
  `staffId` varchar(255) DEFAULT NULL COMMENT '职员Id;',
  `roleId` varchar(255) DEFAULT NULL COMMENT '角色Id; 负责人、成员',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `orgId_staffId_roleId_index` (`orgId`,`staffId`,`roleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 COMMENT = '组织员工表';



