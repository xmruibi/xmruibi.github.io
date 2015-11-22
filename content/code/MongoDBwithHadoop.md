+++
type = "post"
date = "2015-04-16T12:56:15-07:00"
tags = ["Hadoop", "MongoDB", "Configuration"]
title = "How to Input and Output with Mongo DB Data on Hadoop Platform"
topics = ["DevOps", "Cloud Computing"]
github = "xmruibi/MongoDBHadoopStockInfo"
ghribbon = "green-upright"
lightbox = true
author = "Rui Bi"
banner = "/media/banner/hadoop.png"
+++

In the previous article, I've talked about how to distributed a Mongo DB database in multiple virtual machine. Here, I'd like to discuss how we can make data stream between Mongo DB and Hadoop. In fact, the format from MongoDB cannot directly used in Hadoop Map Reduce function. You have to use Mongo Hadoop API to assist you for finishing this difficult connection between MongoDB and Hadoop.

<!--more-->

## Introduction

The MongoDB Connector for Hadoop is a plugin for Hadoop that provides the ability to use MongoDB as an input source and/or an output destination. The major advantage is that once the connector is implemented, the analytic power of Hadoop can be utilized with the MongoDB storage architecture. 
> “The Connector presents MongoDB as a Hadoop-compatible file system allowing a MapReduce job to read from MongoDB directly without first copying it to HDFS, thereby eliminating the need to move Terabytes of data across the network. MapReduce jobs can pass queries as filters, so avoiding the need to scan entire collections, and can also take advantage of MongoDB’s rich indexing capabilities including geospatial, text-search, array, compound and sparse indexes” 

## Procedure

Once we choose MongoDB as the I/O target, all of our I/O format needs to fit with MongoDB document format, thus we must use either JSON or BSON. So the entire procedure when Hadoop works with MongoDB is shown as follows:
- Create MongoDB URL builder with multiple Mongos (Routers) as Database entrances
- Set one MongoDB collection as input source with MongoDB URL builder
- Use Hadoop as Map-Reduce computing framework. 
- Override Mapper class with BSON format as value in.
- Override Reduce class addressing the BSON data and output the data with MongodbUpdateWritable format
- Set another MongoDB collection as output destination  with MongoDB URL builder


## Talk is cheap, show me the code!

### Access to Mongo DB 
By create MongoDB URL builder, the hadoop platform can detect the database position. However, we have multiple Mongo DB routers as Database entrances. So we just save our entry IP address as a list.

```java
private MongoClientURIBuilder ShardedDBURIBuilder() {
		// mainly host
		String mainHost = "44XX.XXX.XXX.X01";

		// set up the option entrances when the main one shut down
		List<ServerAddress> serverSeeds;
		MongoClient mongoClient = null;
		serverSeeds = new ArrayList<ServerAddress>();
		try {
			serverSeeds.add(new ServerAddress("4XX.XXX.XXX.X02", 27017));
			serverSeeds.add(new ServerAddress("4XX.XXX.XXX.X03", 27017));
			mongoClient = new MongoClient(serverSeeds);
			mongoClient.getMongoClientOptions();
		} catch (UnknownHostException e) {
			log.error(e + "" + e.getCause());
		}

		MongoClientURIBuilder uriBuilder = new MongoClientURIBuilder();
		uriBuilder.addHost(mainHost, 27017);
		uriBuilder.options(mongoClient.getMongoClientOptions());
		return uriBuilder;
}
```
Then we know where is the Mongo DB! But we still need to locate the collection in MongoDB and more detailed information. Here we go:

```java
MongoClientURIBuilder uriBuilder = ShardedDBURIBuilder();
uriBuilder.collection("stock", "symbols");
MongoClientURI inputURI = uriBuilder.build();
MongoConfigUtil.setInputURI(getConf(), inputURI);
```

### Build our own mapper and reducer!
Here I use my project about stock information crawler as an example. Mapper read the stock symbol data from the MongoDB. Then it get a list of symbol name in mapper. The mapper has separated that list and the reducer should read different part of list and search the stock information according to the partial symbol name list. 

- Override Mapper class with BSON format as value in.

```java
public class SymbolsMapper extends Mapper<Object, BSONObject, Text, IntWritable>{
    @Override
    public void map(Object key, BSONObject val, final Context context) 
        throws IOException, InterruptedException {
    	System.out.println(val.get("symbol")+"  Mapper Getted!!");
        context.write(new Text((val.get("symbol")).toString()), 
        		new IntWritable(1));
    }
}
```

- Override Reduce class addressing the BSON data and output the data with MongodbUpdateWritable format

```java
public class SymbolsReducer extends Reducer<Text, IntWritable, NullWritable, MongoUpdateWritable>{
	
    @Override
    public void reduce(final Text pKey, final Iterable<IntWritable> pValues,
                        final Context pContext )
            throws IOException, InterruptedException{
    	    
        StockCrawler stockCrawler = new StockCrawler();
        
        // get symbol from keyIn 
        Quote quote = stockCrawler.getHistQuotesBySymbol(pKey.toString());
        if(quote==null||quote.getSymbolName()==null||quote.getHistorical_quotes()==null)
        	return;
        // get Quote info, set new id
        BasicBSONObject query = new BasicBSONObject("_id", quote.getKey());
       
        // set symbol name and symbol quotes
        BasicBSONObject stockQuote = new BasicBSONObject();
        stockQuote.put("symbol", quote.getSymbolName());
        ArrayList<Object> historical_quotes =  quote.getHistorical_quotes();
        
        BasicBSONObject update = new BasicBSONObject("$set", stockQuote);
        update.append("$pushAll", new BasicBSONObject("historical_quotes", historical_quotes));
        
        pContext.write(null, new MongoUpdateWritable(query, update, true, false));
    }
}
```

### Output back to Mongo DB
The output procedure is very simliar with the input one. But just the difference on the target collection in Mongo DB.

```java
MongoClientURI outputURI = uriBuilder.build();
MongoConfigUtil.setOutputURI(getConf(), outputURI);
```
### The overview on this connector:
```java
public MongoMapredStockCrawler() {
		setConf(new Configuration());

		if (MongoTool.isMapRedV1()) {
			MapredMongoConfigUtil.setInputFormat(getConf(),
					com.mongodb.hadoop.mapred.MongoInputFormat.class);
			MapredMongoConfigUtil.setOutputFormat(getConf(),
					com.mongodb.hadoop.mapred.MongoOutputFormat.class);
		} else {
			MongoConfigUtil.setInputFormat(getConf(), MongoInputFormat.class);
			MongoConfigUtil.setOutputFormat(getConf(), MongoOutputFormat.class);
		}

		MongoClientURIBuilder uriBuilder = ShardedDBURIBuilder();
		uriBuilder.collection("stock", "symbols");
		MongoClientURI inputURI = uriBuilder.build();
		uriBuilder.collection("stock", "quotes");
		MongoClientURI outputURI = uriBuilder.build();

		MongoConfigUtil.setInputURI(getConf(), inputURI);
		MongoConfigUtil.setOutputURI(getConf(), outputURI);

		MongoConfigUtil.setMapper(getConf(), SymbolsMapper.class);
		MongoConfigUtil.setReducer(getConf(), SymbolsReducer.class);

		MongoConfigUtil.setMapperOutputKey(getConf(), Text.class);
		MongoConfigUtil.setMapperOutputValue(getConf(), IntWritable.class);

		MongoConfigUtil.setOutputKey(getConf(), IntWritable.class);
		MongoConfigUtil.setOutputValue(getConf(), BSONWritable.class);
	}
```

## Conclusion
This is very typical example when people need to read data from Mongo DB and process the data on Hadoop platform and then back the data to Mongo DB. Since there is very little instruction about this work, I just shared my idea on that. 



