package reviewnet.platform.repository.post.type;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.post.type.ReviewPost;

public interface ReviewPostRepository extends MongoRepository<ReviewPost, String>{

}
