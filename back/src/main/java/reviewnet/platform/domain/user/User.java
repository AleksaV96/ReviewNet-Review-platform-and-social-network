package reviewnet.platform.domain.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.security.AuthProvider;
import reviewnet.platform.domain.security.Permission;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;


@Document
public class User {
	
	@Id
	private String id;
	private String name;
	private String surname;
	private String username;
	private String password;
    private String email;
    private String imgUrl;
    private Profile profile = new Profile();
    private boolean logicDelete = false;
    private List<String> subscribed = new ArrayList<String>();
    private List<String> friends = new ArrayList<String>();
    private Permission permission = new Permission();
    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;
    
    public User() {}
    
    public User(String id, String name, String surname, String username, String password, String email, 
    		String imgUrl, Profile profile, boolean logicDelete, List<String> subscribed, List<String> friends,
    		Permission permission, AuthProvider provider) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
		this.email = email;
		this.profile = profile;
		this.imgUrl = imgUrl;
		this.logicDelete = logicDelete;
		this.subscribed = subscribed;
		this.friends = friends;
		this.permission = permission;
		this.provider = provider;
	}

    public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public boolean isLogicDelete() {
		return logicDelete;
	}

	public void setLogicDelete(boolean logicDelete) {
		this.logicDelete = logicDelete;
	}

	public List<String> getSubscribed() {
		return subscribed;
	}

	public void setSubscribed(List<String> subscribed) {
		this.subscribed = subscribed;
	}

	public List<String> getFriends() {
		return friends;
	}

	public void setFriends(List<String> friends) {
		this.friends = friends;
	}

	public Permission getPermission() {
		return permission;
	}

	public void setPermission(Permission permission) {
		this.permission = permission;
	}

	public AuthProvider getProvider() {
		return provider;
	}

	public void setProvider(AuthProvider provider) {
		this.provider = provider;
	}
	
	
	 
}
