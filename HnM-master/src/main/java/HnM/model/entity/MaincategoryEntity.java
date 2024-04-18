package HnM.model.entity;

import HnM.model.dto.MaincategoryDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "maincategory")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class MaincategoryEntity extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mcno;

    @Column(length = 20, nullable = false)
    private String mcname;

    @OneToMany( mappedBy = "maincategoryEntity") // 자바에서만 양방향
    @ToString.Exclude // 해당 객체 호출시 해당 필드는 호출하지 않는다.
    @Builder.Default //
    private List<SubcategoryEntity> subcategoryEntityList = new ArrayList<>();


    public MaincategoryDto toDto() {
        return MaincategoryDto.builder()
                .mcno(this.mcno)
                .mcname(this.mcname)
                .build();
    }//m end
}