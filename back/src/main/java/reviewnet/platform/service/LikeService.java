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
import reviewnet.platform.repository.post.LikeRepository;
import reviewnet.platform.repository.post.type.PostRepository;


@Service
public class LikeService {
	
	Query query = new Query();
	
	@Autowired
	LikeRepository likeRepository;
	
	@Autowired 
	PostRepository postRepository;
	
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
	
	public void likePost(String userId, String postId) {
		Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            Like like = new Like();
            like.setLikeCreator(userId);
            like.setValue(1);
            query.addCriteria(Criteria.where("id").is(postId));
            mongoTemplate.updateFirst(query, new Update().push("likes", like), Post.class);
        }
    }

    public void unlikePost(String userId, String postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            query.addCriteria(Criteria.where("likes").elemMatch(Criteria.where("owner").is(userId)));
            Update update = new Update().pull("likes", new BasicDBObject("owner", userId));
            mongoTemplate.updateMulti(query, update, Post.class);
        }
    }
}
