package HnM.model.repository;

import HnM.model.entity.AdminEntity;
import HnM.model.entity.AuthorityEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityEntityRepository extends JpaRepository<AuthorityEntity, Integer> {
    //장은경 작성 : 권한 재부여 시 기존권한 삭제
    @Transactional
    @Modifying
    @Query(value="delete from Authority where gno_fk=:gno_fk",nativeQuery = true)
    int deleteAllByGno(int gno_fk);

    //장은경 작성 : 권한 부여 시 동일한 gno_fk 존재 여부 확인
    @Query(value = "select count(*) from Authority where gno_fk=:gno_fk", nativeQuery = true)
    int findCountByGno(int gno_fk);

    //장은경 작성 : gno로 scno 가져오기
    @Query(value="select scno_fk from authority where gno_fk=:gno", nativeQuery = true)
    List<Integer> findScnoByGno(int gno);

}
