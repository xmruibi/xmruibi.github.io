+++
date = "2015-10-25T10:13:13-07:00"
levels = []
tags = ["Polish Notation", "Expression", "Stack"]
title = "Convert Expression to Reverse Polish Notation"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Given an expression string array, return the Reverse Polish notation of this expression. (remove the parentheses)
<!--more-->

### Example
For the expression `[3 - 4 + 5]` (which denote by `["3", "-", "4", "+", "5"]`), return `[3 4 - 5 +]` (which denote by `["3", "4", "-", "5", "+"]`)

## Think
- Always consider stack firstly, when meet a reverse polish notation problem.
- The operator priority (`*`, `/`) > (`+`, `-`), when get the operator is less priority than stack top element, pop the stack util the element has the same priority as the current operator and output the pop element in result list.
- Push the "(" always but pop the stack when get the ")" until stack has pop the corresponding "(".
- When get the operand, just output in result list.

## Solution
```java
public class Solution {
    /**
     * @param expression: A string array
     * @return: The Reverse Polish notation of this expression
     */
    public ArrayList<String> convertToRPN(String[] expression) {
        Stack<String> ops = new Stack<>();
        ArrayList<String> res = new ArrayList<>();
        for(String str : expression) {
            if(str.equals("+") || str.equals("-") ||str.equals("*") ||str.equals("/")) {
                while(!ops.isEmpty() && operatorLevel(ops.peek()) >= operatorLevel(str))
                    res.add(ops.pop());
                ops.push(str);
            }else if(str.equals("(")){
                ops.push(str);
            }else if(str.equals(")")) {
                while(!ops.isEmpty() && !ops.peek().equals("("))
                    res.add(ops.pop());
                if(!ops.isEmpty()) 
                    ops.pop(); // pop the "("
            }else
                res.add(str);
        }
        while(!ops.isEmpty())
            res.add(ops.pop());
        return res;
    }
    
    private int operatorLevel(String op) {
        if(op.equals("+") || op.equals("-")) 
            return 1;
        else if(op.equals("*") ||op.equals("/"))
            return 2;
        else
            return 0;
    }
}
```


