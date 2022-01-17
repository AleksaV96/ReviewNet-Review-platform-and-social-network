package reviewnet.platform.domain.user;

public class ProfileSettings {
	
	private boolean addFriend;
	private boolean showFriends;
	private boolean showSubscriptions;
	
	public ProfileSettings() {}

	public ProfileSettings(boolean addFriend, boolean showFriends, boolean showSubscriptions) {
		this.addFriend = addFriend;
		this.showFriends = showFriends;
		this.showSubscriptions = showSubscriptions;
	}

	public boolean isAddFriend() {
		return addFriend;
	}

	public void setAddFriend(boolean addFriend) {
		this.addFriend = addFriend;
	}

	public boolean isShowFriends() {
		return showFriends;
	}

	public void setShowFriends(boolean showFriends) {
		this.showFriends = showFriends;
	}

	public boolean isShowSubscriptions() {
		return showSubscriptions;
	}

	public void setShowSubscriptions(boolean showSubscriptions) {
		this.showSubscriptions = showSubscriptions;
	}
	
}
