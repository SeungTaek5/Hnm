package HnM.service;

import HnM.model.dto.FeeDto;
import HnM.model.entity.FeeEntity;
import HnM.model.entity.StudentEntity;
import HnM.model.repository.FeeEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeeService {
    @Autowired FeeEntityRepository feeEntityRepository;

    //수강료 전체 출력
    public List<FeeDto> getAllFee(){
        List<FeeEntity> feeEntities = feeEntityRepository.findAll();

        System.out.println("FeeService.getAllFee");
        System.out.println("feeEntities = " + feeEntities);
        return feeEntities.stream().map(FeeEntity::toDto).collect(Collectors.toList());
    }

    public void updateFee(List<FeeDto> updateFees){
        for(FeeDto feeDto : updateFees){
            Optional<FeeEntity> feeEntityOptional = feeEntityRepository.findById(feeDto.getFeeno());
            if(feeEntityOptional.isPresent()){
                FeeEntity feeEntity = feeEntityOptional.get();
                feeEntity.setSubmitfee(feeDto.getSubmitfee());
                feeEntityRepository.save(feeEntity);
            }
        }
    }
}

