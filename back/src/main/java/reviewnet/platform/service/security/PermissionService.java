package reviewnet.platform.service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.security.Permission;
import reviewnet.platform.repository.security.PermissionRepository;

import reviewnet.platform.domain.user.role.Subscriber;
import reviewnet.platform.domain.user.role.Moderator;
import reviewnet.platform.domain.user.role.Admin;

@Service
public class PermissionService {
	
	@Autowired
	private PermissionRepository permissionRepository;
	
	public void deletePermission(Permission permission) {
		permissionRepository.delete(permission);
	}
	
	public void addSubscriberPermission(Permission permission, String userId) {
		permission.setUserId(userId);
		permission.setAuthority("ROLE_SUBSCRIBER");
		permission.setRoleDetails(new Subscriber());
        permissionRepository.save(permission);
	}
	
	public void addModeratorPermission(Permission permission, String userId) {
		permission.setUserId(userId);
		permission.setAuthority("ROLE_MODERATOR");
		permission.setRoleDetails(new Moderator());
        permissionRepository.save(permission);
	}
	
	public void addAdminPermission(Permission permission, String userId) {
		permission.setUserId(userId);
		permission.setAuthority("ROLE_ADMIN");
		permission.setRoleDetails(new Admin());
        permissionRepository.save(permission);
	}
}
