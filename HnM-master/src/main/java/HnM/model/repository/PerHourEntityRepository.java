package HnM.model.repository;

import HnM.model.entity.PerHourEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PerHourEntityRepository extends JpaRepository<PerHourEntity, Integer> {
    @Transactional
    @Modifying
    @Query(value="update perhour set tno_fk= null where tno_fk=:tno_fk", nativeQuery = true)
    void nullPerHour(int tno_fk);

    @Query(value = "select count(*) from term as t inner join perhour as ph inner join perhoursub as phs inner join schedule as sc\n" +
            "    on t.tno=ph.tno_fk and ph.phno=phs.phno_fk and phs.phsno=sc.phsno_fk where tno=:tno",nativeQuery = true)
    int findCustomByTnoForSchedule(int tno);

}
