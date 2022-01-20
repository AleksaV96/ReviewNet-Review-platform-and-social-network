package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.domain.space.Theme;
import reviewnet.platform.repository.element.ReviewElementRepository;
import reviewnet.platform.repository.space.AbstractPostSpaceRepository;

@Service
public class AbstractPostSpaceService {
	
	@Autowired
	AbstractPostSpaceRepository abstractPostRepository;
	
	@Autowired
	PostService postService;
	
	@Autowired
	ThemeService themeService;
	
	@Autowired
	ReviewElementRepository reviewElementRepository;
	
	@Autowired
    private MongoTemplate mongoTemplate;
	
	public Optional<AbstractPostSpace> getById(String id){
		return abstractPostRepository.findById(id);
	}
	
	public void addPostSpace(AbstractPostSpace postSpace) {
		abstractPostRepository.save(postSpace);
	}
	
	public void removePostSpace(AbstractPostSpace postSpace, String id) {
		
		Query query = new Query();
		Query query2 = new Query();
		Query query3 = new Query();
		
		query.addCriteria(Criteria.where("domainId").is(id));
		query2.addCriteria(Criteria.where("elementId").is(id));
		query3.addCriteria(Criteria.where("parentId").is(id));
		
    	List<Post> posts= mongoTemplate.find(query, Post.class);
    	List<Post> themePosts= mongoTemplate.find(query2, Post.class);
    	List<Theme> themes= mongoTemplate.find(query3, Theme.class);
    	
    	for(Post post : posts){
    		postService.deletePost(post);
    	}
    	
    	for(Post thPost : themePosts){
    		postService.deletePost(thPost);
    	}
    	
    	for(Theme theme : themes){
    		themeService.delTheme(theme);
    	}
	
		abstractPostRepository.delete(postSpace);
	}
	
	public void updateAbstractPostSpace(String id, AbstractPostSpace abstractPostSpace) {
        Optional<AbstractPostSpace> aps = abstractPostRepository.findById(id);

        if (aps.isPresent()) {
        	abstractPostSpace.setId(aps.get().getId());

            abstractPostRepository.save(abstractPostSpace);
        }
    }
	
	
	
	public Iterable<AbstractPostSpace> getReviewElementDomains(String id) {
        List<AbstractPostSpace> elementDomainSet = new ArrayList<AbstractPostSpace>();

        Optional<ReviewElement> selectedReviewElement = reviewElementRepository.findById(id);
        elementDomainSet = selectedReviewElement.get().getDomains();
        return elementDomainSet;
        
    }
	
}
