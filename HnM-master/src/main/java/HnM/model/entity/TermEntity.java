package HnM.model.entity;

import HnM.model.dto.TermDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "term")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DynamicInsert
public class TermEntity {   // 학기
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tno;

    @Column(length = 20, unique = true,nullable = false)
    private String tname;

    public TermDto toDto(){
        return TermDto.builder()
                .tno(this.tno)
                .tname(this.tname)
                .build();
    }
}
