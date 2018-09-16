export const verifyRules = (rules, props) => rules.length && !rules.find(rule => !rule(props));
