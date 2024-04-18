package HnM.model.entity;

import HnM.model.dto.AdminDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "admin")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DynamicInsert
public class AdminEntity extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ano;

    @Column(length = 30, unique = true, nullable = false)
    private String aid;

    @Column(length = 255, nullable = false)
    private String apassword;

    @Column(length = 10, nullable = false)
    private String aname;

    @Column(length = 14)
    private String aphone;

    @Column(length = 100)
    private String aemail;

    @JoinColumn( name = "gno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    @ColumnDefault("2")
    private GroupEntity groupEntity;


    public AdminDto toDto(){
        return AdminDto.builder()
                .ano(this.ano)
                .aid(this.aid)
                .aname(this.aname)
                .aphone(this.aphone)
                .aemail(this.aemail)
                .gno(this.groupEntity.getGno())
                .build();
    }
}
