package reviewnet.platform.domain.user;

import java.util.ArrayList;
import java.util.List;

public class Profile {
	
	private ProfileSettings profileSettings = new ProfileSettings(true, true, true);
	private List<String> profilePostIds = new ArrayList<String>();
	private List<String> posted = new ArrayList<String>();
	
	public Profile() {}

	public Profile(ProfileSettings profileSettings, List<String> profilePostIds) {
		this.profilePostIds = profilePostIds;
		this.profileSettings = profileSettings;
	}

	public List<String> getProfilePostIds() {
		return profilePostIds;
	}

	public void setProfilePostIds(List<String> profilePostIds) {
		this.profilePostIds = profilePostIds;
	}

	public List<String> getPosted() {
		return posted;
	}

	public void setPosted(List<String> posted) {
		this.posted = posted;
	}
	
	public void addProfilePostId(String id) {
		this.profilePostIds.add(id);
	}
	
	public void removeProfilePostId(String id) {
		this.profilePostIds.remove(id);
	}
	
	public void addPostedId(String id) {
		this.posted.add(id);
	}
	
	public void removePostedId(String id) {
		this.posted.remove(id);
	}

	public ProfileSettings getProfileSettings() {
		return profileSettings;
	}

	public void setProfileSettings(ProfileSettings profileSettings) {
		this.profileSettings = profileSettings;
	}
	
}
