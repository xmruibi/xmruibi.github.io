+++
date = "2015-10-25T10:13:13-07:00"
levels = []
tags = ["Polish Notation", "Expression", "Stack"]
title = "Evaluate Reverse Polish Notation"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++


Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are `+`, `-`, `*`, `/`. Each operand may be an integer or another expression.

<!--more-->

### Example
```
	["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
	["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6
```

## Think
- Reverse Polish Notation problems always accompany with the stack as its data structure;
- Setup stack only to store the integer value;
- One pass the tokens array, when get the integer, insert the stack, while get the operator, to do the evaluate with pop two value from stack and push back the result after calculated;
- Its good to use `switch` rather than `if`;


## Solution
```java
public class Solution {
    /**
     * @param tokens The Reverse Polish Notation
     * @return the value
     */
    public int evalRPN(String[] tokens) {
        // By use stack
        Stack<Integer> stack = new Stack<>();
        for(String str : tokens) {
            int curRes = 0;
            switch(str){
                case "+":
                    curRes = (stack.isEmpty()?0:stack.pop()) + (stack.isEmpty()?0:stack.pop());
                    break;
                case "-":
                    curRes = stack.isEmpty()?0:stack.pop();
                    curRes = (stack.isEmpty()?0:stack.pop()) - curRes;
                    break;
                case "*":
                    curRes = (stack.isEmpty()?0:stack.pop()) *  (stack.isEmpty()?0:stack.pop());
                    break;
                case "/":
                    curRes = stack.isEmpty()?0:stack.pop();
                    if(curRes == 0)
                        break;
                    curRes = (stack.isEmpty()?0:stack.pop()) / curRes;
                    break;
                default:
                    curRes = Integer.parseInt(str);
            }
            stack.push(curRes);
        }
        
        return stack.isEmpty()?0:stack.pop();
    }
}
```