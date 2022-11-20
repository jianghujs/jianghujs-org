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
    const tableName = tableEnum.staff;
    const columnName = "idSequence";
    const startValue = 1000;
    const idSequence = await idGenerateUtil.idPlus({
      knex: this.app.jianghuKnex,
      tableName,
      columnName,
      startValue,
    });
    const staffId = `E${idSequence}`
    Object.assign(this.ctx.request.body.appData.actionData, { idSequence, staffId })
  }
}

module.exports = ArticleService;