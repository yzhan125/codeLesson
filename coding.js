/**
 * Given a string of alphanumeric characters and parentheses, return a string with balanced parentheses by removing the fewest characters possible. 
 * You cannot add anything to the string. 
 * Example 1: Input: "ab(a(c)fg)9)" Output: "ab(a(c)fg)9" or "ab(a(c)fg9)" or "ab(a(cfg)9)"
 * Example 2: Input: "a)b(c)d" Output: "ab(c)d" or "a(c)bd"
 * Example 3: Input: "))((" Output: ""
 * Example 4: Input: "(a(b(c)d" Output: "a(b(c)d)" or "a(bc)d"
 */

/**
 * @param {string} s
 * @return {string}
 */
const balancedParentheses = (s) => {
    // can use stack to track the parentheses
    let stack = [];
    let toRemove = new Set();

    [...s].forEach((char, index) => {
        if (char === '(') {
            stack.push(index);
        } 
        else if (char === ')') {
            if (stack.length){
                stack.pop();
            } else {
                toRemove.add(index);
            }
        }
    });

    // add the remaining indices to remove
    stack.forEach((index) => {
        toRemove.add(index);
    });

    // // build the result string
    // let result = "";
    // for ( let i = 0; i < s.length; i++) {
    //     if (!toRemove.has(i)) {
    //         result += s[i];
    //     }
    // }
    
    // return result; 
    return [...s].filter((_, i) => !toRemove.has(i)).join('');

}

console.log(balancedParentheses("ab(a(c)fg)9)"));
console.log(balancedParentheses("(((abc)"));
console.log(balancedParentheses("))(("));
console.log(balancedParentheses("))(a(b)c))"));

// const testBalancedParentheses = () => {
//     const testCases = [
//         { input: "ab(a(c)fg)9)", expected: "ab(a(c)fg)9" },
//         { input: "a)b(c)d", expected: "ab(c)d" },
//         { input: "))((", expected: "" },
//         { input: "(a(b(c)d", expected: "ab(c)d)" },
//         { input: "((()))", expected: "((()))" },
//         { input: "a(b(c)d)e)f", expected: "a(b(c)d)e" },
//         { input: "a)b(c)d)e", expected: "ab(c)d" },
//     ];

//     testCases.forEach(({ input, expected }, index) => {
//         const result = balancedParentheses(input);
//         console.log(`Test Case ${index + 1}: Input: "${input}" | Expected: "${expected}" | Result: "${result}" | ${result === expected ? 'PASS' : 'FAIL'}`);
//     });
// }

// // Call the test function
// testBalancedParentheses();