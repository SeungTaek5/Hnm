package HnM.service;

import HnM.model.dto.MaincategoryDto;
import HnM.model.dto.SubcategoryDto;
import HnM.model.entity.MaincategoryEntity;
import HnM.model.entity.SubcategoryEntity;
import HnM.model.repository.SubcategoryEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubcategoryService {
    @Autowired
    SubcategoryEntityRepository subcategoryEntityRepository;

    public SubcategoryDto doGetSubCategory(int scno){
        Optional<SubcategoryEntity> optionalSubcategoryEntity = subcategoryEntityRepository.findById(scno);
        if(!optionalSubcategoryEntity.isPresent())return null;
        return optionalSubcategoryEntity.get().toDto();
    }

    public List<SubcategoryEntity> doGetSubCategoryAll(){
        return subcategoryEntityRepository.findAll();
    }
}
