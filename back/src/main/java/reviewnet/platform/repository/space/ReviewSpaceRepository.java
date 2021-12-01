package reviewnet.platform.repository.space;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.space.ReviewSpace;

public interface ReviewSpaceRepository extends MongoRepository<ReviewSpace, String>{

}
