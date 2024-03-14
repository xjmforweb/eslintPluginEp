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
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here
    const max = 3

    return {
      JSXOpeningElement (node) {
        const attrNum = node.attributes.length
        const startColumn = node.loc.start.column
        if (attrNum > max && node.loc.end.line - node.loc.start.line < max + 1) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'err',
            fix: fixer => {
              const result = node.attributes.map((attr) => {
                const range = attr.range[0]
                return fixer.replaceTextRange([range - 1, range], '\n' + Array(startColumn + 2).fill(' ').join(''))
              })
              const lastLen = node.selfClosing ? 2 : 1
              const lastStr = node.selfClosing ? '/>' : '>'
              result.push(fixer.replaceTextRange([node.range[1] - lastLen, node.range[1]], '\n' + lastStr))
              return result
            }
          })
        } else if (attrNum > 0 && attrNum <= max && node.loc.end.line !== node.loc.start.line) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'err',
            fix: fixer => {
              const startAttrRange = node.name.loc.end.column
              const result = []
              node.attributes.reduce((prev, next) => {
                const start = prev ? prev.range[1] : startAttrRange
                result.push(fixer.replaceTextRange([start, next.range[0]], ' '))
                return next
              }, 0)
              return result
            }
          })
        }
      }
    }
  },
};
