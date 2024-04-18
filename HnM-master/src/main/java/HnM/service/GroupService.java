package HnM.service;

import HnM.model.dto.GroupDto;
import HnM.model.entity.GroupEntity;
import HnM.model.repository.GroupEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupService {
    @Autowired
    GroupEntityRepository groupEntityRepository;

    public GroupDto doGetGroup(int gno){
        Optional<GroupEntity> optionalGroupEntity = groupEntityRepository.findById(gno);
        if(!optionalGroupEntity.isPresent()) return null;
        GroupDto groupDto = optionalGroupEntity.get().toDto();
        return groupDto;
    }
}
