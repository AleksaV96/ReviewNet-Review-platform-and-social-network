package reviewnet.platform.repository.space;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.space.ComplainSpace;

public interface ComplainSpaceRepository extends MongoRepository<ComplainSpace, String>{

}
