package HnM.service;

import HnM.model.dto.MaincategoryDto;
import HnM.model.entity.MaincategoryEntity;
import HnM.model.entity.SubcategoryEntity;
import HnM.model.repository.MaincategoryEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MaincategoryService {

    @Autowired
    MaincategoryEntityRepository maincategoryEntityRepository;

    public MaincategoryDto doGetMainCategory(int mcno){
        Optional<MaincategoryEntity> optionalMaincategoryEntity = maincategoryEntityRepository.findById(mcno);
        if(!optionalMaincategoryEntity.isPresent())return null;
        return optionalMaincategoryEntity.get().toDto();
    }
}
