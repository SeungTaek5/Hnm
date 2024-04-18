package HnM.model.repository;

import HnM.model.entity.AdminEntity;
import HnM.model.entity.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupEntityRepository extends JpaRepository<GroupEntity, Integer> {
}
