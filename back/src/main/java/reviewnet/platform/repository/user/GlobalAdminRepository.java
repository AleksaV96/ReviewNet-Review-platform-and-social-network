package reviewnet.platform.repository.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.user.GlobalAdmin;


public interface GlobalAdminRepository extends MongoRepository<GlobalAdmin, String>{

}
