package reviewnet.platform.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import reviewnet.platform.domain.security.AuthProvider;
import reviewnet.platform.domain.user.User;

public class UserPrincipal implements OAuth2User, UserDetails {
	
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	    private String username;
	    private String password;
	    //private boolean emailVerified;
	    private Collection<? extends GrantedAuthority> authorities;
	    private Map<String, Object> attributes;


	    public UserPrincipal(String id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
	        this.id = id;
	        this.username = username;
	        this.password = password;
	        this.authorities = authorities;
	    }

	    public static UserPrincipal create(User user) {
	        if (user.getProvider() == AuthProvider.local) {
	            ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
	            authorities.add(new SimpleGrantedAuthority(user.getPermission().getAuthority()));
	            return new UserPrincipal(user.getId(), user.getUsername(), user.getPassword(), authorities);
	        }

	        return null;

	    }

	    public static UserPrincipal create(User user, Map<String, Object> attributes) {
	        UserPrincipal userPrincipal = UserPrincipal.create(user);
	        userPrincipal.setAttributes(attributes);
	        return userPrincipal;
	    }


	    public String getId() {
	        return id;
	    }


	    @Override
	    public String getPassword() {
	        return password;
	    }

	    @Override
	    public String getUsername() {
	        return username;
	    }

	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        return authorities;
	    }

	    public Map<String, Object> getAttributes() {
	        return attributes;
	    }

	    public void setAttributes(Map<String, Object> attributes) {
	        this.attributes = attributes;
	    }

	    public String getName() {
	        return String.valueOf(id);
	    }

}
