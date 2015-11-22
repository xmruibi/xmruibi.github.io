+++
date = "2015-10-25T10:13:13-07:00"
levels = []
tags = ["Polish Notation", "Expression", "Stack"]
title = "Convert Expression to Polish Notation"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++



Given an expression string array, return the Polish notation of this expression. (remove the parentheses)

>Polish notation, also known as Polish prefix notation or simply prefix notation, is a form of notation for logic, arithmetic, and algebra. Its distinguishing feature is that it places operators to the left of their operands. If the arity of the operators is fixed, the result is a syntax lacking parentheses or other brackets that can still be parsed without ambiguity. The Polish logician Jan Łukasiewicz invented this notation in 1924 in order to simplify sentential logic.

### Example
For the expression `[(5 − 6) * 7]` (which represented by `["(", "5", "−", "6", ")", "*", "7"]`), the corresponding polish notation is `[* - 5 6 7]` (which the return value should be `["*", "−", "5", "6", "7"]`).

## Think
- The idea is not complext if you took the reverse polish notation question.
- Just two things changed:
	- Pass from rear to head;
	- Every insertion is to the first index in result list

## Solution
```java
public class Solution {
    /**
     * @param expression: A string array
     * @return: The Polish notation of this expression
     */
    public ArrayList<String> convertToPN(String[] expression) {
        
        Stack<String> ops = new Stack<>();
        ArrayList<String> res = new ArrayList<>();
        for(int i = expression.length - 1; i >= 0; i--) {
            String str = expression[i];
            if(str.equals("+") || str.equals("-") ||str.equals("*") ||str.equals("/")) {
                while(!ops.isEmpty() && operatorLevel(ops.peek()) > operatorLevel(str))
                    res.add(0, ops.pop());
                ops.push(str);
            }else if(str.equals(")")){
                ops.push(str);
            }else if(str.equals("(")) {
                while(!ops.isEmpty() && !ops.peek().equals(")"))
                    res.add(0, ops.pop());
                if(!ops.isEmpty()) 
                    ops.pop(); // pop the ")"
            }else
                res.add(0, str);
        }
        while(!ops.isEmpty())
            res.add(0, ops.pop());
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
