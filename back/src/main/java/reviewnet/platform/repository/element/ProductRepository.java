package reviewnet.platform.repository.element;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.element.Product;


public interface ProductRepository extends MongoRepository<Product, String>{

}
