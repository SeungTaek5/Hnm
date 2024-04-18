// PerHourSubController.java 파일

package HnM.controller;

import HnM.model.entity.NicknameEntity;
import HnM.model.entity.PerHourSubEntity;
import HnM.model.entity.TermEntity;
import HnM.model.repository.NicknameEntityRepository;
import HnM.model.repository.PerHourSubEntityRepository;
import HnM.model.repository.TermEntityRepository;
import HnM.service.PerHourSubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/perhoursub")
public class PerHourSubController {
    @Autowired
    PerHourSubService perHourSubService;
    @Autowired
    TermEntityRepository termEntityRepository;
    @Autowired
    NicknameEntityRepository nicknameEntityRepository;
    @Autowired
    PerHourSubEntityRepository perHourSubEntityRepository;

//    @PostMapping("/regist/post.do")
//    public boolean postRegistDo(@RequestBody Map<String, String> data) {
//
//        TermEntity term = termEntityRepository.findByTno(Integer.parseInt(data.get("termId")));
//        NicknameEntity nickname = nicknameEntityRepository.findByNno(Integer.parseInt(data.get("nicknameId")));
//        int perhour = Integer.parseInt(data.get("perhour"));
//
//        // 중복검사 확인
//        Optional<PerHourSubEntity> existEntity = perHourSubEntityRepository.findByTermEntityAndNicknameEntity(term,nickname);
//        if(existEntity.isPresent()){
//            return false;
//        }
//        PerHourSubEntity perHourSubEntity = PerHourSubEntity.builder()
//                .termEntity(term)
//                .nicknameEntity(nickname)
//                .perhour(perhour)
//                .build();
//        PerHourSubEntity saveEntity = perHourSubEntityRepository.save(perHourSubEntity);
//
//        return saveEntity.getPhsno()>0;
//    }


    @GetMapping("/nickname/all")
    public List<NicknameEntity> getAllNicknames() {
        return perHourSubService.getAllNicknames();
    }


    @GetMapping("/regist/get.do")
    public List<Map<Object, Object>> getRegistDo(){
        return perHourSubService.getRegistDo();
    }
}