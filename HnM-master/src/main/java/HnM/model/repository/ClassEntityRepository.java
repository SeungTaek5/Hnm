package HnM.model.repository;

import HnM.model.entity.ClassEntity;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassEntityRepository extends JpaRepository<ClassEntity,Integer> {
    @Transactional
    @Modifying
    @Query(value="delete from class where tno_fk=:tno_fk",nativeQuery = true)
    int deleteAllBytno(int tno_fk);

    @Transactional
    @Query(value = "select * from class where tno_fk = :tno", nativeQuery = true)
    List<ClassEntity> findByTno(int tno);

    @Transactional
    @Query(value = "select * from class where tno_fk = :tno", nativeQuery = true)
    ClassEntity findByClass(int tno);

    @Transactional
    @Query(value = "select * from class where tno_fk = :tno and clname=:clname",nativeQuery = true)
    ClassEntity Duplicatetest(int tno,String clname);
}
