package reviewnet.platform.repository.space;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.space.Forum;


public interface ForumRepository extends MongoRepository<Forum, String> {

}
