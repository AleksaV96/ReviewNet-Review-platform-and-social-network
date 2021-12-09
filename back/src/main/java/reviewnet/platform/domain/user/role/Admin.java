package reviewnet.platform.domain.user.role;

import java.util.List;

import reviewnet.platform.domain.user.role.restriction.RestrictionType;

public class Admin extends UserRole{
	
	public Admin() {}
	
	public Admin(String id, List<RestrictionType> restrictions) {
		super(id, restrictions);
	}
}
