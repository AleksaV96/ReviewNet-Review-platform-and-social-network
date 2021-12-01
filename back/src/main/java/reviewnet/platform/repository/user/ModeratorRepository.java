package reviewnet.platform.repository.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.user.Moderator;


public interface ModeratorRepository extends MongoRepository<Moderator, String>{

}
