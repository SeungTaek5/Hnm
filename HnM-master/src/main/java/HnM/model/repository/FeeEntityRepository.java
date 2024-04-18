package HnM.model.repository;

import HnM.model.entity.FeeEntity;
import HnM.model.entity.StudentEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface FeeEntityRepository extends JpaRepository<FeeEntity,Integer> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "delete from fee where sno_fk=:sno_fk" ,nativeQuery = true)
    int deleteAllBysno_fk(int sno_fk);

}
