package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.repository.element.ReviewElementRepository;

@Service
public class ReviewElementService {
	
	@Autowired
	ReviewElementRepository reviewElementRepository;
	
	@Autowired
	PostService postService;
	
	public Iterable<ReviewElement> getAll() {
		return reviewElementRepository.findAll();
	}
	
	public Optional<ReviewElement> getById(String id){
		return reviewElementRepository.findById(id);
	}
	
	public Optional<ReviewElement> findByName(String name){
		return reviewElementRepository.findByName(name);
	}
	
	public void addElement(ReviewElement element) {
		reviewElementRepository.save(element);
	}
	
	public void removeElement(String id) {
		Optional<ReviewElement> element = reviewElementRepository.findById(id);
		reviewElementRepository.delete(element.get());
	}
	
	public Iterable<Post> getReviewElementPosts(String id) {
		List<AbstractPostSpace> postSpaceList;
        List<Post> reviewElementPosts = new ArrayList<Post>();
        Optional<ReviewElement> selectedReviewElement = reviewElementRepository.findById(id);
        postSpaceList = selectedReviewElement.get().getDomains();
        for (AbstractPostSpace postSpace : postSpaceList) {
        	List<Post> spacePosts = (List<Post>) postService.getAbstractPostSpacePosts(postSpace.getId());
        	for(Post post : spacePosts) {
        		reviewElementPosts.add(post);
        	}
        }
        return reviewElementPosts;
	}
}
