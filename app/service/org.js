'use strict';

const Service = require('egg').Service;
const _ = require("lodash");

const idGenerateUtil = require("@jianghujs/jianghu/app/common/idGenerateUtil");
const { BizError, errorInfoEnum } = require("../constant/error");

class ArticleService extends Service {

  async insertItem() {
    const { jianghuKnex } = this.app;
    const { orgParentId, orgName, remark } = this.ctx.request.body.appData.actionData;

    const checkTreeAndSetPath = this.checkTreeAndSetPath;
    const diffAndSaveToDatabase = this.diffAndSaveToDatabase;

    await jianghuKnex.transaction(async trx => {

      // 获取新 id
      const tableName = "org";
      const columnName = "orgNumber";
      const newOrgIdNum = await idGenerateUtil.idPlus({
        knex: this.app.jianghuKnex,
        tableName,
        columnName,
      });
      const newOrgNum = _.padStart(newOrgIdNum, 2, '0');

      // 获取所有数据，并把新数据放进去，进行检查
      const oldOrgList = JSON.parse(JSON.stringify(await trx('org').select()));
      const orgList = JSON.parse(JSON.stringify(oldOrgList));
      orgList.push({
        orgNumber: newOrgNum, orgParentId, orgName, remark
      })
      // 检查数据并重新设置 path
      checkTreeAndSetPath(orgList);

      // 更新到数据库
      await diffAndSaveToDatabase(orgList, oldOrgList, trx);
    });
  }

  async updateItem() {
    const { jianghuKnex } = this.app;
    const { orgId, orgNumber, orgParentId, orgName, remark } = this.ctx.request.body.appData.actionData;
    const { id } = this.ctx.request.body.appData.where;

    const checkTreeAndSetPath = this.checkTreeAndSetPath;
    const diffAndSaveToDatabase = this.diffAndSaveToDatabase;

    await jianghuKnex.transaction(async trx => {
      // 获取所有数据，并把新数据放进去，进行检查
      const oldOrgList = JSON.parse(JSON.stringify(await trx('org').select()));
      const orgList = JSON.parse(JSON.stringify(oldOrgList)).filter(o => o.orgId !== orgId);
      orgList.push({
        id, orgId, orgNumber, orgParentId, orgName, remark
      })
      // 检查数据并重新设置 path
      checkTreeAndSetPath(orgList);

      // 更新到数据库
      await diffAndSaveToDatabase(orgList, oldOrgList, trx);
    });
  }

  async deleteItem() {
    // 必须要没有子节点才能删除
    const { jianghuKnex } = this.app;
    const { orgId } = this.ctx.request.body.appData.where; 
    const child = await jianghuKnex('org').where({ orgParentId: orgId }).first();
    if (child) {
      throw new BizError(errorInfoEnum.data_has_children);
    }
    return await jianghuKnex('org').where({ orgId }).delete();
  }

  // 检查数据并重新设置 path
  checkTreeAndSetPath(orgList) {
    const recordMap = {};
    // 以根节点开始
    let checkList = orgList.filter(o => !o.orgParentId);
    if (checkList.length === 0) {
      throw new BizError(errorInfoEnum.data_has_not_root);
    }
    if (checkList.length > 1) {
      throw new BizError(errorInfoEnum.data_has_multi_root);
    }
    // 开始 BFS
    while (checkList.length) {
      const nextLevelCheckList = [];
      for (const item of checkList) {
        // 检查循环
        if (recordMap[item.orgNumber]) {
          throw new BizError(errorInfoEnum.data_has_loop);
        } else {
          recordMap[item.orgNumber] = true;
        }
        // 更新 orgPath
        if (item.orgParentNode) {
          item.orgId = item.orgParentNode.orgId + '-' + item.orgNumber;
        } else {
          item.orgId = item.orgNumber;
        }

        // 获取下级节点
        const nextLevelNodes = orgList.filter(o => o.orgParentId === item.orgId);
        nextLevelNodes.forEach(o => o.orgParentNode = item);
        nextLevelCheckList.push(...nextLevelNodes);
      }
      checkList = nextLevelCheckList;
    }
  }

  // 对比新旧数据并更新到数据库
  async diffAndSaveToDatabase(newOrgList, oldOrgList, knex) {
    // 这里只有新增或更新，故暂不处理删除
    const createList = [];
    const updateList = [];
    newOrgList.forEach(newItem => {
      const oldItem = oldOrgList.find(o => o.id === newItem.id);
      if (!oldItem) {
        createList.push(newItem);
      } else {
        // 对比更新
        const newItemJson = JSON.stringify({
          orgId: newItem.orgId,
          orgName: newItem.orgName,
          orgNumber: newItem.orgNumber,
          orgParentId: newItem.orgParentId,
        });
        const oldItemJson = JSON.stringify({
          orgId: oldItem.orgId,
          orgName: oldItem.orgName,
          orgNumber: oldItem.orgNumber,
          orgParentId: oldItem.orgParentId,
        });
        if (newItemJson !== oldItemJson) {
          updateList.push(newItem);
        }
      }
    });

    try {
      for (const item of createList) {
        const { orgId, orgName, orgNumber, orgParentId } = item;
        await knex('org').jhInsert({ orgId, orgName, orgNumber, orgParentId });
      }
      for (const item of updateList) {
        const { id, orgId, orgName, orgParentId } = item;
        await knex('org').where({ id }).jhUpdate({ orgId, orgName, orgParentId });
      }
    } catch (err) {
      console.error(err)
    }
  }

}

module.exports = ArticleService;