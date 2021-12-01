package reviewnet.platform.repository.space;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.space.Theme;


public interface ThemeRepository extends MongoRepository<Theme, String> {

}
