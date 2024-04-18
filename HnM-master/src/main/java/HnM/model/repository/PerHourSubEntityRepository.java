package HnM.model.repository;

import HnM.model.entity.NicknameEntity;
import HnM.model.entity.PerHourSubEntity;
import HnM.model.entity.TermEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface PerHourSubEntityRepository extends JpaRepository<PerHourSubEntity, Integer> {
    @Query(value = "select * from perhoursub where phno_fk = :phno", nativeQuery = true)
    List<PerHourSubEntity> findByPhno(int phno);

    @Query(value = "select perhour, nname, phsno from perhoursub as p inner join nickname as n on p.nno_fk = n.nno; ", nativeQuery = true)
    List<Map<Object,Object>> findCustom();



    //장은경 작성 : 관리자 삭제 시 관리자와 연결된 내역 삭제(단방향이라 직접해야됨)
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "delete from perhoursub where nno_fk=:nno_fk" ,nativeQuery = true)
    int deleteAllByNno_fk(int nno_fk);


    Optional<PerHourSubEntity> findByTermEntityAndNicknameEntity(TermEntity termEntity, NicknameEntity nicknameEntity);

    @Query("SELECT ph FROM PerHourSubEntity ph WHERE ph.termEntity.tno = :termId")
    List<PerHourSubEntity> findByTermId(@Param("termId") Long termId);

    @Transactional
    @Modifying
    @Query(value="update perhoursub set tno_fk= null where tno_fk=:tno_fk", nativeQuery = true)
    void nullPerHoursub(int tno_fk);
}
