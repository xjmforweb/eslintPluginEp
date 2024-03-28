const fs = require('fs').promises
const path = require('path')
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "lang",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    messages: { err: '' },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      {
        "type": "object",
        "properties": {
          "filePath": {
            "type": "string"
          }
        },
        "additionalProperties": false
      }
    ]
  },

  create(context) {
    // variables should be defined here
    const filePath = context.options.length && context.options[0].filePath || 'D:\\projects\\eslintPluginEp\\lib\\chinese.js'
    const sourceCode = context.getSourceCode()
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------
    async function addCnData (value) {
      if (typeof value !== 'string') return
      const val = value.replaceAll('\r', '').replaceAll('\n', '').trim()
      if (!val) return
      if(/.*[\u4e00-\u9fa5]+.*$/.test(val)) {
        const writeHandle = await fs.open(filePath, 'a')
        await writeHandle.appendFile(val + '---\n')
      }
    }

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      Literal (node) {
        addCnData(node.value)
      },
      JSXText (node) {
        addCnData(node.value)
      },
      TemplateLiteral (node) {
        addCnData(sourceCode.getText(node).slice(1, -1))
      }
    }
  },
};
