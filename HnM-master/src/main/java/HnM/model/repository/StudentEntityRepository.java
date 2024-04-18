package HnM.model.repository;

import HnM.model.entity.StudentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Repository
public interface StudentEntityRepository extends JpaRepository<StudentEntity, Integer> {
    Page<StudentEntity> findBySnameContaining(String sname , Pageable pageable);

    //장은경 작성 : 상담 등록 시 학생 이름으로 학생정보 출력
    @Query(value = "select sname, sid, smajor, sclass, sparentphone, sclass, sgender from student where sname=:sname " ,nativeQuery = true)
    List<Map<Object,Object>> findBySname(String sname);

    //장은경 작성 : sid로 학생정보 조회
    @Query(value="select * from student where sid=:sid",nativeQuery = true)
    StudentEntity findBySid(String sid);

    //장은경 작성 : 상담 수정 시 학생 번호로 학생정보 출력
    @Query(value = "select sname, sid, smajor, sclass, sparentphone, sclass, sgender from student where sno=:sno_fk " ,nativeQuery = true)
    Map<Object,Object> findBySno_fk(int sno_fk);
}
