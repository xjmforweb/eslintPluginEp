const ALL = require('../../utils/all')

function checkValue (attrValue) {
  if (ALL[attrValue]) {}
}
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
              if (attr.value) {
                let value = attr.value.value
                if (typeof value !== 'string') return
                if (value.endsWith(':')) value = value.slice(0, -1).trim()
                else if (value.endsWith('：')) value = value.slice(0, -1).trim()
                if (ALL[value]) {
                  context.report({
                    node,
                    loc: node.loc,
                    message: `{{ name }}bug`,
                    data: {
                      name: 'test-'
                    },
                    fix: fixer => {
                      return fixer.replaceTextRange(attr.range, `:${attr.key.name}="$t('${ALL[value]}')"`)
                    }
                  })
                }
              }
            })
            if (node.children) {
              node.children.forEach(child => {
                if (!child.value) return
                let realValue = child.value.replaceAll('\r', '').trim()
                let endCharector = ''
                if (realValue.endsWith(':')) {
                  endCharector = ':'
                  realValue = realValue.slice(0, -1).trim()
                } else if (realValue.endsWith('：')) {
                  endCharector = '：'
                  realValue = realValue.slice(0, -1).trim()
                }
                if (ALL[realValue]) {
                  context.report({
                    node,
                    loc: node.loc,
                    message: `{{ name }}bug2`,
                    data: {
                      name: 'test-'
                    },
                    fix: fixer => {
                      return fixer.replaceTextRange(child.range, `{{ $t('${ALL[realValue]}') }}${endCharector}`)
                    }
                  })
                }
              })
            }
          },
          Literal(node) {
            if (ALL[node.value]) {
              context.report({
                node,
                loc: node.loc,
                message: `{{ name }}bug4`,
                data: {
                  name: 'test-'
                },
                fix: fixer => {
                  return fixer.replaceTextRange(node.range, `$t('${ALL[node.value]}')`)
                }
              })
            }
          }
        },
        {
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
                  return fixer.replaceTextRange(node.range, `this.$t('${ALL[node.value]}')`)
                }
              })
            }
          }
        })
  },
};
