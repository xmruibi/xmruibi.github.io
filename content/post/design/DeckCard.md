+++
date = "2015-10-21T10:16:26-07:00"
levels = []
tags = ["Object Oriented Programming"]
title = "Deck of Card"
topics = ["Design"]
+++

Design the data structure for a generic deck of cards. How you would subclass it to implement particular card games?

<!--more-->
## Think
Card has suit and value; Suit has four kinds with Club, Spadem Heart and Diamond.

#### About Enum Type
1. enum 类型不支持 public 和 protected 修饰符的构造方法，因此构造函数一定要是 private 或 friendly 的。也正因为如此，所以枚举对象是无法在程序中通过直接调用其构造方法来初始化的。
2. 定义 enum 类型时候，如果是简单类型 (No more constructor)，那么最后一个枚举值后不用跟任何一个符号；但如果有定制方法，那么最后一个枚举值与后面代码要用分号';'隔开，不能用逗号或空格。
3. 由于 enum 类型的值实际上是通过运行期构造出对象来表示的，所以在 cluster 环境下，每个虚拟机都会构造出一个同义的枚举对象。因而在做比较操作时候就需要注意，如果直接通过使用等号 ( ‘ == ’ ) 操作符，这些看似一样的枚举值一定不相等，因为这不是同一个对象实例。

## Solution
```java
class Card {
	// Define the Suit by Enum type
	public enum Suit {
		CLUBS(1), SPADE(2), HEART(3), DIAMOND(4);
		int value;
		private Suit(int val) {
			this.value = val;
		}
	}

	// Card has suit and value, only two kind of data need to store
	int val;
	Suit suit;


	public Card(int value, Suit suit) {
		this.val = value;
		this.suit = suit;
	}

	public int getVal(){
		return this.val;
	}

	public Suit getSuit(){
		return this.suit;
	}
}
```

## BlackJack

- Face cards (kings, queens, and jacks) are counted as ten points.
- Ace can be counted as 1 point or 11 points
- Other cards with value less than ten should be counted as what it values.

```java

class BlackJack extends Card{
	public BlackJack(int val, Suit suit) {
		super(val, suit);
	}

	@Override
	public int getVal(){
		int value = super.getVal();
		if(value < 10)
			return value；
		else if(value == 1)
			return 11;
		return 10;
	}

	public boolean isAce(){
		return super.getVal() == 1;
	}
}

```



