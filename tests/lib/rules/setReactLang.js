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
    `<span>test</span>    `
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
    {
      code: `export const A = {3: '测试'}`,
      output: `export const A = {3: t('es.test')}`,
      errors: [{ messageId: "err1" }],
    },
  ],
});
