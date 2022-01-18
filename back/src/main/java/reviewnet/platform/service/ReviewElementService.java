package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.domain.user.role.Moderator;
import reviewnet.platform.repository.element.ReviewElementRepository;

@Service
public class ReviewElementService {
	
	@Autowired
	ReviewElementRepository reviewElementRepository;
	
	@Autowired
	UserAccService userService;
	
	@Autowired
	PostService postService;
	
	public Iterable<ReviewElement> getAll() {
		List<ReviewElement> elements = reviewElementRepository.findAll();
		List<ReviewElement> elementsInOrder = elements.subList(0, elements.size());
        Collections.reverse(elementsInOrder);
        return elementsInOrder;
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
		String creatorId = element.get().getCreatorId();
		Optional<User> creator = userService.getById(creatorId);
		((Moderator) creator.get().getPermission().getRoleDetails()).getModerated().remove(id);
		userService.addUser(creator.get());
		reviewElementRepository.delete(element.get());
	}
	
	public void addModerator(String modId, String elementId) {
		Optional<User> selectedUser = userService.getById(modId);
		Optional<ReviewElement> selectedElement = getById(elementId);
		((Moderator) selectedUser.get().getPermission().getRoleDetails()).getModerated().add(elementId);
		selectedElement.get().getModerators().add(modId);
		userService.addUser(selectedUser.get());
		reviewElementRepository.save(selectedElement.get());
	}
	
	public void removeModerator(String modId, String elementId) {
		Optional<User> selectedUser = userService.getById(modId);
		Optional<ReviewElement> selectedElement = getById(elementId);
		((Moderator) selectedUser.get().getPermission().getRoleDetails()).getModerated().remove(elementId);
		selectedElement.get().getModerators().remove(modId);
		userService.addUser(selectedUser.get());
		reviewElementRepository.save(selectedElement.get());
	}
	
	public Iterable<User> getModerators(String id) {
		Optional<ReviewElement> selectedElement = getById(id);
		List<String> modIds = selectedElement.get().getModerators();
		List<User> moderators = new ArrayList<User>();
		for(String modId : modIds) {
			try {
			moderators.add(userService.getById(modId).get());
			}
			catch(Exception e) {}
		}
		return moderators;
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
