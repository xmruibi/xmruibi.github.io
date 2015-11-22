+++
type = "post"
date = "2015-08-09T10:56:15-07:00"
tags = ["RESTful", "Configuration", "Spring"]
title = "Architecture Design on Social Music Search project"
topics = ["RESTful", "Java", "Cloud Computing"]
lightbox = true
author = "Rui Bi"
banner = "/media/banner/springboot.png"
+++

## Framework
#### Why Spring Boot?
Spring framework goes every where in current enterprise application. However, most of people are familiar with Spring MVC. Here I just want to introduce a new Spring Boot project. Hear what its official document said:

> Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". 

Yes, unlike Spring MVC, the Spring Boot require less configuration and easier to deploy on remote virtual machine or cloud computing platform. Spring Boot has following features:

#### Features
- Create stand-alone Spring applications
- Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)
- Provide opinionated 'starter' POMs to simplify your Maven configuration
- Automatically configure Spring whenever possible
- Provide production-ready features such as metrics, health checks and externalized configuration
- Absolutely no code generation and no requirement for XML configuration


#### Three Layers Should Be Enough for Everybody

If think about the responsibilities of a web application, we notice that a web application has the following “concerns”:

It needs to process the user’s input and return the correct response back to the user.	
It needs an exception handling mechanism that provides reasonable error messages to the user.	
It needs a transaction management strategy.	
It needs to handle both authentication and authorization.	
It needs to implement the business logic of the application.	
It needs to communicate with the used data storage and other external resources.	

We can fulfil all these concerns by using “only” three layers. These layers are:

- **The web layer** is the uppermost layer of a web application. It is responsible of processing user’s input and returning the correct response back to the user. The web layer must also handle the exceptions thrown by the other layers. Because the web layer is the entry point of our application, it must take care of authentication and act as a first line of defense against unauthorized users.
- **The service layer** resides below the web layer. It acts as a transaction boundary and contains both application and infrastructure services. The application services provides the public API of the service layer. They also act as a transaction boundary and are responsible of authorization. The infrastructure services contain the “plumbing code” that communicates with external resources such as file systems, databases, or email servers. Often these methods are used by more than a one application service.
- **The repository layer** is the lowest layer of a web application. It is responsible of communicating with the used data storage.

<img src="/media/spring/spring-web-application-layers.png">


## Backend Design Detail
Here is how I design my Social Music Search project with Spring Boot:

### RESTful Serivce 
Do the backend and frontend communication	
##### Spring-Data-REST	
Package:	

- Config: ApplicationConfig;
- controller: call services and tranfer data as JSON format to the frondend
- service: call different service from mongodb or elastic search

### Database Service
Non-SQL database, MongoDB, to be the database solution	
##### Spring-Data-MongoDB	
Package:	

- Config: MongoDBConfig;
- mongodb.service
- mongodb.repository;
- domain: Music, BulletComment, User, Genre...;

### Indexing service
Achieve the advanced search function	
##### Spring-Data-ElasticSearch	
Package:	

- Config: ElasticSearchConfig; (port:9300)
- index.service
- index.repository;
- index.domain: Indexed Music;


## Spring Boot App Configuration
The Spring Boot requires some basic configuration and set up the bootstrap entrance:

- It doesn't need `web.xml` whic is common for Spring MVC;
- Set up the bootstrap by Maven plugin.
- Bootstrap Main function (Entrance of Spring Boot App): MusicSearchApplication;

- Spring Configuration (config package)
	- ApplicationConfig
	
	```java
	@Configuration
	@PropertySource("classpath:application.properties") 
		// point out the application.properties as configuration source
	public class ApplicationConfig {
		public @Bean LoggingEventListener mongoEventListener() {
			return new LoggingEventListener();
		}
	}
	```
	- WebMVCConfig
	
	```
	@Configuration
	@ComponentScan({"com.musicSearch.core.controller",
		"com.musicSearch.core.service", "com.musicSearch.core.domain"}) 
	// here is important to do component scan
	public class WebMVCConfig extends WebMvcConfigurerAdapter {
		@Override
		public void addViewControllers(ViewControllerRegistry registry) {
			registry.addViewController("/static")
					.setViewName("forward:/index.html");
			// point out the .css/.js or other static files target and default home page
		}
	}
	```
	- ApplicationInitializer: Core entrance configuration
	
	```java
	@Configuration
	@EnableAutoConfiguration
	@Import({ MongoDBConfig.class, ElasticSearchConfig.class,
			ApplicationConfig.class, WebMVCConfig.class,
			RepositoryRestMvcConfiguration.class })
	public class MusicSearchApplication extends SpringBootServletInitializer {
		public static void main(String[] args) {
			SpringApplication.run(MusicSearchApplication.class, args);
		}
		@Override
		protected SpringApplicationBuilder configure(
				SpringApplicationBuilder application) {
			return application.sources(MusicSearchApplication.class);
		}
	}
	```





## Reference
[Spring Official Site](http://projects.spring.io/spring-boot/)
</br>
[Understanding Spring Web Application Architecture: The Classic Way](http://www.petrikainulainen.net/software-development/design/understanding-spring-web-application-architecture-the-classic-way/)
</br>
[Patterns of Enterprise Application Architecture](http://martinfowler.com/eaaCatalog/index.html)