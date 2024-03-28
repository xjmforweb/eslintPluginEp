let ALL = require('../../utils/all')

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
    messages: {
      err1: 'errr1',
      err2: 'errr2'
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      {
        "type": "object",
        "properties": {
          "data": {
            "type": "object"
          }
        },
        "additionalProperties": false
      }
    ]
  },

  create(context) {
    // variables should be defined here
    if (context.options.length && context.options[0].data) {
      ALL = context.options[0].data
    }


    return {
      Literal (node) {
        if (ALL[node.value]) {
          context.report({
            node,
            loc: node.loc,
            messageId: `err1`,
            fix: fixer => {
              if (node.parent.type === 'JSXAttribute') {
                return fixer.replaceTextRange(node.range, `{t('${ALL[node.value]}')}`)
              } else {
                return fixer.replaceTextRange(node.range, `t('${ALL[node.value]}')`)
              }
            }
          })
        }
      },
      JSXText (node) {
        if (ALL[node.value]) {
          context.report({
            node,
            loc: node.loc,
            messageId: `err2`,
            fix: fixer => {
              return fixer.replaceTextRange(node.range, `{t('${ALL[node.value]}')}`)
            }
          })
        }
      }
    }
  },
};
