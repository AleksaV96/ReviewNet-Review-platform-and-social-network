package reviewnet.platform.domain.security;

public class PasswordChangeAttempt {
	
	private String oldPassword;
	private String newPassword;
	
	public PasswordChangeAttempt() {}
	
	public PasswordChangeAttempt(String oldPassword, String newPassword) {
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
}
