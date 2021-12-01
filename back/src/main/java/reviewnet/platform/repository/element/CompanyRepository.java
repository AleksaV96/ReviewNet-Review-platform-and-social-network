package reviewnet.platform.repository.element;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.element.Company;


public interface CompanyRepository extends MongoRepository<Company, String>{

}
