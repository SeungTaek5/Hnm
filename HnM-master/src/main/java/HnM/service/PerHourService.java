
package HnM.service;

import HnM.model.entity.PerHourEntity;
import HnM.model.entity.TermEntity;
import HnM.model.repository.PerHourEntityRepository;
import HnM.model.repository.PerHourSubEntityRepository;
import HnM.model.repository.TermEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerHourService {
    @Autowired
    TermEntityRepository termEntityRepository;
    @Autowired
    PerHourEntityRepository perHourEntityRepository;

    public List<TermEntity> perhourwithterm() {
        return termEntityRepository.findAll();
    }

    // tno를 받아 phno를 반환
    public int tnoToPhno(int tno){
        int phno = 0;
        List<PerHourEntity> perHourEntityList = perHourEntityRepository.findAll();

        for(int i=0; i<perHourEntityList.size(); i++){
            PerHourEntity perHourEntity = perHourEntityList.get(i);
            if(perHourEntity.getTermEntity().getTno() == tno){
                return perHourEntity.getPhno();
            }
        }
        return phno;
    }

    // tno를 받아 schedule 유무 확인
    public boolean getTnoForFindSchedule(int tno){
        int result = perHourEntityRepository.findCustomByTnoForSchedule(tno);
        return result>0;
    }
}