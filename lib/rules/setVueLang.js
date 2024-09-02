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
      err1: '',
      err2: '',
      err3: '',
      err4: '',
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
    if (context.options.length && context.options[0].data) {
      ALL = context.options[0].data
    }

    return context.parserServices.defineTemplateBodyVisitor({
          VElement (node) {
            node.startTag.attributes.forEach(attr => {
              if (attr.value) {
                let value = attr.value.value
                if (typeof value !== 'string') return
                const matchKey = Object.keys(ALL).find(key => ALL[key] === String(value).trim())
                if (matchKey) {
                  context.report({
                    node,
                    loc: node.loc,
                    messageId: 'err1',
                    fix: fixer => {
                      return fixer.replaceTextRange(attr.range, `:${attr.key.name}="$t('${matchKey}')"`)
                    }
                  })
                }
              }
            })
            if (node.children) {
              node.children.forEach(child => {
                if (!child.value) return
                let realValue = child.value.replaceAll('\r', '').trim()
                const matchKey = Object.keys(ALL).find(key => ALL[key] === String(realValue).trim())
                let endCharector = ''
                if (matchKey) {
                  context.report({
                    node,
                    loc: node.loc,
                    messageId: 'err2',
                    fix: fixer => {
                      return fixer.replaceTextRange(child.range, `{{ $t('${matchKey}') }}${endCharector}`)
                    }
                  })
                }
              })
            }
          },
          Literal(node) {
            const matchKey = Object.keys(ALL).find(key => ALL[key] === String(node.value).trim())
            if (matchKey) {
              context.report({
                node,
                loc: node.loc,
                messageId: 'err3',
                fix: fixer => {
                  return fixer.replaceTextRange(node.range, `$t('${matchKey}')`)
                }
              })
            }
          }
        },
        {
          Literal (node) {
            const matchKey = Object.keys(ALL).find(key => ALL[key] === String(node.value).trim())
            if (matchKey) {
              context.report({
                node,
                loc: node.loc,
                messageId: 'err4',
                fix: fixer => {
                  return fixer.replaceTextRange(node.range, `this.$t('${matchKey}')`)
                }
              })
            }
          }
        })
  },
};
