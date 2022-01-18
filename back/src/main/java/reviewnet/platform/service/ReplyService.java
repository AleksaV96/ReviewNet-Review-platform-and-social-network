package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.post.Reply;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.repository.post.ReplyRepository;
import reviewnet.platform.repository.post.type.PostRepository;

@Service
public class ReplyService {
	
	@Autowired
	ReplyRepository replyRepository;
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired 
	PostService postService;
	
	@Autowired
	UserAccService userService;
	
	public Iterable<Post> getAll() {
		return postRepository.findAll();
	}
	
	public Optional<Post> getById(String id){
		return postRepository.findById(id);
	}
	
	public Optional<Post> addReply(String id, Reply reply) {
		Optional<User> author = userService.findByUsername(reply.getAuthorUsername());
		reply.setAuthor(author.get());
		postRepository.save(reply);
		Optional<Post> selectedPost = postService.getById(id);
		selectedPost.get().getReplies().add(reply.getId());
		postService.updatePost(id, selectedPost.get());
		return selectedPost;
	}
	
	public void removeReply(String id) {
		Optional<Post> post = postRepository.findById(id);
		postRepository.delete(post.get());
	}
	
	public Iterable<Post> getPostReplies(String id) {
        List<String> replyIds = new ArrayList<String>();
        List<Post> repliesList = new ArrayList<Post>();
        Post reply;

        Optional<Post> selectedPost = postRepository.findById(id);
        try {
        replyIds = selectedPost.get().getReplies();
        }
        catch(Exception e) {}
        for (String rplId : replyIds) {
        	try {
        	reply = getById(rplId).get();
        	repliesList.add(reply);
        	}
        	catch(Exception e) {}
        }
        List<Post> repliesInOrder = repliesList.subList(0, repliesList.size());
        Collections.reverse(repliesInOrder);
        return repliesInOrder;
	}
}

