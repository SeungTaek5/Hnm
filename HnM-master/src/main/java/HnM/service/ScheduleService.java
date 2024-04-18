package HnM.service;

import HnM.model.dto.ClassDto;
import HnM.model.dto.PerHourSubDto;
import HnM.model.entity.*;
import HnM.model.repository.ClassEntityRepository;
import HnM.model.repository.PerHourEntityRepository;
import HnM.model.repository.PerHourSubEntityRepository;
import HnM.model.repository.ScheduleEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ScheduleService {
    @Autowired
    ScheduleEntityRepository scheduleEntityRepository;

    @Autowired
    PerHourSubEntityRepository perHourSubEntityRepository;
    @Autowired
    PerHourEntityRepository perHourEntityRepository;
    @Autowired
    ClassEntityRepository classEntityRepository;

    // 시수디테일 가져오기
    public List<PerHourSubDto> doGetFindPerHourSub(int phno){
        List<PerHourSubDto> result = new ArrayList<>();
        perHourSubEntityRepository.findByPhno(phno).forEach((perHourSubEntity) -> {
            PerHourSubDto perHourSubDto = perHourSubEntity.toDto();
            perHourSubDto.setNickname(perHourSubEntity.getNicknameEntity().getNname());
            result.add(perHourSubDto);
        });
        return result;
    }

    // 반 가져오기
    public List<ClassDto> doGetfindTermAndClass(int phno) {
        List<ClassDto> result = new ArrayList<>();
        Optional<PerHourEntity> optionalPerHourEntity = perHourEntityRepository.findById(phno);
        if (optionalPerHourEntity.isPresent()){
            PerHourEntity perHourEntity = optionalPerHourEntity.get();
            List<ClassEntity> classEntityList = classEntityRepository.findByTno(perHourEntity.getTermEntity().getTno());
            classEntityList.forEach(classEntity -> {
                result.add(classEntity.toDto());
            });
        }


        return result;
    }

    // 시간표 등록하기
    public boolean doPostScheduleDo(List<Map<String, String>> dataList){
        AtomicInteger count = new AtomicInteger();
        dataList.forEach(data->{
            ClassEntity classEntity = ClassEntity.builder().clno(Integer.parseInt(data.get("clno"))).build();

            ScheduleTimeEntity scheduleTimeEntity = ScheduleTimeEntity.builder().stno(Integer.parseInt(data.get("stno"))).build();
            ScheduleEntity scheduleEntity = ScheduleEntity.builder()
                    .etc(data.get("etc"))
                    .classEntity(classEntity)
                    .scheduleTimeEntity(scheduleTimeEntity)
                    .build();
            if(data.get("phsno") != null){
                PerHourSubEntity perHourSubEntity = PerHourSubEntity.builder().phsno(Integer.parseInt(data.get("phsno"))).build();
                scheduleEntity.setPerHourSubEntity(perHourSubEntity);
            }
            scheduleEntityRepository.save(scheduleEntity);
            count.getAndIncrement();
        });
        if(dataList.size() == count.get()){
            return true;
        }
        else {
            return false;
        }
    }

    public List<Map<Object, Object>> doGetSchedule(int phno){

        List<Map<Object, Object>> result = scheduleEntityRepository.findCustomByPhnoForSchedule(phno);

        return result;
    }
}
