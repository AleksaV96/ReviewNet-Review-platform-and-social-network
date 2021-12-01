package reviewnet.platform.repository.element;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.element.ReviewElement;



public interface ReviewElementRepository extends MongoRepository<ReviewElement, String>{

	Optional<ReviewElement> findByName(String name);

}
