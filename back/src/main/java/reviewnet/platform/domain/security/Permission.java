package reviewnet.platform.domain.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.user.role.UserRole;


@Document
public class Permission {

    @Id
    private String id;
    
    private String userId;

    private String authority;
    
    private UserRole roleDetails;

    public Permission() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

	public UserRole getRoleDetails() {
		return roleDetails;
	}

	public void setRoleDetails(UserRole roleDetails) {
		this.roleDetails = roleDetails;
	}
    
}
