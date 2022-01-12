package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.domain.space.Theme;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.repository.post.type.PostRepository;
import reviewnet.platform.repository.space.AbstractPostSpaceRepository;
import reviewnet.platform.repository.space.ThemeRepository;

@Service
public class PostService {
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	AbstractPostSpaceRepository abstractPostSpaceRepository;
	
	@Autowired
	AbstractPostSpaceService abstractPostSpaceService;
	
	@Autowired
	UserAccService userService;
	
	@Autowired
	ThemeService themeService;
	
	@Autowired
	ThemeRepository themeRepository;
	
	public Iterable<Post> getAll() {
		return postRepository.findAll();
	}
	
	public Optional<Post> getById(String id){
		return postRepository.findById(id);
	}
	
	public Optional<AbstractPostSpace> addPost(String id, Post post) {
		Optional<User> author = userService.findByUsername(post.getAuthorUsername());
		post.setAuthor(author.get());
		postRepository.save(post);
		author.get().getProfile().addPostedId(post.getId());
		userService.addUser(author.get());
		Optional<AbstractPostSpace> selectedPostSpace = abstractPostSpaceService.getById(id);
		selectedPostSpace.get().getPostCollection().add(post.getId());
		abstractPostSpaceService.updateAbstractPostSpace(id, selectedPostSpace.get());
        return selectedPostSpace;
	}
	
	public Optional<Theme> addThemePost(String id, Post post) {
		Optional<User> author = userService.findByUsername(post.getAuthorUsername());
		post.setAuthor(author.get());
		postRepository.save(post);
		author.get().getProfile().addPostedId(post.getId());
		userService.addUser(author.get());
		Optional<Theme> selectedTheme = themeService.getById(id);
		selectedTheme.get().getPostCollection().add(post.getId());
		themeRepository.save(selectedTheme.get());
        return selectedTheme;
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
        	try {
            post = getById(postId).get();
            posts.add(post);
        	}
        	catch(Exception e) {
        	}
        }
        return posts;
	}
	
	public Iterable<Post> getUserPosts(String id) {
		List<String> postIds = null;
        List<Post> posts = new ArrayList<Post>();
        Post post;
        
        try {
        Optional<User> selectedUser = userService.getById(id);
        postIds = selectedUser.get().getProfile().getProfilePostIds();
        }
        catch(Exception e) {}
        for (String postId : postIds) {
        	try {
            post = getById(postId).get();
            posts.add(post);
        	}
        	catch(Exception e) {}
        }
        return posts;
	}
	
	public Iterable<Post> getUserPosted(String id) {
		List<String> postIds = null;
        List<Post> posts = new ArrayList<Post>();
        Post post;
        
        try {
        Optional<User> selectedUser = userService.getById(id);
        postIds = selectedUser.get().getProfile().getPosted();
        }
        catch(Exception e) {}
        for (String postId : postIds) {
        	try {
            post = getById(postId).get();
            posts.add(post);
        	}
        	catch(Exception e) {}
        }
        return posts;
	}
	
}
