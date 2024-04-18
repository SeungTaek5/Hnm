package HnM.service;

import HnM.model.entity.StudentEntity;
import HnM.model.repository.StudentEntityRepository;
import HnM.pagination.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PaginationService {

    @Autowired
    private StudentEntityRepository studentEntityRepository;

    public Page<StudentEntity> getEntity(int page, int size, String sname) {

        Pageable pageable = PaginationUtil.getPageable(page, size ,sname);

        return studentEntityRepository.findBySnameContaining(sname , pageable );
    }



}
