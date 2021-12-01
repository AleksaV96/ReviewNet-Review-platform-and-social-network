package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.repository.post.type.PostRepository;
import reviewnet.platform.repository.space.AbstractPostSpaceRepository;

@Service
public class PostService {
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	AbstractPostSpaceRepository abstractPostSpaceRepository;
	
	@Autowired
	AbstractPostSpaceService abstractPostSpaceService;
	
	public Iterable<Post> getAll() {
		return postRepository.findAll();
	}
	
	public Optional<Post> getById(String id){
		return postRepository.findById(id);
	}
	
	public Optional<AbstractPostSpace> addPost(String id, Post post) {
		postRepository.save(post);
		Optional<AbstractPostSpace> selectedPostSpace = abstractPostSpaceService.getById(id);
		selectedPostSpace.get().getPostCollection().add(post.getId());
		abstractPostSpaceService.updateAbstractPostSpace(id, selectedPostSpace.get());
        return selectedPostSpace;
	}
	
	public void removePost(String id) {
		Optional<Post> post = postRepository.findById(id);
		postRepository.delete(post.get());
	}
	
	public void updatePost(String id, Post post) {
        Optional<Post> pst = postRepository.findById(id);

        if (pst.isPresent()) {
        	post.setId(pst.get().getId());

        	postRepository.save(post);
        }
    }
	
	public Iterable<Post> getAbstractPostSpacePosts(String id) {
        List<String> postIds;
        List<Post> posts = new ArrayList<Post>();
        Post post;

        Optional<AbstractPostSpace> selectedPostSpace = abstractPostSpaceRepository.findById(id);
        postIds = selectedPostSpace.get().getPostCollection();
        for (String postId : postIds) {
            post = getById(postId).get();
            posts.add(post);
        }
        return posts;
    }
}
