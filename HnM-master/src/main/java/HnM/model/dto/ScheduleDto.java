package HnM.model.dto;

import HnM.model.entity.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class ScheduleDto {
    private int schno;
    private int clno;
    private int phsno;
    private int stno;
    private String etc;


    public ScheduleEntity toEntity(){
        return ScheduleEntity.builder()
                .schno(this.getSchno())
                .perHourSubEntity(PerHourSubEntity.builder().phsno(this.phsno).build())
                .classEntity(ClassEntity.builder().clno(this.clno).build())
                .scheduleTimeEntity(ScheduleTimeEntity.builder().stno(this.stno).build())
                .etc(this.getEtc())
                .build();
    }
}
