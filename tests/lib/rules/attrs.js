/**
 * @fileoverview lang
 * @author lang
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/attrs")
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

ruleTester.run("attrs", rule, {
  valid: [
    // give me some code that won't trigger a warning
    `<span>test</span>    `
  ],

  invalid: [
    {
      code: `<span
                a="1"></span>`,
      output: `<span a="1"></span>`,
      errors: [{ messageId: "err" }],
    },
    {
      code: `<span a="1" b="2" c="3" d="4"></span>`,
      output: `<span
  a="1"
  b="2"
  c="3"
  d="4"
></span>`,
      errors: [{ messageId: "err" }],
    },
    {
      code: `<span a="1" b="2"
c="3" d="4"></span>`,
      output: `<span
  a="1"
  b="2"
  c="3"
  d="4"
></span>`,
      errors: [{ messageId: "err" }],
    },
  ],
});
