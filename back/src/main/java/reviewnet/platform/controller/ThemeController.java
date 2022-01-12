package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.space.Theme;
import reviewnet.platform.service.ThemeService;

@Controller
@RequestMapping("/reviewElement")
public class ThemeController {
	
	@Autowired 
	ThemeService themeService;
	
	@GetMapping(value="/postSpace/theme/{id}")
	public ResponseEntity<Theme> getThemeById(@PathVariable String id) {
		Optional<Theme> themeData = themeService.getById(id);
			if(themeData.isPresent()) {
				return new ResponseEntity<Theme>(themeData.get(), HttpStatus.OK);
	}
			return new ResponseEntity<Theme>(HttpStatus.NOT_FOUND);
	}
	
	
	@GetMapping(value = "/postSpace/{id}/themes")
    public ResponseEntity<Iterable<Theme>> getForumThemes(@PathVariable String id) {
        return new ResponseEntity<Iterable<Theme>>(themeService.getForumThemes(id), HttpStatus.OK);
    }
	
	@GetMapping(value = "/postSpace/theme/{id}/feed")
    public ResponseEntity<Iterable<Post>> getThemePosts(@PathVariable String id) {
        return new ResponseEntity<Iterable<Post>>(themeService.getThemePosts(id), HttpStatus.OK);
    }
	
	@PostMapping(value="/postSpace/{id}/create-theme")
	public ResponseEntity<Theme> creteTheme(@PathVariable String id, @RequestBody Theme theme){
		themeService.addTheme(id, theme);
		return new ResponseEntity<Theme>(theme, HttpStatus.CREATED);
	}
	
	@DeleteMapping(value="/postSpace/theme/{id}/remove")
    public ResponseEntity<Theme> removeTheme(@PathVariable String id){
        try {
        	themeService.deleteTheme(id);
        }catch(Exception e){
            return new ResponseEntity<Theme>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Theme>(HttpStatus.NO_CONTENT);
    }

}
