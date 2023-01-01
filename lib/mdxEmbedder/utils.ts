// borrowed from ggoodman/nostalgie
// https://github.com/ggoodman/nostalgie/blob/26a7fad65faefdffe3ea06f0b9892ba3dd5c1efa/src/worker/mdxCompiler.ts
export const createJSONParseAST = (value: string) => {
  return {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "JSON",
            },
            property: {
              type: "Identifier",
              name: "parse",
            },
            computed: false,
            optional: false,
          },
          arguments: [
            {
              type: "Literal",
              value: value,
              raw: JSON.stringify(value),
            },
          ],
          optional: false,
        },
      },
    ],
    sourceType: "module",
    comments: [],
  };
};
