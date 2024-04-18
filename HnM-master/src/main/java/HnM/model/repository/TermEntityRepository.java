package HnM.model.repository;

import HnM.model.entity.ClassEntity;
import HnM.model.entity.TermEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TermEntityRepository extends JpaRepository<TermEntity,Integer> {
    @Transactional
    @Query(value="select * from term order by tno asc",nativeQuery = true)
    Page<TermEntity> selectTerm(Pageable pageable);

    @Transactional
    @Query(value="select * from term order by tno asc",nativeQuery = true)
    List<TermEntity> AllTerm();

    TermEntity findByTname(String termname);

    TermEntity findByTno(int tno);
}
