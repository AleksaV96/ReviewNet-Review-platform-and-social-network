package reviewnet.platform.domain.user.role;

import java.util.ArrayList;
import java.util.List;

import reviewnet.platform.domain.user.role.restriction.RestrictionType;

public class Moderator extends UserRole {
	
	List<String> moderated = new ArrayList<String>();
	
	public Moderator() {};
	
	public Moderator(String id, List<RestrictionType> restrictions, List<String> moderated) {
		super(id, restrictions);
		this.moderated = moderated;
	}

	public List<String> getModerated() {
		return moderated;
	}

	public void setModerated(List<String> moderated) {
		this.moderated = moderated;
	}
	
	public void addModerated(String moderated) {
		this.moderated.add(moderated);
	}
	
}
