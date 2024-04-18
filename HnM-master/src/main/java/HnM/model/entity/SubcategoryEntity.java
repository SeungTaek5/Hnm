package HnM.model.entity;

import HnM.model.dto.SubcategoryDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subcategory")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class SubcategoryEntity extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scno;

    @Column(length = 25, unique = true, nullable = false)
    private String scname;

    @JoinColumn( name = "mcno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    private MaincategoryEntity maincategoryEntity;

    @Column(columnDefinition = "longtext", nullable = false) // unique 넣어야함!!!!!!!!!!!!!!!!
    private String scurl;

    // - 엔티티를 dto로 변환하는 메소드
    public SubcategoryDto toDto(){
        return SubcategoryDto.builder()
                .scno(this.scno)
                .scname(this.scname)
                .scurl(this.scurl)
                .mcno(this.maincategoryEntity.getMcno())
                .build();
    }//m end
}//c end
