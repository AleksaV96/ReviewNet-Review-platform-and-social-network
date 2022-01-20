package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.domain.space.Forum;
import reviewnet.platform.domain.space.Theme;
import reviewnet.platform.repository.space.ThemeRepository;

@Service
public class ThemeService {
	
	@Autowired 
	ThemeRepository themeRepository;
	
	@Autowired
	AbstractPostSpaceService abstractPostSpaceService;
	
	@Autowired 
	PostService postService;
	
	public Optional<Theme> getById(String id){
		return themeRepository.findById(id);
	}
	
	public void delTheme(Theme theme) {
		themeRepository.delete(theme);
	}
	
	public Optional<AbstractPostSpace> addTheme(String id, Theme theme){
		Optional<AbstractPostSpace> selectedDomain = abstractPostSpaceService.getById(id);
		theme.setParentId(selectedDomain.get().getId());
		theme.setElementId(selectedDomain.get().getParentId());
		themeRepository.save(theme);
		((Forum) selectedDomain.get()).getThemeIds().add(theme.getId());
		abstractPostSpaceService.updateAbstractPostSpace(id, selectedDomain.get());
		return selectedDomain;
	}
	
	public void deleteTheme(String id) {
		Optional<Theme> theme = themeRepository.findById(id);
		themeRepository.delete(theme.get());
	}
	
	public void updateTheme(String id, Theme theme) {
		Optional<Theme> thm = themeRepository.findById(id);
		if(thm.isPresent()) {
			theme.setId(thm.get().getId());
			themeRepository.save(theme);
		}
	}
	
	public Iterable<Theme> getForumThemes(String id) {
		List<String> themeIds;
        List<Theme> themes = new ArrayList<Theme>();
        Theme theme;

        Optional<AbstractPostSpace> selectedForum = abstractPostSpaceService.getById(id);
        themeIds = ((Forum) selectedForum.get()).getThemeIds();
        for (String themeId : themeIds) {
        	try {
        	theme = getById(themeId).get();
        	themes.add(theme);
        	}
        	catch(Exception e) {}
        }
        List<Theme> themesInOrder = themes.subList(0, themes.size());
        Collections.reverse(themesInOrder);
        return themesInOrder;
	}
	
	public Iterable<Post> getThemePosts(String id) {
		List<String> postIds;
        List<Post> posts = new ArrayList<Post>();
        Post post;

        Optional<Theme> selectedTheme = getById(id);
        postIds = selectedTheme.get().getPostCollection();
        for (String postId : postIds) {
        	try {
            post = postService.getById(postId).get();
            posts.add(post);
        	}
        	catch(Exception e) {}
        }
        List<Post> postsInOrder = posts.subList(0, posts.size());
        Collections.reverse(postsInOrder);
        return postsInOrder;
	}


}
