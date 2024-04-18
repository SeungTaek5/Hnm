package HnM.model.repository;

import HnM.model.dto.CounselDto;
import HnM.model.entity.CounselEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CounselEntityRepository extends JpaRepository<CounselEntity, Integer> {

     //상담리스트에서 검색
    @Transactional
    @Query(value = "select c.cno, c.cdate as cdate,s.sid, s.sname,c.cdivision, c.ctitle, c.centerdate, a.aname , c.ano_fk,c.sno_fk , c.ccontent,c.udate,s.smajor" +
            " from student s join counsel c on s.sno = c.sno_fk" +
            " join admin a on c.ano_fk = a.ano " +
            " where s.sid like %:sid% and s.sname like %:sname% and c.ctitle like %:ctitle%", nativeQuery = true)
    Page< Map<Object , Object> > SearchByCounsel( String sid, String sname, String ctitle , Pageable pageable );

    //장은경 작성 : 관리자 삭제 시 관리자와 연결된 내역 삭제(단방향이라 직접해야됨)
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "delete from counsel where ano_fk=:ano_fk" ,nativeQuery = true)
    int deleteAllByAno_fk(int ano_fk);

    //장은경 작성 : 상담내역 개별출력
    @Query(value = "select sname,sid,sgender,smajor,sclass,aname,centerdate,cdivision,ctitle,ccontent from counsel as c inner join student as s inner join admin as a\n" +
            "on c.sno_fk=s.sno and c.ano_fk=a.ano where c.cno=:cno",nativeQuery = true)
    Map<Object, Object> findByCno(int cno);

    //장은경 작성 : 상담글쓴이 관리자번호 가져오기
    @Query(value = "select ano_fk from counsel where cno=:cno",nativeQuery = true)
    int findAno_fkByCno(int cno);

    //장은경 작성 : 상담 수정 시 기존 상담내용 출력
    @Query(value = "select ctitle, ccontent, centerdate, cdivision from counsel where cno=:cno",nativeQuery = true)
    Map<Object, Object> findInfoByCno(int cno);

    //장은경 작성 : 학생 개별 상담리스트 출력
    @Query(value = "select cno, centerdate, cdivision, ctitle, aname from \n" +
            "counsel as c inner join admin as a \n" +
            "on c.ano_fk=a.ano\n" +
            "where c.sno_fk=:sno_fk " +
            "order by centerdate desc",nativeQuery = true)
    Page<Map<Object, Object>> findCustomBySno_fk(int sno_fk, Pageable pageable);

    //장은경 작성 : 상담리스트 엑셀 출력용
    @Query(value = "select centerdate, cdivision, ctitle, aname, ccontent\n" +
            "from counsel c inner join admin a \n" +
            "on c.ano_fk=a.ano\n" +
            "where sno_fk=:sno and centerdate >= :startdate and centerdate <= :enddate " +
            "order by centerdate desc",nativeQuery = true)
    List<Map<Object, Object>> findCustomBySnoForExel(Object sno, Object startdate, Object enddate);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "delete from counsel where sno_fk=:sno_fk" ,nativeQuery = true)
    int deleteAllBysno_fk(int sno_fk);

}
