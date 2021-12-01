package reviewnet.platform.repository.space;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.space.AbstractPostSpace;

public interface AbstractPostSpaceRepository extends MongoRepository<AbstractPostSpace, String>{

}
