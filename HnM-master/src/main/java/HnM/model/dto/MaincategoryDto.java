package HnM.model.dto;

import HnM.model.entity.MaincategoryEntity;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class MaincategoryDto {
    private int mcno;
    private String mcname;

    public MaincategoryEntity toEntity(){
        return MaincategoryEntity.builder()
                .mcno(this.mcno)
                .mcname(this.mcname)
                .build();
    }
}
