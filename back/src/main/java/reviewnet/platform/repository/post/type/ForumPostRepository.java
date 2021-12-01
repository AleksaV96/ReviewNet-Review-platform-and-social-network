package reviewnet.platform.repository.post.type;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.post.type.ForumPost;

public interface ForumPostRepository extends MongoRepository<ForumPost, String> {

}
