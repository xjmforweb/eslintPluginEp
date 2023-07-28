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
        const cn = []
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        function addCnData (value) {
            const val = value.replaceAll('\r', '').replaceAll('\n', '').trim()
            if (!val) return
            if(/.*[\u4e00-\u9fa5]+.*$/.test(val)) {
                cn.push(val)
            }
        }

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return context.parserServices.defineTemplateBodyVisitor({
                VText(node) {
                    addCnData(node.value)
                },
                VLiteral(node) {
                    addCnData(node.value)
                },
                Literal(node) {
                    addCnData(node.value)
                }
            },
            {
                Literal (node) {
                    addCnData(node.value)
                }
            })
    },
};
