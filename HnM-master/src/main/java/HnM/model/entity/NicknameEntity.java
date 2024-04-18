package HnM.model.entity;
//240408_장은경 작성 : nickname 엔티티

import HnM.model.dto.NicknameDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "nickname")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DynamicInsert
public class NicknameEntity extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nno;                    //pk

    @JoinColumn( name = "ano_fk",unique = true) // fk 필드명
    @ManyToOne // 해당 필드 참조
    private AdminEntity adminEntity;    //참조하는 선생님 번호

    @Column(length = 15, nullable = false)
    private String nname;               //닉네임

    public NicknameDto toDto(){
        return NicknameDto.builder()
                .nno(this.nno)
                .ano_fk(this.adminEntity.getAno())
                .nname(this.nname)
                .build();
    }
}
