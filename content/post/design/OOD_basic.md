+++
date = "2015-10-21T11:16:26-07:00"
levels = []
tags = ["Object Oriented Programming"]
title = "Conclusion on Object Oriented Programming"
topics = ["Design"]
+++

## Principles
### Open - Close
##### Open for extension but closed for modifications
> The design and writing of the code should be done in a way that new functionality should be added with minimum changes in the existing code. The design should be done in a way to allow the adding of new functionality as new classes, keeping as much as possible existing code unchanged.

##### Example
```java
class ShapeEditor{
    void drawShape(Shape s){
        if (s.m_type==1)
 			drawRectangle(s);
 		else if (s.m_type==2)
 			drawCircle(s);
 	};
    void drawRectangle(Shape s);
    void drawCircle(Shape s);
}
class Shape{}
class Rectangle extends Shape{}
class Circle extends Shape{}

//---> Every time if new shape added, we have to modify method in the editor class, which violates this rule!
// ---> change!!! write draw method in each shape concreted class
class Shape{ abstract void draw(); }
class Rectangle extends Shape{ public void draw() { /*draw the rectangle*/} }
class Circle extends Shape{ public void draw() { /*draw the circle*/} }
class ShapeEditor{
    void drawShape(Shape s){ s.draw(); }
    }
```

### Dependency Inversion

The low level classes the classes which implement basic and primary operations(disk access, network protocols,...) and high level classes the classes which encapsulate complex logic(business flows, ...). The last ones rely on the low level classes.   

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

> Abstractions should not depend on details. Details should depend on abstractions.

When this principle is applied it means the high level classes are not working directly with low level classes, they are using interfaces as an abstract layer. 

##### Example
```java
class WorkerWithTechOne{}
class Manager{
    WorkerWithTechOne worker;
}
// --> what if add other workers with other techniques?
// --> abstract worker!
interface Worker{}
class WorkerWithTechOne implements Worker{}
class WorkerWithTechTwo implements Worker{}
class Manager{
    Worker worker;
}
```

### Interface Segregation 
##### Clients should not be forced to depend upon interfaces that they don't use.
> Instead of one fat interface, many small interfaces are preferred based on groups of methods, each one serving one submodule.

##### Example

```java
interface work{
    public void work();
    // too much methods!
    public void life();
    public void rest();
}
// ---> change!!!
interface work{public void work();}
interface life{public void life();}
interface rest{public void rest();}
```

### Single Responsibility 
> A class should have only one reason to change.

A simple and intuitive principle, but in practice it is sometimes hard to get it right.

This principle states that if we have 2 reasons to change for a class, we have to split the functionality in two classes. Each class will handle only one responsibility and on future if we need to make one change we are going to make it in the class which handle it. When we need to make a change in a class having more responsibilities the change might affect the other functionality of the classes.
##### Example
```java
interface Iemail{
    public void setSender(String sender);
	public void setReceiver(String receiver);
	public void setContent(String content);
	// --> change!!!
	public void setContent(Content content);
}
// --> Content can be change to HTML or JSON or other kinds of format
// so it should be splited 
interface Content {
	public String getAsString(); // used for serialization
}
class email implement Iemail{
    public void setSender(String sender) { set sender; }
	public void setReceiver(String receiver) { set receiver; }
	public void setContent(String content) {set content; }
	// --> change!!!
	public void setContent(Content content) { set content; }
}
```

### Liskov's Substitution

> Derived types must be completely substitutable for their base types.

This principle is just an extension of the Open Close Principle and it means that we must make sure that new derived classes are extending the base classes without changing their behavior.

This principle considers what kind of derived class should extends a base class. 
##### Example
```java
// Violation of Likov's Substitution Principle
class Rectangle {
	protected int m_width;
	protected int m_height;

	public void setWidth(int width){ m_width = width; }
	public void setHeight(int height){ m_height = height; }
}

class Square extends Rectangle {
	public void setWidth(int width){
		m_width = width;	m_height = width;
	}
	public void setHeight(int height){
		m_width = height;	m_height = height;
	}
}
```

## Muddiest Points

### Composite v.s Aggregation 
##### Simple rules:

> A "owns" B = Composition : B has no meaning or purpose in the system without A

> A "uses" B = Aggregation : B exists independently (conceptually) from A
#####  Example 1:

A Company is an aggregation of People. A Company is a composition of Accounts. When a Company ceases to do business its Accounts cease to exist but its People continue to exist.

##### Example 2: (very simplified)

A Text Editor owns a Buffer (composition). A Text Editor uses a File (aggregation). When the Text Editor is closed, the Buffer is destroyed but the File itself is not destroyed.

### Interface v.s Abstract Class
#### Interface
##### Characters
- Allow multiple inheritance.
- No concrete method.
- No constructor.
- No instance variable, it only allow static final constant with the assignment.
- Can extend interface.
- Cannot be initialized. But sometime the interface can initialized by providing anonymous inner class.

##### Guide
- When you think that the API will not change for a while.
- When you want to have something similar to multiple inheritance.
- Enforce developer to implement the methods defined in interface.
- Interface are used to represent adjective or behavior 



#### Abstract Class
##### Characters
- Can extend abstract class.
- Allow concrete method, provide some default behavior.
- Allow abstract method.
- Cannot be initialized.

##### Guide
- On time critical application prefer abstract class is slightly faster than interface.
- If there is a genuine common behavior across the inheritance hierarchy which can be coded better at one place than abstract class is preferred choice.

#### All in all
Interface and abstract class can work together also where defining function in interface and default functionality on abstract class.
It also called **Skeletal Implementations**.


## Reference
1. OO Design Website: [oodesign.com](http://www.oodesign.com/)

2. OOD Question on Stackexchange: [Composite v.s Aggregation](http://programmers.stackexchange.com/questions/61376/aggregation-vs-composition)