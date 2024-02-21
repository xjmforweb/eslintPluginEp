/**
 * @fileoverview lang
 * @author lang
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/setReactLang")
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  }
  // parser: require('@babel/eslint-parser')
})

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("lang", rule, {
  valid: [
    // give me some code that won't trigger a warning
    `
        <Table.Column title={<Cell label='医嘱类型' code='hospitalizationInformation:physicianOrderSheet:orderType' disabled={tableData.every(v => !v.repeatIndicator)} />} dataIndex="repeatIndicator" render={_ => ( <Valuex code='hospitalizationInformation:physicianOrderSheet:orderType' d={_} />)} />
    `
  ],

  invalid: [
    {
      code: `<span>测试</span>`,
      output: `<span>{t('es.test')}</span>`,
      errors: [{ messageId: "err2" }],
    },
    {
      code: `<span title="测试"></span>`,
      output: `<span title={t('es.test')}></span>`,
      errors: [{ messageId: "err1" }],
    },
  ],
});
