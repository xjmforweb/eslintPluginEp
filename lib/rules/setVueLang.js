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
    messages: {
      err1: '',
      err2: '',
      err3: '',
      err4: '',
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return context.parserServices.defineTemplateBodyVisitor({
          VElement (node) {
            node.startTag.attributes.forEach(attr => {
              if (attr.value) {
                let value = attr.value.value
                if (typeof value !== 'string') return
                if (ALL[value]) {
                  context.report({
                    node,
                    loc: node.loc,
                    messageId: 'err1',
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
                if (ALL[realValue]) {
                  context.report({
                    node,
                    loc: node.loc,
                    messageId: 'err2',
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
                messageId: 'err3',
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
                messageId: 'err4',
                fix: fixer => {
                  return fixer.replaceTextRange(node.range, `this.$t('${ALL[node.value]}')`)
                }
              })
            }
          }
        })
  },
};
