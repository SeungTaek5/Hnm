package HnM.model.entity;

import HnM.model.dto.AuthorityDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "authority")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@SuperBuilder
@ToString
public class AuthorityEntity extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authno;

    @JoinColumn( name = "scno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private SubcategoryEntity subcategoryEntity;

    @JoinColumn( name = "gno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private GroupEntity groupEntity;

    public AuthorityDto toDto(){
        return AuthorityDto.builder()
                .scno(this.subcategoryEntity.getScno())
                .gno(this.groupEntity.getGno())
                .build();
    }//m end
}

