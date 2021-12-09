package reviewnet.platform.domain.user.role;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.user.role.restriction.RestrictionType;

@Document
public class UserRole {
	
	@Id
	private String id;
	
	private List<RestrictionType> restrictions = new ArrayList<RestrictionType>();
	
	public UserRole() {};
	
	public UserRole(String id, List<RestrictionType> restrictions) {
		this.id = id;
		this.restrictions = restrictions;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<RestrictionType> getRestrictions() {
		return restrictions;
	}

	public void setRestrictions(List<RestrictionType> restrictions) {
		this.restrictions = restrictions;
	}
	
	public void addRestriction(RestrictionType restriction) {
		this.restrictions.add(restriction);
	}
	
	public void removeRestriction(RestrictionType restriction) {
		this.restrictions.remove(restriction);
	}
	
	
	
}
