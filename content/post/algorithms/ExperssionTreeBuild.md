+++
date = "2015-10-25T15:13:13-07:00"
levels = []
tags = ["Polish Notation", "Expression", "Stack", "Binary Tree"]
title = "Expression Tree Build"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++


The structure of Expression Tree is a binary tree to evaluate certain expressions. All leaves of the Expression Tree have an number string value. All non-leaves of the Expression Tree have an operator string value.

Now, given an expression array, build the expression tree of this expression, return the root of this expression tree.

<!--more-->

### Example
For the expression `(2*6-(23+7)/(1+2))` (which can be represented by `["2" "*" "6" "-" "(" "23" "+" "7" ")" "/" "(" "1" "+" "2" ")"]`). The expression tree will be like
```
                 [ - ]
             /          \
        [ * ]              [ / ]
      /     \           /         \
    [ 2 ]  [ 6 ]      [ + ]        [ + ]
                     /    \       /      \
                   [ 23 ][ 7 ] [ 1 ]   [ 2 ] .
```

After building the tree, you just need to return root node `[-]`.

### Clarification
A binary expression tree is a specific application of a binary tree to evaluate certain expressions. Two common types of expressions that a binary expression tree can represent are algebraic[1] and boolean. These trees can represent expressions that contain both unary and binary operators.

```java
class ExpressionTreeNode {
    public String symbol;
     public ExpressionTreeNode left, right;
     public ExpressionTreeNode(String symbol) {
        this.symbol = symbol;
        this.left = this.right = null;
    }
}
```

## Think
- Two stacks, one is only for operator, another is for build the result tree.
- The idea is similar with RPN.
- One pass the expression array, when it get a operand, insert as new treenode in result tree, when it get a operator, insert as new treenode in operator tree and compare the priority, if the current is less than stack top element, build a new node with operator in stack top and two node from result tree as its right and left child, then insert back to result tree with this new node.


## Solution
```java



public class Solution {
    /**
     * @param expression: A string array
     * @return: The root of expression tree
     */
    public ExpressionTreeNode build(String[] expression) {
        Stack<ExpressionTreeNode> ops = new Stack<>();
        Stack<ExpressionTreeNode> data = new Stack<>();
        for( int i = 0; i < expression.length; i++) {
            String str = expression[i];
            if(str.equals("+") || str.equals("-") ||str.equals("*") ||str.equals("/")) {
                while(!ops.isEmpty() && operatorLevel(ops.peek().symbol) >= operatorLevel(str)) {
                    newNodeGtr(ops, data);
                }
                ops.push(new ExpressionTreeNode(str));
            }else if(str.equals("(")){
                ops.push(new ExpressionTreeNode(str));
            }else if(str.equals(")")) {
                while(!ops.isEmpty() && !ops.peek().symbol.equals("("))
                    newNodeGtr(ops, data);
                if(!ops.isEmpty()) 
                    ops.pop(); // pop the "("
            }else
                data.push(new ExpressionTreeNode(str));
        }
        
        while(!ops.isEmpty())
            newNodeGtr(ops, data);
        
        return data.isEmpty()? null : data.pop();
    }
    
    private void newNodeGtr(Stack<ExpressionTreeNode> ops, Stack<ExpressionTreeNode> data) {
        if(ops.isEmpty())
            return;
        ExpressionTreeNode node = ops.pop();
        node.right = data.isEmpty() ? null : data.pop();
        node.left = data.isEmpty() ? null : data.pop();
        data.push(node);
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