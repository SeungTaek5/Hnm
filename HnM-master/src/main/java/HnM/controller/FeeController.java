package HnM.controller;

import HnM.model.dto.FeeDto;
import HnM.service.FeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fee")
public class FeeController {
    @Autowired FeeService feeService;


    @GetMapping("/payall")
    public List<FeeDto> getAllFee(){
        System.out.println("FeeController.getAllFee");
        return feeService.getAllFee();
    }

    @PutMapping("/update")
    public void updateFee(@RequestBody List<FeeDto> updateFees){
        feeService.updateFee(updateFees);
    }
}
