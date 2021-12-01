package reviewnet.platform.repository.post.type;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.post.type.ComplainPost;

public interface ComplainPostRepository extends MongoRepository<ComplainPost, String>{

}
