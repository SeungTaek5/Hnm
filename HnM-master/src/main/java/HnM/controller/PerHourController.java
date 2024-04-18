package HnM.controller;

import HnM.model.dto.PerHourSubCreateDto;
import HnM.model.dto.TermDto;
import HnM.model.entity.TermEntity;
import HnM.service.PerHourService;
import HnM.service.PerHourSubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perhour")
public class PerHourController {
    @Autowired
    PerHourService perHourService;
    @Autowired
    PerHourSubService perHourSubService;

    @GetMapping("/perhourwithterm")
    public List<TermEntity> perhourwithterm() {
        return perHourService.perhourwithterm();
    }

    @PostMapping("/regist.do")
    public boolean perhourRegistDo(@RequestBody PerHourSubCreateDto perHourSubCreateDto){
        System.out.println(perHourSubCreateDto);
        System.out.println(perHourSubCreateDto.getPerHourSubDtoList());
        return perHourSubService.perhourRegistDo(perHourSubCreateDto);
    }

    // tno를 받아서 phno로 반환하기
    @GetMapping("/getphno")
    public int tnoToPhno(int tno){
        System.out.println("테스트" + perHourService.tnoToPhno(tno));
        return perHourService.tnoToPhno(tno);
    }

    // tno를 받아서 시간표 유무 확인하기
    @GetMapping("/gettnoforfindschdedule")
    public boolean getTnoForFindSchedule(int tno){
        return perHourService.getTnoForFindSchedule(tno);
    }
}