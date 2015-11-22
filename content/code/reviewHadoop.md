+++
type = "post"
date = "2015-11-12T22:56:15-07:00"
tags = ["Map Reduce", "Hadoop"]
title = "Hadoop Review"
topics = ["Java", "Cloud Computing"]
lightbox = true
author = "Rui Bi"
banner = "/media/banner/hadoop.png"
+++
<!--more-->
## What is Hadoop
> An open-source software framework for storage and large-scale processing of data-sets on clusters of commodity hardware

![](https://raw.githubusercontent.com/xmruibi/Sketchboard/master/hadoopInfra.png)
## Physical Hardware Level
This is the hardware part of the infrastructure. 
### Cluster 
Cluster is the set of host machines (nodes). Nodes may be partitioned in racks. 

## Hardware Management Level
This level contains the functions for manipulate the physical resources, management on data resources and static storage for data resources.

### YARN 
YARN Infrastructure (Yet Another Resource Negotiator) is to do the Computational Resources Allocation. We can also regard it as a data operating system.
##### **Resource Manager** (one per cluster) is the master. 
Knows how many resources they have.
- Scheduler
- Heartbeat Monitor

##### **Node Manager** (many per cluster) is the slave of the infrastructure.
- *Heartbeat Sender*  
    Periodically, it sends an heartbeat to the Resource Manager. 
- *Container Management*   
    A fraction of the NM capacity and it is used by the client for running a program.

### HDFS
File System for providing permanent, reliable and distributed storage. This is typically used for storing inputs and output (but not intermediate ones).

### Storage
Alternative storage solutions. For instance, Database (like **MongoDB**) or Simple Storage Service (S3).

## Software Level (Map Reduce)
This level mainly focus on the data processing by implementing the **MapReduce** paradigm.

### Before MapReduce Job
When a client submits an application, several kinds of information are provided to the YARN infrastucture. In particular:

- Configuration:   
    This may be partial (some parameters are not specified by the user) and in this case the default values are used for the job. Notice that these default values may be the ones chosen by a Hadoop provider like Amanzon.
- Java Implementation:
    - `map()` implementation
    - `combiner()` implementation
    - `reduce()` implementation
- Input/Output information:
    - Input URL:    
    Is the input directory on HDFS? On DB? How many files?
    - Output URL:   
    Where will we store the output? On HDFS? On DB?

### Interaction between MapReduce Framework and YARN Infrastructure
![](/media/hadoop/MR-Yarn.png)

### Overview of Map Reduce function
 It is organized as a “map” function which transform a piece of data into some number of key/value pairs. Each of these elements will then be sorted by their key and reach to the same node, where a “reduce” function is use to merge the values (of the same key) into a single result.

### Mapper
Mapper maps input key/value pairs to a set of intermediate key/value pairs.

Maps are the individual tasks that transform input records into intermediate records. The transformed intermediate records do not need to be of the same type as the input records. A given input pair may map to zero or many output pairs.

The following comes from one of Chinese blog:

1.  在map task执行时，它的输入数据来源于HDFS的block，当然在MapReduce概念中，map task只读取split。Split与block的对应关系可能是多对一，默认是一对一。在WordCount例子里，假设map的输入数据都是像“aaa”这样的字符串。 

2.  在经过mapper的运行后，我们得知mapper的输出是这样一个key/value对： key是“aaa”， value是数值1。因为当前map端只做加1的操作，在reduce task里才去合并结果集。前面我们知道这个job有3个reduce task，到底当前的“aaa”应该交由哪个reduce去做呢，是需要现在决定的。 

    MapReduce提供Partitioner接口，它的作用就是根据key或value及reduce的数量来决定当前的这对输出数据最终应该交由哪个reduce task处理。默认对key hash后再以reduce task数量取模。默认的取模方式只是为了平均reduce的处理能力，如果用户自己对Partitioner有需求，可以订制并设置到job上。 

    在我们的例子中，“aaa”经过Partitioner后返回0，也就是这对值应当交由第一个reducer来处理。接下来，需要将数据写入内存缓冲区中，缓冲区的作用是批量收集map结果，减少磁盘IO的影响。我们的key/value对以及Partition的结果都会被写入缓冲区。当然写入之前，key与value值都会被序列化成字节数组。 

    整个内存缓冲区就是一个字节数组，它的字节索引及key/value存储结构我没有研究过。如果有朋友对它有研究，那么请大致描述下它的细节吧。 

3. 这个内存缓冲区是有大小限制的，默认是100MB。当map task的输出结果很多时，就可能会撑爆内存，所以需要在一定条件下将缓冲区中的数据临时写入磁盘，然后重新利用这块缓冲区。这个从内存往磁盘写数据的过程被称为Spill，中文可译为溢写，字面意思很直观。这个溢写是由单独线程来完成，不影响往缓冲区写map结果的线程。溢写线程启动时不应该阻止map的结果输出，所以整个缓冲区有个溢写的比例spill.percent。这个比例默认是0.8，也就是当缓冲区的数据已经达到阈值（buffer size * spill percent = 100MB * 0.8 = 80MB），溢写线程启动，锁定这80MB的内存，执行溢写过程。Map task的输出结果还可以往剩下的20MB内存中写，互不影响。当溢写线程启动后，需要对这80MB空间内的key做排序(Sort)。排序是MapReduce模型默认的行为，这里的排序也是对序列化的字节做的排序。 	

	在这里我们可以想想，因为map task的输出是需要发送到不同的reduce端去，而内存缓冲区没有对将发送到相同reduce端的数据做合并，那么这种合并应该是体现是磁盘文件中的。从官方图上也可以看到写到磁盘中的溢写文件是对不同的reduce端的数值做过合并。所以溢写过程一个很重要的细节在于，如果有很多个key/value对需要发送到某个reduce端去，那么需要将这些key/value值拼接到一块，减少与partition相关的索引记录。 	

	在针对每个reduce端而合并数据时，有些数据可能像这样：“aaa”/1， “aaa”/1。对于WordCount例子，就是简单地统计单词出现的次数，如果在同一个map task的结果中有很多个像“aaa”一样出现多次的key，我们就应该把它们的值合并到一块，这个过程叫reduce也叫combine。但MapReduce的术语中，reduce只指reduce端执行从多个map task取数据做计算的过程。除reduce外，非正式地合并数据只能算做combine了。其实大家知道的，MapReduce中将Combiner等同于Reducer。	

	如果client设置过Combiner，那么现在就是使用Combiner的时候了。将有相同key的key/value对的value加起来，减少溢写到磁盘的数据量。Combiner会优化MapReduce的中间结果，所以它在整个模型中会多次使用。那哪些场景才能使用Combiner呢？从这里分析，Combiner的输出是Reducer的输入，Combiner绝不能改变最终的计算结果。所以从我的想法来看，Combiner只应该用于那种Reduce的输入key/value与输出key/value类型完全一致，且不影响最终结果的场景。比如累加，最大值等。Combiner的使用一定得慎重，如果用好，它对job执行效率有帮助，反之会影响reduce的最终结果。 

4. 每次溢写会在磁盘上生成一个溢写文件，如果map的输出结果真的很大，有多次这样的溢写发生，磁盘上相应的就会有多个溢写文件存在。当map task真正完成时，内存缓冲区中的数据也全部溢写到磁盘中形成一个溢写文件。最终磁盘中会至少有一个这样的溢写文件存在(如果map的输出结果很少，当map执行完成时，只会产生一个溢写文件)，因为最终的文件只有一个，所以需要将这些溢写文件归并到一起，这个过程就叫做Merge。Merge是怎样的？如前面的例子，“aaa”从某个map task读取过来时值是5，从另外一个map 读取时值是8，因为它们有相同的key，所以得merge成group。什么是group。对于“aaa”就是像这样的：{“aaa”, [5, 8, 2, …]}，数组中的值就是从不同溢写文件中读取出来的，然后再把这些值加起来。请注意，因为merge是将多个溢写文件合并到一个文件，所以可能也有相同的key存在，在这个过程中如果client设置过Combiner，也会使用Combiner来合并相同的key。	
至此，map端的所有工作都已结束，最终生成的这个文件也存放在TaskTracker够得着的某个本地目录内。每个reduce task不断地通过RPC从JobTracker那里获取map task是否完成的信息，如果reduce task得到通知，获知某台TaskTracker上的map task执行完成，Shuffle的后半段过程开始启动。 

简单地说，reduce task在执行之前的工作就是不断地拉取当前job里每个map task的最终结果，然后对从不同地方拉取过来的数据不断地做merge，也最终形成一个文件作为reduce task的输入文件。

### Reducer
Reducer reduces a set of intermediate values which share a key to a smaller set of values.

The following comes from one of Chinese blog:
Reducer真正运行之前，所有的时间都是在拉取数据，做merge，且不断重复地在做。如前面的方式一样，下面我也分段地描述reduce 端的Shuffle细节： 

1. Copy过程，简单地拉取数据。Reduce进程启动一些数据copy线程(Fetcher)，通过HTTP方式请求map task所在的TaskTracker获取map task的输出文件。因为map task早已结束，这些文件就归TaskTracker管理在本地磁盘中。 

2. Merge阶段。这里的merge如map端的merge动作，只是数组中存放的是不同map端copy来的数值。Copy过来的数据会先放入内存缓冲区中，这里的缓冲区大小要比map端的更为灵活，它基于JVM的heap size设置，因为Shuffle阶段Reducer不运行，所以应该把绝大部分的内存都给Shuffle用。这里需要强调的是，merge有三种形式：1)内存到内存  2)内存到磁盘  3)磁盘到磁盘。默认情况下第一种形式不启用，让人比较困惑，是吧。当内存中的数据量到达一定阈值，就启动内存到磁盘的merge。与map 端类似，这也是溢写的过程，这个过程中如果你设置有Combiner，也是会启用的，然后在磁盘中生成了众多的溢写文件。第二种merge方式一直在运行，直到没有map端的数据时才结束，然后启动第三种磁盘到磁盘的merge方式生成最终的那个文件。 

3. Reducer的输入文件。不断地merge后，最后会生成一个“最终文件”。为什么加引号？因为这个文件可能存在于磁盘上，也可能存在于内存中。对我们来说，当然希望它存放于内存中，直接作为Reducer的输入，但默认情况下，这个文件是存放于磁盘中的。当Reducer的输入文件已定，整个Shuffle才最终结束。然后就是Reducer执行，把结果放到HDFS上。 

### Procedure
##### My handwriting procedure about how MapReduce works.

![](https://raw.githubusercontent.com/xmruibi/Sketchboard/master/map_reduce.png)



## Reference
[Map Reduce Procedure Model](http://4.bp.blogspot.com/_j6mB7TMmJJY/SS0CEJLklnI/AAAAAAAAAGQ/ogPGJ3WYpt4/s1600-h/P4.png)

[MapReduce:详解Shuffle过程](http://langyu.iteye.com/blog/992916)

[Hadoop Official Site](https://hadoop.apache.org/docs/r2.6.1/index.html)
