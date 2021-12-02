package reviewnet.platform.service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.security.Permission;
import reviewnet.platform.repository.security.PermissionRepository;

@Service
public class PermissionService {
	
	@Autowired
	private PermissionRepository permissionRepository;
	
	public void addSubscriberPermission(Permission permission) {
		permission.setAuthority("ROLE_SUBSCRIBER");
        permissionRepository.save(permission);
	}
	
	public void addModeratorPermission(Permission permission) {
		permission.setAuthority("ROLE_MODERATOR");
        permissionRepository.save(permission);
	}
	
	public void addAdminPermission(Permission permission) {
		permission.setAuthority("ROLE_ADMIN");
        permissionRepository.save(permission);
	}
}
