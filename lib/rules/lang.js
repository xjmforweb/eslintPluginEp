/**
 * @fileoverview lang
 * @author lang
 */
"use strict";

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
    const sourceCode = context.getSourceCode()

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return context.parserServices.defineTemplateBodyVisitor({
      VElement (node) {
        node.startTag.attributes.forEach(attr => {
          if (attr.value.value === 'can2') {
            context.report({
              node,
              loc: node.loc,
              message: `{{ name }}bug`,
              data: {
                name: 'test-'
              },
              fix: fixer => {
                return fixer.replaceTextRange(attr.range, `:${attr.key.name}="$t('all.autotext1')"`)
              }
            })
          }
        })
        if (node.children && node.children.length === 1 && node.children[0].value === '还原') {
          context.report({
            node,
            loc: node.loc,
            message: `{{ name }}bug2`,
            data: {
              name: 'test-'
            },
            fix: fixer => {
              return fixer.replaceTextRange(node.children[0].range, `{{ $t('all.autotext1') }}`)
            }
          })
        }
      },
    },
        {
          Literal (node) {
            if (node.value === 'fabricCanvas') {
              context.report({
                node,
                loc: node.loc,
                message: `{{ name }}bug3`,
                data: {
                  name: 'test-'
                },
                fix: fixer => {
                  return fixer.replaceTextRange(node.range, `this.$t('all.autotext1')`)
                }
              })
            }
          }
        })
  },
};
