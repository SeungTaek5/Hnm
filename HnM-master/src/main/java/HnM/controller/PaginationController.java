package HnM.controller;

import HnM.model.entity.StudentEntity;
import HnM.model.repository.StudentEntityRepository;
import HnM.service.PaginationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaginationController {
    @Autowired
    private PaginationService paginationService;

    @GetMapping("/entity")
    public Page<StudentEntity> getEntity(@RequestParam(defaultValue = "0")int page , @RequestParam(defaultValue = "5") int size, @RequestParam String sname){

        return paginationService.getEntity(page,size, sname);
    }

}
