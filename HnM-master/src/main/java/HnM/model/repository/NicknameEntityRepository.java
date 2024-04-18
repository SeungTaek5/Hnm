package HnM.model.repository;

import HnM.model.entity.AdminEntity;
import HnM.model.entity.NicknameEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NicknameEntityRepository extends JpaRepository<NicknameEntity, Integer> {
    //장은경 작성 : ano_fk 존재여부 조회
    @Query(value="select * from nickname where ano_fk=:ano_fk",nativeQuery = true)
    NicknameEntity findCountByAno_fk(int ano_fk);

    @Query(value = "select * from nickname where nname = :nname", nativeQuery = true)
    NicknameEntity findByNickname(String nname);

    //장은경 작성 : 관리자 삭제 시 관리자와 연결된 내역 삭제(단방향이라 직접해야됨)
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "delete from nickname where ano_fk=:ano_fk" ,nativeQuery = true)
    int deleteAllByAno_fk(int ano_fk);

    NicknameEntity findByNno(int nicknameId);
}
