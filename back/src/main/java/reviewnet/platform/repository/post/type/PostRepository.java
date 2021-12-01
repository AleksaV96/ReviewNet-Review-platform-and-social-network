package reviewnet.platform.repository.post.type;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.post.Post;

public interface PostRepository extends MongoRepository<Post, String>{

}
