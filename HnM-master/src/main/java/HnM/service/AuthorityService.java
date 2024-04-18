package HnM.service;

import HnM.model.dto.AuthorityDto;
import HnM.model.dto.SubcategoryDto;
import HnM.model.entity.AuthorityEntity;
import HnM.model.entity.SubcategoryEntity;
import HnM.model.repository.AuthorityEntityRepository;
import HnM.model.repository.SubcategoryEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorityService {
    @Autowired
    AuthorityEntityRepository authorityEntityRepository;

    // 관리자 그룹별 서브카테고리가져오기
    public List<AuthorityDto> doGetAuthority(int gno){
        List<AuthorityDto> result = new ArrayList<>();

        List<AuthorityEntity> authorityEntityList = authorityEntityRepository.findAll();
        for(AuthorityEntity a : authorityEntityList){
            if(a.getGroupEntity().getGno() == gno){
                result.add(a.toDto());
            }
        }

        return result;
    }
}
