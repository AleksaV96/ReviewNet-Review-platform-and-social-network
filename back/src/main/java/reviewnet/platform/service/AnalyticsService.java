package reviewnet.platform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.security.Permission;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.repository.post.type.PostRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnalyticsService {
	
	@Autowired 
	PostRepository postRepository;
	
	@Autowired
	ReviewElementService elementService;
	
	@Autowired
    private MongoTemplate mongoTemplate;
	
	public Number countAllPostRecords() {
		return postRepository.count();
	}
	
	public Iterable<Number> getPostCount(){
		 ArrayList<Number> postCount = new ArrayList<>();
		 postCount.add(countAllPostRecords());
		 return postCount;
	}
	
	public Iterable<Number> getPostTypeStatistics(){
		
		 ArrayList<Number> postStats = new ArrayList<>();
		 
		 Query query1 = new Query();
	     query1.addCriteria(Criteria.where("type").is("Forum"));
	     List<Post> forumPosts = mongoTemplate.find(query1, Post.class);
	     postStats.add(forumPosts.size());

		 Query query2 = new Query();
	     query2.addCriteria(Criteria.where("type").is("Review"));
	     List<Post> reviewPosts = mongoTemplate.find(query2, Post.class);
	     postStats.add(reviewPosts.size());
	     
	     Query query3 = new Query();
	     query3.addCriteria(Criteria.where("type").is("Complains"));
	     List<Post> complainPosts = mongoTemplate.find(query3, Post.class);
	     postStats.add(complainPosts.size());
	     
	     Query query4 = new Query();
	     query4.addCriteria(Criteria.where("type").is("RoadMap"));
	     List<Post> roadMapPosts = mongoTemplate.find(query4, Post.class);
	     postStats.add(roadMapPosts.size());
	     
	     Query query5 = new Query();
	     query5.addCriteria(Criteria.where("type").is("Reply"));
	     List<Post> replies = mongoTemplate.find(query5, Post.class);
	     postStats.add(replies.size());
	     
	     return postStats;
	}
	
	public Iterable<Number> getElementPostsTypeStatistics(String id){
		
		 ArrayList<Number> postStats = new ArrayList<>();
		 Optional<ReviewElement> selectedElement = elementService.getById(id);
		 List<AbstractPostSpace> domains= selectedElement.get().getDomains();
		 AbstractPostSpace domain = domains.get(0);
		 
		 Query query1 = new Query();
	     query1.addCriteria(Criteria.where("type").is("Forum").and("elementId").is(domain.getId()));
	     List<Post> forumPosts = mongoTemplate.find(query1, Post.class);
	     postStats.add(forumPosts.size());

		 Query query2 = new Query();
	     query2.addCriteria(Criteria.where("type").is("Review").and("elementId").is(id));
	     List<Post> reviewPosts = mongoTemplate.find(query2, Post.class);
	     postStats.add(reviewPosts.size());
	     
	     Query query3 = new Query();
	     query3.addCriteria(Criteria.where("type").is("Complains").and("elementId").is(id));
	     List<Post> complainPosts = mongoTemplate.find(query3, Post.class);
	     postStats.add(complainPosts.size());
	     
	     Query query4 = new Query();
	     query4.addCriteria(Criteria.where("type").is("RoadMap").and("elementId").is(id));
	     List<Post> roadMapPosts = mongoTemplate.find(query4, Post.class);
	     postStats.add(roadMapPosts.size());
	     
	     Query query5 = new Query();
	     query5.addCriteria(Criteria.where("type").is("Reply").and("elementId").is(id));
	     List<Post> replies = mongoTemplate.find(query5, Post.class);
	     postStats.add(replies.size());
	     
	     return postStats;
	}
	
	public Iterable<Number> getUserTypeStatistics(){
		
		ArrayList<Number> userStats = new ArrayList<>();
		
		Query query1 = new Query();
	    query1.addCriteria(Criteria.where("authority").is("ROLE_SUBSCRIBER"));
	    List<Permission> subscribers = mongoTemplate.find(query1, Permission.class);
	    userStats.add(subscribers.size());
	    
	    Query query2 = new Query();
	    query2.addCriteria(Criteria.where("authority").is("ROLE_MODERATOR"));
	    List<Permission> moderators = mongoTemplate.find(query2, Permission.class);
	    userStats.add(moderators.size());
	    
	    Query query3 = new Query();
	    query3.addCriteria(Criteria.where("authority").is("ROLE_ADMIN"));
	    List<Permission> admins = mongoTemplate.find(query3, Permission.class);
	    userStats.add(admins.size());
	     
	    return userStats;
	}
	
	
	
}
