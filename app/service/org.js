'use strict';

const Service = require('egg').Service;
const _ = require("lodash");

const idGenerateUtil = require("@jianghujs/jianghu/app/common/idGenerateUtil");
const validateUtil = require("@jianghujs/jianghu/app/common/validateUtil");
const { tableEnum } = require('../constant/constant');
const actionDataScheme = Object.freeze({
});

class ArticleService extends Service {

  async fillInsertItemParamsBeforeHook() {
    // TODO:
    //  - 没有父组织 ===》 找出 最大的 XX  
    //    1. SELECT MAX(orgId) orgId FROM org;  ===> 04-02
    //    2. 04-02 ===> 04  "04-02".split('-')[0] ===> parseInt('04') + 1
    //    3. 补0 _.padStart('5', 2, '0');
    //  -   有父组织 ===》 找出 父组织下 最大的 XX
    //    1. SELECT MAX(orgId) orgId FROM org where orgId like '03-%';
    const { knex } = this.app;
    const { parentOrgId } = this.ctx.request.body.appData.actionData;
    let targetPathIdIndex = 0;
    let whereRaw = '1=1';
    if (parentOrgId) {
      whereRaw = `orgId like '${parentOrgId}-%'`;
      targetPathIdIndex = parentOrgId.split('-').length;
      delete this.ctx.request.body.appData.actionData.parentOrgId;
    }

    const result = await knex(tableEnum.org)
      .whereRaw(whereRaw)
      .select(knex.raw('MAX(orgId) as maxOrgId'));
    if (!result[0].maxOrgId) {
      const orgId = parentOrgId ? `${parentOrgId}-01`: '01';
      Object.assign(this.ctx.request.body.appData.actionData, { orgId });
      return;
    }  
    const maxOrgPathIdList = result[0].maxOrgId.split('-');
    const targetPathId = maxOrgPathIdList[targetPathIdIndex];
    const newPathId = parseInt(targetPathId) + 1;
    let orgId =  _.padStart(newPathId, 2, '0');
    if (parentOrgId) {
      orgId = `${parentOrgId}-` + orgId;
    }
    Object.assign(this.ctx.request.body.appData.actionData, { orgId });
  }
}

module.exports = ArticleService;