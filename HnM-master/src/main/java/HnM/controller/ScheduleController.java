package HnM.controller;

import HnM.model.dto.ClassDto;
import HnM.model.dto.PerHourSubDto;
import HnM.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;

    // 시수디테일 가져오기
    @GetMapping("/findPerHourSub/get.do")
    public List<PerHourSubDto> doGetFindPerHourSub(int phno){
        return scheduleService.doGetFindPerHourSub(phno);
    }

    // 반 가져오기
    @GetMapping("/findTermAndClass/get.do")
    public List<ClassDto> doGetfindTermAndClass(int phno){
        return scheduleService.doGetfindTermAndClass(phno);
    }

    // 시간표 등록
    @PostMapping("/post.do")
    public boolean doPostScheduleDo(@RequestBody List<Map<String, String>> data){
        return scheduleService.doPostScheduleDo(data);
    }

    // 시간표 조회
    @GetMapping("/read.do")
    public List<Map<Object, Object>> doGetSchedule(int phno){
        return scheduleService.doGetSchedule(phno);
    }
}
