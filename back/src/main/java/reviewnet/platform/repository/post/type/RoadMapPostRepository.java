package reviewnet.platform.repository.post.type;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.post.type.RoadMapPost;

public interface RoadMapPostRepository extends MongoRepository<RoadMapPost, String>{

}
