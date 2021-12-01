package reviewnet.platform.domain.space;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Forum extends AbstractPostSpace {

	private List<String> themeIds = new ArrayList<String>();
	
	public Forum() {
	}
	
	public Forum(String id, String parentId, String name, String type, List<String> postCollection, List<String> themeIds) {
		super(id, parentId, name, type, postCollection);
		this.themeIds = themeIds;
	}

	public List<String> getThemeIds() {
		return themeIds;
	}

	public void setThemeIds(List<String> themeIds) {
		this.themeIds = themeIds;
	}

}
