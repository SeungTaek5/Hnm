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
public class TermDto {

    private int tno;

    private String tname;

    private List<ClassEntity> classEntity;

    public TermEntity toEntity(){
        return TermEntity.builder()
                .tno(this.tno)
                .tname(this.tname)
                .build();
    }
}
