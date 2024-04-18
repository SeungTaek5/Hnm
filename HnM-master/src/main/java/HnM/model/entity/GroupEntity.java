package HnM.model.entity;

import HnM.model.dto.GroupDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "`group`")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class GroupEntity extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gno;

    @Column(length = 20, nullable = false)
    private String gname;


    public GroupDto toDto(){
        return GroupDto.builder()
                .gno(this.gno)
                .gname(this.gname)
                .build();
    }//m end
}