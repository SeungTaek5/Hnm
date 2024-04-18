package HnM.model.entity;

import HnM.model.dto.ClassDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "class")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DynamicInsert
public class ClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clno;

    @Column(length = 20,nullable = false)
    private String clname;

    @JoinColumn( name = "tno_fk") // fk 필드명
    @ManyToOne // 해당 필드 참조
    @ColumnDefault("1")
    private TermEntity termEntity;

    public ClassDto toDto(){
        return ClassDto.builder()
                .clno(this.clno)
                .clname(this.clname)
                .build();
    }



}
