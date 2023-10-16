'use strict';

const Service = require('egg').Service;
const idGenerateUtil = require("@jianghujs/jianghu/app/common/idGenerateUtil");

class MemberService extends Service {

  async fillInsertItemParamsBeforeHook() {
    const tableName = 'member';
    const columnName = "idSequence";
    const startValue = 1000;
    const idSequence = await idGenerateUtil.idPlus({
      knex: this.app.jianghuKnex,
      tableName,
      columnName,
      startValue,
    });
    const memberId = `E${idSequence}`
    Object.assign(this.ctx.request.body.appData.actionData, { idSequence, memberId })
  }

  async selectMemberFromOrgId() {
    const {knex} = this.app;
    const { where: {orgPrentId} } = this.ctx.request.body.appData;
    const tableName = 'view01_member_org_role';
    let result;
    if(!orgPrentId) {
      result = await knex(tableName).select();
    } else {
      result = await knex(tableName).where('orgPath', 'like', '%' + orgPrentId + '%').select();
    }
    return {
      rows: result
    }
  }
}

module.exports = MemberService;
