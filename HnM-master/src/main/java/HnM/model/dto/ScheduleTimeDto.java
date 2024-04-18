package HnM.model.dto;

import HnM.model.entity.ScheduleTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class ScheduleTimeDto {
    private int stno;
    private String week;
    private String period;

    public ScheduleTimeEntity toEntity(){
        return ScheduleTimeEntity.builder()
                .stno(this.stno)
                .week(this.week)
                .period(this.period)
                .build();
    }
}
