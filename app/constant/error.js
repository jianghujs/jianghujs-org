'use strict';

class BizError extends Error {
  constructor({ errorCode, errorReason, errorReasonSupplement }) {
    super(JSON.stringify({ errorCode, errorReason, errorReasonSupplement }));
    this.name = 'BizError';
    this.errorCode = errorCode;
    this.errorReason = errorReason;
    this.errorReasonSupplement = errorReasonSupplement;
  }
}

const errorInfoEnum = {
  data_exception: { errorCode: 'data_exception', errorReason: '数据异常' },
  data_has_loop: { errorCode: 'data_has_loop', errorReason: '数据出现循环' },
  data_has_multi_root: { errorCode: 'data_has_multi_root', errorReason: '数据有多个根节点' },
  data_has_not_root: { errorCode: 'data_has_not_root', errorReason: '数据没有根节点' },
  data_has_children: { errorCode: 'data_has_children', errorReason: '数据有子节点，不能删除' },
};

module.exports = {
  BizError,
  errorInfoEnum,
};
