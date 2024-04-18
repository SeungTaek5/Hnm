package HnM.model.entity;

import HnM.model.dto.FeeDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "fee")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DynamicInsert
public class FeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feeno; //pk설정을 위한 입금 넘버

    @Column(nullable = false)
    private int tuitionfee; // 학생이 내야하는 수강료

    @ColumnDefault("0")
    private int submitfee; //학생이 제출한 수강료

    @Column(length = 15)
    private String state; // 현재 학생의 입금 상태 (수납, 수납중, 미수납)

    @JoinColumn(name = "sno_fk")
    @ManyToOne
    private StudentEntity sno; // fk 설정을 위한 학생넘버


    public FeeDto toDto(){
        return FeeDto.builder()
                .feeno(this.feeno)
                .tuitionfee(this.tuitionfee)
                .submitfee(this.submitfee)
                .state(this.state)
                .sno(this.sno)
                .build();
    }


}

