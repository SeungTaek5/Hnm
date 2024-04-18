package HnM.model.entity;

import HnM.model.dto.CounselDto;
import HnM.model.dto.GroupDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "counsel")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class CounselEntity extends BaseTime{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cno;

    @Column(length = 50, nullable = false)
    private String ctitle;

    @Column( columnDefinition = "longtext")
    private String ccontent;

    @Column( nullable = false)
    private LocalDate centerdate; // 상담일자

    @Column(length = 10, nullable = false)
    private String cdivision;

    @JoinColumn( name = "sno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private StudentEntity studentEntity;

    @JoinColumn( name = "ano_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private AdminEntity adminEntity;

    public CounselDto toDto(){
        return CounselDto.builder()
                .cno(this.cno)
                .ctitle(this.ctitle)
                .ccontent(this.ccontent)
                .centerdate(this.centerdate)
                .cdivision(this.cdivision)
                .build();
    }
}
