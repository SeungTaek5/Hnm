package HnM.model.dto;

import HnM.model.entity.ClassEntity;
import HnM.model.entity.TermEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class ClassDto {

    private int clno;

    private String clname;

    private TermEntity termEntityList;

    public ClassEntity toEntity(){
        return ClassEntity.builder()
                .clname(this.clname)
                .clno(this.clno)
                .build();
    }
}
