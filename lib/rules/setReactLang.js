const ALL = require('../../utils/all')

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
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      Literal (node) {
        if (ALL[node.value]) {
          context.report({
            node,
            loc: node.loc,
            message: `{{ name }}bug3`,
            data: {
              name: 'test-'
            },
            fix: fixer => {
              if (node.parent.type === 'JSXAttribute') {
                return fixer.replaceTextRange(node.range, `t{'hhhhhhhhhhhhhh'}`)
              } else {
                return fixer.replaceTextRange(node.range, `t{'hhhhhhhhhhhhhh'}`)
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
            message: `{{ name }}bug3`,
            data: {
              name: 'test-'
            },
            fix: fixer => {
              return fixer.replaceTextRange(node.range, `t{'hhhhhhhhhhhhhh'}`)
            }
          })
        }
      }
    }
  },
};
