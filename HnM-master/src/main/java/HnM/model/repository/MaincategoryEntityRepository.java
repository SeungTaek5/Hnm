package HnM.model.repository;

import HnM.model.entity.MaincategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaincategoryEntityRepository extends JpaRepository<MaincategoryEntity, Integer> {
}
