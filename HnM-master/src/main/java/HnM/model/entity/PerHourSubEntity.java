package HnM.model.entity;

import HnM.model.dto.PerHourSubDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
@Entity
@Table(name = "perhoursub")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class PerHourSubEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int phsno;

    @ManyToOne
    @JoinColumn(name = "phno_fk")
    private PerHourEntity perHourEntity; // 시수 fk

    @ManyToOne
    @JoinColumn(name = "nno_fk")
    private NicknameEntity nicknameEntity; // 닉네임 fk

    @ManyToOne
    @JoinColumn(name = "tno_fk")
    private TermEntity termEntity; // 학기 fk

    @Column(precision = 50)
    private int perhour; // 시수
    @Column(length = 10)
    private String fontcolor;
    @Column(length = 10)
    private String backgroundcolor;

    public PerHourSubDto toDto(){
        return PerHourSubDto.builder()
                .phsno(this.phsno)
                .perhour(this.perhour)
                .fontColor(this.fontcolor)
                .backgroundColor(this.backgroundcolor)
                .build();
    }
}