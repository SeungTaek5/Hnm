package HnM.model.entity;

import HnM.model.dto.AdminDto;
import HnM.model.dto.ScheduleDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "schedule")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class ScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int schno;

    @Column(length = 20)
    private String etc;

    @JoinColumn( name = "clno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private ClassEntity classEntity;

    @JoinColumn( name = "phsno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private PerHourSubEntity perHourSubEntity;

    @JoinColumn( name = "stno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private ScheduleTimeEntity scheduleTimeEntity;


    public ScheduleDto toDto(){
        return ScheduleDto.builder()
                .schno(this.schno)
                .etc(this.etc)
                .clno(this.classEntity.getClno())
                .phsno(this.perHourSubEntity.getPhsno())
                .stno(this.scheduleTimeEntity.getStno())
                .build();
    }
}
