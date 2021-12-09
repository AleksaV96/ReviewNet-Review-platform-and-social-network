package reviewnet.platform.domain.user.role;

import java.util.List;

import reviewnet.platform.domain.user.role.restriction.RestrictionType;

public class Subscriber extends UserRole {
	
	public Subscriber() {};
	
	public Subscriber(String id, List<RestrictionType> restrictions) {
		super(id, restrictions);
	}

}
