package reviewnet.platform.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.mongodb.BasicDBObject;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.post.Reply;
import reviewnet.platform.repository.post.LikeRepository;
import reviewnet.platform.repository.post.ReplyRepository;
import reviewnet.platform.repository.post.type.PostRepository;


@Service
public class LikeService {
	
	@Autowired
	LikeRepository likeRepository;
	
	@Autowired 
	PostRepository postRepository;
	
	@Autowired
	ReplyRepository replyRepository;
	
	@Autowired
    private MongoTemplate mongoTemplate;
	
	public Iterable<Like> getAll() {
		return likeRepository.findAll();
	}
	
	public Optional<Like> getById(String id){
		return likeRepository.findById(id);
	}
	
	public void like(Like like) {
		likeRepository.save(like);
	}
	
	public void deleteLike(String id) {
		Optional<Like> like = likeRepository.findById(id);
		likeRepository.delete(like.get());
	}
	
	public void likePost(String postId, String username, String type, int value) {
		Query query = new Query();
		Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            Like like = new Like();
            like.setLikeCreatorName(username);
            like.setType(type);
            like.setValue(value);
            query.addCriteria(Criteria.where("id").is(postId));
            mongoTemplate.updateFirst(query, new Update().push("likes", like), Post.class);
        }
    }

	public void unlikePost(String postId, String username, String type) {
		Query query = new Query();
        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            query.addCriteria(Criteria.where("likes").elemMatch(Criteria.where("likeCreatorName").is(username).and("type").is(type)));
            Update update = new Update().pull("likes", new BasicDBObject("likeCreatorName", username));
            mongoTemplate.updateMulti(query, update, Post.class);
        }
    }
	
	public void likeReply(String replyId, String username, String type, int value) {
		Query query = new Query();
		Optional<Reply> reply = replyRepository.findById(replyId);
        if (reply.isPresent()) {
            Like like = new Like();
            like.setLikeCreatorName(username);
            like.setType(type);
            like.setValue(value);
            query.addCriteria(Criteria.where("id").is(replyId));
            mongoTemplate.updateFirst(query, new Update().push("likes", like), Reply.class);
        }
    }
	
	public void unlikeReply(String replyId, String username, String type) {
		Query query = new Query();
        Optional<Reply> reply = replyRepository.findById(replyId);
        if (reply.isPresent()) {
            query.addCriteria(Criteria.where("likes").elemMatch(Criteria.where("likeCreatorName").is(username).and("type").is(type)));
            Update update = new Update().pull("likes", new BasicDBObject("likeCreatorName", username));
            mongoTemplate.updateMulti(query, update, Reply.class);
        }
    }
	
}
