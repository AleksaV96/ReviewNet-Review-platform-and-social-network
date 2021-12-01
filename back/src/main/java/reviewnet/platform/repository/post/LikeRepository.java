package reviewnet.platform.repository.post;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.post.Like;



public interface LikeRepository extends MongoRepository<Like, String>{

}
