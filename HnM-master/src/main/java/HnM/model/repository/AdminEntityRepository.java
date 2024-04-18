package HnM.model.repository;

import HnM.model.entity.AdminEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AdminEntityRepository extends JpaRepository<AdminEntity, Integer> {

    //장은경 작성 : 관리자 정보 추출
    @Query(value="select ano, aid, aname, aphone, aemail, gname, gno_fk from \n" +
            "(admin as a inner join `group` as g on a.gno_fk=g.gno);" ,nativeQuery = true)
    List<Map<Object, Object>> findAllCustom();

    //장은경 작성 : 관리자 그룹 update
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update admin set gno_fk=:gno_fk where ano=:ano" ,nativeQuery = true)
    int updateGroup(int ano, int gno_fk);

    //장은경 작성 : group삭제 시 admin gno_fk=null로 변경
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update admin set gno_fk=1 where gno_fk=:gno_fk" ,nativeQuery = true)
    int updateGno_fkSetNull(int gno_fk);

    @Query(value = "select * from admin where aid = :aid",nativeQuery = true)
    AdminEntity findByAid(String aid);

}
