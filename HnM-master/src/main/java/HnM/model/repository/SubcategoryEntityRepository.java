package HnM.model.repository;

import HnM.model.entity.SubcategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SubcategoryEntityRepository extends JpaRepository<SubcategoryEntity, Integer> {
    @Query(value = "select scno, scname from subcategory where mcno_fk=:mcno_fk",nativeQuery = true)
    List<Map<Object,Object>> findAllByMcno(int mcno_fk);

}
