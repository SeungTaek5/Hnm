package HnM.service;

import HnM.model.dto.ClassDto;
import HnM.model.dto.PageDto;
import HnM.model.dto.TermDto;
import HnM.model.entity.ClassEntity;
import HnM.model.entity.TermEntity;
import HnM.model.repository.ClassEntityRepository;
import HnM.model.repository.PerHourEntityRepository;
import HnM.model.repository.PerHourSubEntityRepository;
import HnM.model.repository.TermEntityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TermService {
    @Autowired private TermEntityRepository termEntityRepository;

    @Autowired private ClassEntityRepository classEntityRepository;

    @Autowired private PerHourEntityRepository perHourEntityRepository;

    @Autowired private PerHourSubEntityRepository perHourSubEntityRepository;

    //학기 등록
    @Transactional
    public boolean postTerm(Map<String, Object> info){
        String tname = (String) info.get("tname");
        ArrayList<String> classList=(ArrayList<String>) info.get("classList");
        TermEntity termEntity =new TermEntity();
        termEntity.setTname(tname);
        TermEntity savedTerm= termEntityRepository.save(termEntity);
        int id =savedTerm.getTno();
        for(int i=0;i<classList.size();i++){
            ClassEntity classEntity =new ClassEntity();
            classEntity.setClname(classList.get(i));
            classEntity.setTermEntity(termEntity);
            ClassEntity savedClass= classEntityRepository.save(classEntity);
        }
        return false;
    }
    //학기 전체출력
    @Transactional
    public PageDto getTerm(int page, int view) {
        Pageable pageable = PageRequest.of(page - 1, view);
        Page<TermEntity> termEntityPage = termEntityRepository.selectTerm(pageable);
        int count = termEntityPage.getTotalPages();

        List<Object> termDtos = termEntityPage.getContent().stream()
                .map(termEntity -> {
                    TermDto termDto = termEntity.toDto();
                    int tno = termEntity.getTno();
                    List<ClassEntity> classEntities = classEntityRepository.findByTno(tno); // tno에 해당하는 ClassEntity 목록 가져오기
                    termDto.setClassEntity(classEntities); // TermDto에 ClassEntity 목록 설정
                    return termDto;
                })
                .collect(Collectors.toList());

        PageDto pageDto = PageDto.builder()
                .data(termDtos)
                .page(page)
                .count(count)
                .build();
        return pageDto;
    }


    //학기 삭제
    @Transactional
    public boolean deleteTerm(@RequestBody ArrayList<Integer> tnos){
        if(tnos!=null){for(int i=0;i<tnos.size();i++){
            perHourEntityRepository.nullPerHour(tnos.get(i));
            perHourSubEntityRepository.nullPerHoursub(tnos.get(i));
            classEntityRepository.deleteAllBytno(tnos.get(i));
            termEntityRepository.deleteById(tnos.get(i));

        } return true;
        }
        return false;
    }

    //학기 정보 불러오기
    @Transactional
    public TermDto TermInfoGet(int tno){
        Optional<TermEntity> optionalTermEntity = termEntityRepository.findById(tno);
        if (optionalTermEntity.isPresent()) {
            TermEntity termEntity = optionalTermEntity.get();
            TermDto termDto=termEntity.toDto();
            // termEntity를 사용하여 원하는 작업 수행
            List<ClassEntity> classEntityList =classEntityRepository.findByTno(tno);


            // TermDto 객체로 변환하여 반환
            return termDto.builder()
                    .tno(termEntity.getTno())
                    .tname(termEntity.getTname())
                    .classEntity(classEntityList)
                    .build();

        }

        return null; // Optional이 비어있는 경우 null 반환
    }

    // 학기 수정
    @Transactional
    public boolean termPut( Map<String, Object> info){
        String tname=(String) info.get("tname");
        int tno = Integer.parseInt(info.get("tno").toString());
        List<String> classList=(List<String>) info.get("classList");
        TermEntity termEntity=termEntityRepository.findById(tno).get();
        termEntity.setTname(tname);
        classEntityRepository.deleteAllBytno(tno);
        for(int i=0;i<classList.size();i++){
            ClassEntity classEntity =new ClassEntity();
            classEntity.setClname(classList.get(i));
            classEntity.setTermEntity(termEntity);
            ClassEntity savedClass= classEntityRepository.save(classEntity);
        }
        return true;
    }

}
