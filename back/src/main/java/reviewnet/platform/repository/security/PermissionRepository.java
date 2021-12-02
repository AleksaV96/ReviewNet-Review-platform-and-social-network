package reviewnet.platform.repository.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import reviewnet.platform.domain.security.Permission;

@Repository
public interface PermissionRepository extends MongoRepository<Permission, String>{
	
}
