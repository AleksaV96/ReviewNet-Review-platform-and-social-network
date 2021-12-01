package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.post.Reply;
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
	
	public Iterable<Reply> getAll() {
		return replyRepository.findAll();
	}
	
	public Optional<Reply> getById(String id){
		return replyRepository.findById(id);
	}
	
	public Optional<Post> addReply(String id, Reply reply) {
		replyRepository.save(reply);
		Optional<Post> selectedPost = postService.getById(id);
		selectedPost.get().getReplies().add(reply.getId());
		postService.updatePost(id, selectedPost.get());
		return selectedPost;
	}
	
	public void removeReply(String id) {
		Optional<Reply> post = replyRepository.findById(id);
		replyRepository.delete(post.get());
	}
	
	public Iterable<Reply> getPostReplies(String id) {
        List<String> replyIds;
        List<Reply> repliesList = new ArrayList<Reply>();
        Reply reply;

        Optional<Post> selectedPost = postRepository.findById(id);
        replyIds = selectedPost.get().getReplies();
        for (String rplId : replyIds) {
        	reply = getById(rplId).get();
        	repliesList.add(reply);
        }
        return repliesList;
	}
}

