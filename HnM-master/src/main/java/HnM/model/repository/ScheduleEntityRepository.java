package HnM.model.repository;

import HnM.model.entity.ScheduleEntity;
import HnM.model.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ScheduleEntityRepository extends JpaRepository<ScheduleEntity, Integer> {

    // 시간표에 필요한 데이터 출력용
    @Query(value = "select stno, clno, etc, nname, fontcolor, backgroundcolor from perhour as ph inner join perhoursub as phs inner join\n" +
            "schedule as sc inner join scheduletime as st inner join class as cl inner join nickname as n on ph.phno=phs.phno_fk and\n" +
            "phs.nno_fk=n.nno and sc.clno_fk=cl.clno and sc.phsno_fk=phs.phsno and sc.stno_fk=st.stno where phno = :phno",nativeQuery = true)
    List<Map<Object, Object>> findCustomByPhnoForSchedule(int phno);
}
