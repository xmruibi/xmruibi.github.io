+++
date = "2015-10-21T11:16:26-07:00"
levels = []
tags = ["Object Oriented Programming"]
title = "Online Book Reader System"
topics = ["Design"]
+++

This question comes from the book named "Cracking Code Interview", Chapter 7; It is very very easy problem with thinking about the insert/remove/update/retrieve action.

<!--more-->
#### Functionality

- User Membership Creation and Extension
- Search the book in memory
- Reading the book

## Analysis

#### Objects
- Book: 
	- ID
	- Title
	- Author
	- Content
	- ...

- Books: (In-memory storage for many book objects)
	- Set<Book>
	- Method
		- find
		- add
		- delete
		- update

- User
	- ID
	- Name
	- accoutnType
	-...

- Users
	- Set<User>
	- Method
		- find
		- add
		- delete
		- update



