+++
type = "post"
date = "2015-08-10T23:56:15-07:00"
tags = ["Elastic Search", "Configuration"]
title = "Spring Boot App with Elastic Search Indexing Service"
topics = ["Information Retrieval", "Java", "Cloud Computing"]
lightbox = true
author = "Rui Bi"
banner = "/media/banner/elasticsearch.png"
+++

This article shows an example to build a bridge between Spring-Boot App and Elastic Search Indexing Service. 
 <!--more-->

## 1. Elastic Search Install
Install elastic search is very easy
### Install Elastic Search

#### Start Elastic Search
```
    # windows: cd yourPath: service install
                            service start
                            service stop
    # Mac: cd $ELASTIC_HOME: elasticsearch
```

#### Check your service by input the url `localhost:9200` in your browser.

#### Cluster Name 
If cluster name is not "elasticsearch", it may cause the run failed when your Java code trying to build elastic search instance. There should be an exception( NoNodeClientException: None of node configed) when your indexing the data. 

Please change your cluster name into "elasticsearch" in your elasticsearch install path.
 $ELASTIC_HOME/config/elasticsearch.yml : clustername = elasticsearch


## 2. Creat Index by Spring-data-elasticsearch API
Here is a example from my project. It shows how I creat an index for music by Bulk method, which is provided by Elastic Java API.
```java
@Service
public class MusicIndexingService {

	private final static Logger logger = Logger
			.getLogger(MusicIndexingService.class);

	@Autowired	
	private Client client ;
	
	private ObjectMapper mapper = new ObjectMapper();

	/**
	 * The bulk index method
	 * @param musicCollection for index
	 */
	public void bulkIndex(List<IndexedMusic> musicCollection) {
		client.delete(new DeleteRequest("musics"));
		logger.info("Indexing bulk request of " + musicCollection.size()
				+ " documents");
		BulkRequestBuilder bulkRequest = client.prepareBulk();
		for (IndexedMusic music : musicCollection) {
			String json = null;
			try {
				json = mapper.writeValueAsString(music);
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}
			bulkRequest.add(client.prepareIndex("musics", "music",
					UUID.randomUUID().toString()).setSource(json));
		}
		BulkResponse response = bulkRequest.execute().actionGet();
		if (response.hasFailures()) {
			throw new RuntimeException(
					"there was an error indexing the bulk request of "
							+ musicCollection.size() + " documents: " +response.buildFailureMessage());
		}
	}
}
```


 ## 3. Search the index:
 Search a music by name.
```java
/**
	 * This is keyword search method in comment contents field in music object
	 * @param keyword
	 * @return
	 */
	public List<Music> findMusic(String keyword) {
		QueryBuilder matchquery = QueryBuilders.fuzzyLikeThisFieldQuery(
				"commentContents").likeText(keyword);
		SearchRequestBuilder requestBuilder = client.prepareSearch("musics")
				.setQuery(matchquery);
		SearchResponse response = requestBuilder.execute().actionGet();
		SearchHits hits = response.getHits();
		List<String> musicIdsList = new ArrayList<String>();
		Iterator<SearchHit> iterator = hits.iterator();
		while (iterator.hasNext()) {
			musicIdsList.add(iterator.next().getSource().get("id").toString());
		}
		return (List<Music>) musicRepository.findAll(musicIdsList);
	}

```

