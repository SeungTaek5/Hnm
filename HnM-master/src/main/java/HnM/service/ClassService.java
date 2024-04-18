package HnM.service;

import HnM.model.dto.ClassDto;
import HnM.model.dto.PageDto;
import HnM.model.dto.TermDto;
import HnM.model.entity.ClassEntity;
import HnM.model.entity.TermEntity;
import HnM.model.repository.ClassEntityRepository;
import HnM.model.repository.TermEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ClassService {
    @Autowired
    TermEntityRepository termEntityRepository;

    @Autowired
    ClassEntityRepository classEntityRepository;
    //반 전체출력
    public PageDto getClass(int page, int view) {
        Pageable pageable = PageRequest.of(page - 1, view);
        Page<ClassEntity> classEntityPage = classEntityRepository.findAll(pageable);
        int count = classEntityPage.getTotalPages();

        List<Object> classDtos = classEntityPage.getContent().stream()
                .map(classEntity -> {
                    ClassDto classDto = classEntity.toDto();
                    int tno = classEntity.getTermEntity().getTno();
                    TermEntity termEntity = termEntityRepository.findById(tno).get(); // tno에 해당하는 ClassEntity 목록 가져오기
                    classDto.setTermEntityList(termEntity); // TermDto에 ClassEntity 목록 설정
                    return classDto;
                })
                .collect(Collectors.toList());

        PageDto pageDto = PageDto.builder()
                .data(classDtos)
                .page(page)
                .count(count)
                .build();
        return pageDto;
    }

    // 반 삭제

    public boolean deleteClass(ArrayList<Integer> clnos) {
        if (clnos != null) {
            for (int i = 0; i < clnos.size(); i++) {
                classEntityRepository.deleteById(clnos.get(i));
            }
            return true;
        }
        return false;
    }

    //학기정보 가져오기

    public List<TermDto> allTermGet(){

        List<TermEntity> termEntityList =termEntityRepository.AllTerm();

        List<TermDto>  termDtoList=termEntityList.stream()
                .map(termEntity -> {
                    TermDto termDto = termEntity.toDto();
                    int tno = termEntity.getTno();
                    List<ClassEntity> classEntities = classEntityRepository.findByTno(tno); // tno에 해당하는 ClassEntity 목록 가져오기
                    termDto.setClassEntity(classEntities); // TermDto에 ClassEntity 목록 설정
                    return termDto;
                })
                .collect(Collectors.toList());
        System.out.println("termDtoList = " + termDtoList);

        return termDtoList;
    }

    //반 등록
    public boolean postClass(Map<String, Object> info){
        int tno= Integer.parseInt(info.get("tno").toString());
        String clname=(String) info.get("clname");
        ClassEntity classEntity=classEntityRepository.Duplicatetest(tno,clname);
        System.out.println("classEntity = " + classEntity);
        if(clname!=null&& classEntity==null){
            ClassEntity savedClassEntity= new ClassEntity();
            savedClassEntity.setClname(clname);
            savedClassEntity.setTermEntity(termEntityRepository.findById(tno).get());
            savedClassEntity=classEntityRepository.save(savedClassEntity);
            if(savedClassEntity.getClno() >0) return true;
            return false;
        }

        return false;
    }

    //반 정보 불러오기
    public ClassDto classInfoGet(@RequestParam int clno){
        ClassEntity classEntity=classEntityRepository.findById(clno).get();
        ClassDto classDto =classEntity.toDto();
        classDto.setTermEntityList(classEntity.getTermEntity());
        return classDto;
    }

    //반 수정
    public boolean editClass(Map<String, Object> info){
        int tno= Integer.parseInt(info.get("tno").toString());
        String clname=(String) info.get("clname");
        int clno= Integer.parseInt(info.get("clno").toString());
        ClassEntity classEntity=classEntityRepository.Duplicatetest(tno,clname);
        System.out.println("classEntity = " + classEntity);
        if(clname!=null&& classEntity==null){
            ClassEntity savedClassEntity=classEntityRepository.findById(clno).get();
            savedClassEntity.setClname(clname);
            savedClassEntity.setTermEntity(termEntityRepository.findById(tno).get());
            savedClassEntity=classEntityRepository.save(savedClassEntity);
            if(savedClassEntity.getClno() >0) return true;
            return false;
        }

        return false;
    }

}
