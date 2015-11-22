+++
type = "post"
date = "2015-01-12T15:33:07-07:00"
tags = ["Classification", "Collaborative Search Engine"]
title = "Machine Learning: Query Classifier"
topics = ["Information Retrieval", "Machine Learning"]
github = "xmruibi/SearchEngineQueryClassifier"
ghribbon = "red-upright"
banner = "/media/banner/ml.png"
+++

A system for figuring out the category of user query in search engine and potential subtask of user in group searching task.

<!--more-->
## Basically
Query classifier is some kind of that when you give a query then it return the most possible category or topic of this query.But things are little bit different here. Because this query classifier is a subproject for collaborative search engine. 


## Collaborative Search Engine
That is a search engine platform for a team not an individual (As you know, most of current search engine are just personized for individual). In here we set some experiments according to the real situation that when a team is addressing some problems around a certain task. For example, we assumed a team are planning to go for a travel, so one of guy focus on booking hotel or airline ticket, one guy focus on studying the route of attractions. Then the collaborative search engine should give each person different ranking results. 


## Why need query classifier? 
We assume that during the collaborative search engine working, a team is working on a certain task. And there is a task statement wrote by natural language. In task statement, the subtopic also indicated by some sentences. (Experiment initial stage) So my query classifier is trying to figure out the input query belong to what kind of subtopic under this task. 


## What does classifier result look like?
We've set two experimental tasks for team searching. One is (Study on Social Media). Another is travel in Helsinki. I did some example queries on Console and screenshot results. 

For traveling task, we assumed we have three people searching on three aspects in Helsinki: culture, dining and outdoor activity.

<img src="/media/TravelTask.png" alt="" > 


For social media study, we assumed five subtopics for team member:

 - Emergence and spread of social networking sites, such as MySpace, Facebook, Twitter, and del.icio.us
 - Statistics about popularity of such sites-(How many users? How much time they spend? How much content?)
 - Impacts on students and professionals
 - Commerce around these sites-(How do they make money? How do users use them to make money?)
 - Examples of usage of such services in various domains, such as healthcare and politics

<img src="/media/Socialmedia1.png" alt="" > 
<img src="/media/Socialmedia2.png" alt=""> 

How about them by scores and rank?

<img src="/media/Socialmedia3.png" alt=""> 

## Procedure:
#### Step 0. Basic idea 
 Build language model for each subtopic in one task and get the relevance score between query and subtopic model.  

#### Step 1. Corpus

Set up Corpus for task and each subtopic
 - Keywords extraction from task statement
     - We believe the keyword should be noun or proper noun or noun phrase from task statement.
     - Then Stanford NLP parser to get part-of-speech tags.  
     - There is a little bit tricky during finding the noun phrase. As we know the NLP parser generate the tagging sentences as a tree. Every leaf of tree is the word in sentence. But we need look up the parent nodes or grandparent nodes of leaves to get the phrase tag. So each time even if we find a word is noun or proper noun we still need to check its upper level nodes and consider its tags. 
    
 - Build keywords as query on Google
     - A subtopic can be represent by some keywords combination: 
     - Those keywords can be formed as the queries 
     - Fetch the Google Top 20 Results title and snippet as the subtopic model

#### Step 2. Evaluate Query and Subtopic Relevance

I consider both classical statistic model and language model and get relevance score from two part, but different weights on two models (0.8 and 0.2). As we know language model has better performance. Because, the language model is more rely on the real language rules other than the mathematical statistical rules and  the details of how statistics like term frequency and document
length are used differ.

 - Query Likelihood Model: Dirichlet Smoothing Algorithm
     - considering term frequency and collection frequency 
     - Using a reference model (collection language model) to discriminate unseen words.
            $$P(w|D) = \frac{c(w,M_D)+\mu\cdot P(w|M_C)}{|D|+\mu}$$
            |D| means the length of current document!
            $c(w,M_D)$ means the term frequency in a document

 - Vector Space Model: using TF-IDF score
     - The vector between subtopic model and query
     - but did some query expansion: top 5 snippet from google result as expansion 


## How to implement?

### Subtopic Language Model

#### 1.	Keyword Extraction
Keywords extraction means to extracted keywords from task statement and subtopic statement. These keywords would be combined as queries to search on Google and crawl their Top 20 result as the language model for subtopic. 
In this study, I use the Stanford Nature language parser package to extraction noun word leaves from statement as a keyword, moreover, if a certain noun word leaf has parent node which is noun phrase, the noun phrase should be used as keyword.

Keyword Extraction Example from Task 2 and Task 5
(Word with “+” means the proper noun)

Keywords for Task 2: 
Emergence, spread, social networking sites, Facebook+, Myspace+, Twitter+, Delicious+, statistics, popularity, sites, users, time, impacts, students, professionals, commerce, money, examples, usage, services, domains, healthcare, politics

Keywords for Task 5:
 friend, four-day vacation, December+, Helsinki+, Finland+, information, vacation, flights, US+, hotels, activities, goal, joint plan, things, Euros, person, group, vacation, outdoor activity, dining activity, cultural activity, types, addition

#### 2.	Corpus Set Up
According to the keywords extracted from task or subtopic statement, these keywords can be combined as query for each subtopic. Here are the combination rules: 

 - 1)	Keywords from task statement should regarded as a collection. 
 - 2)	Proper Noun words should regarded as a collection.
 - 3)	Keywords from each subtopic statement should regarded as a collection.
 - 4)	Those keywords come from three collections combined as a query represent for each subtopic.

Using these query and search the TOP 20 results on Google, the titles and snippets on the Google result pages can regarded as the corpus for describing each subtopic .

#### 3.	Dirichlet Prior Smoothing
Once the corpus built up, We nned build language model for getting the likehood of each query belong to what kind of subtopic. I use Dirichlet Prior Smoothing (DPS) method to get the probability of each term from a query in a certain subtopic language model. Then get product by these probability. The probability can be regarded as score one.

#### 4.	Collection Expansion
However, sometimes the term may not get any frequency in collection which is shown as c(w,D) in equation due to the collection may not rich enough for some terms. To deal with this problem, I tried to use the title of task as query to search on Google and get its TOP 50 result as the collection background.

## Query Expansion

#### 1.	Expansion Content
For each user query, I first search the query on Google with fetching its TOP 5 results. The titles and snippets are combined as the query’s expansion.

#### 2.	TFIDF Similarity by VSM
For each query expansion content and subtopic description content (Language model), they can be figured out with two vectors according the terms TFIDF values in two contents. Using the VSM model with these two vectors, then can calculate the similarity between query expansion content and subtopic description. The similarity value can be regarded as score two in this study.

### 3.	Performance Progress
The experiments are stepping by several stages. At the first stage, only language model with Dirichlet Prior Smoothing score applied to evaluate whether a query matching with the subtopic. Under this case, the precision  of experiment is just over than 0.64. Then after inserting the collection background, the precision is improved to 0.73. Finally, with combining DFS score and VSM similarity score, the precision has lift to over 0.81, which is acceptable for the study. So far, we decide to leave the rest of possible features and only use the DFS score and VSM similarity score for the query – subtopic rank system.
