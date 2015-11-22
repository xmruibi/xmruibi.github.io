+++
date = "2015-10-25T10:13:13-07:00"
levels = []
tags = ["Polish Notation", "Expression", "Stack"]
title = "Expression Evaluation (Calculator)"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given an expression string array, return the final result of this expression
<!--more-->

### Example
For the expression `2*6-(23+7)/(1+2)`, input is
```
[
  "2", "*", "6", "-", "(",
  "23", "+", "7", ")", "/",
  (", "1", "+", "2", ")"
],
```
return `2`

### Note
The expression contains only `integer`, `+`, `-`, `*`, `/`, `(`, `)`.

## Think
- This question is combination of read string array to RPN and then read RPN to get the integer result.
- So.... two steps:
    - first, build RPN
    - second, read the RPN

## Solution
```java
public class Solution {
    /**
     * @param expression: an array of strings;
     * @return: an integer
     */
    public int evaluateExpression(String[] expression) {
        // two steps:
        // first, build RPN
        ArrayList<String> list = convertToRPN(expression);
        // second, read the RPN
        return RPNreader(list);
    }
    
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
    
    private int RPNreader(ArrayList<String> list) {
        Stack<Integer> stack = new Stack<>();
        for(String str : list) {
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
    
};
```