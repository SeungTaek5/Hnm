package HnM.service;

import HnM.model.dto.PerHourSubCreateDto;
import HnM.model.entity.NicknameEntity;
import HnM.model.entity.PerHourEntity;
import HnM.model.entity.PerHourSubEntity;
import HnM.model.entity.TermEntity;
import HnM.model.repository.NicknameEntityRepository;
import HnM.model.repository.PerHourEntityRepository;
import HnM.model.repository.PerHourSubEntityRepository;
import HnM.model.repository.TermEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PerHourSubService {
    @Autowired
    private PerHourSubEntityRepository perHourSubEntityRepository;
    @Autowired
    private TermEntityRepository termEntityRepository;
    @Autowired
    private NicknameEntityRepository nicknameEntityRepository;
    @Autowired
    private PerHourEntityRepository perHourEntityRepository;
//    public boolean postRegistDo(Map<String, String> data){
//        System.out.println("perHourSubDto = " + data);
//
//        // 클라이언트에서 전송된 데이터를 이용하여 PerHourSubEntity 객체 생성
//        TermEntity term = termEntityRepository.findByTname(data.get("termname"));
//        PerHourSubEntity perHourSubEntity = PerHourSubEntity.builder()
//                .termEntity(term)
//                .perhour(Integer.parseInt(data.get("perhour")))
//                .build();
//        // 데이터베이스에 저장
//        PerHourSubEntity perHourSub = perHourSubEntityRepository.save(perHourSubEntity);
//
//        // 저장 결과에 따른 응답
//        return perHourSub.getPhsno() > 0;
//    }

    public boolean perhourRegistDo(PerHourSubCreateDto perHourSubCreateDto){
        PerHourEntity perHourEntity = perHourEntityRepository.save(PerHourEntity.builder().termEntity(TermEntity.builder().tno(perHourSubCreateDto.getTno()).build()).build());
        List<PerHourSubEntity> perHourSubEntityList = perHourSubCreateDto.getPerHourSubDtoList().stream().map(
                perHourSubDto -> {
                    PerHourSubEntity perHourSubEntity = perHourSubDto.toEntity();
                    perHourSubEntity.setPerHourEntity(perHourEntity);
                    perHourSubEntity.setNicknameEntity(NicknameEntity.builder().nno(perHourSubDto.getNno()).build());
                    return perHourSubEntity;
                }
        ).toList();
        System.out.println(perHourSubEntityList);
        List<PerHourSubEntity> result = perHourSubEntityRepository.saveAll(perHourSubEntityList);
        return result.size() > 0;

    }

    // 모든 닉네임 가져오기
    public List<NicknameEntity> getAllNicknames() {
        return nicknameEntityRepository.findAll();
    }

    public List<Map<Object, Object>> getRegistDo(){
        return perHourSubEntityRepository.findCustom();
    }

//    List<PerHourSubEntity> getPerHourByTermId(int phno){
//        return perHourSubEntityRepository.findByTermId(phno);
//    }
}