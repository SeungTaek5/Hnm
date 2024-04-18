package HnM.model.entity;

import HnM.model.dto.ScheduleTimeDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "scheduletime")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DynamicInsert
public class ScheduleTimeEntity extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stno;

    @Column(length = 20)
    private String week;

    @Column(length = 20)
    private String period;

    public ScheduleTimeDto toDto(){
        return ScheduleTimeDto.builder()
                .stno(this.stno)
                .week(this.week)
                .period(this.period)
                .build();
    }
}
