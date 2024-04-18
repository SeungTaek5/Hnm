package HnM.model.dto;

import HnM.model.entity.SubcategoryEntity;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class SubcategoryDto {
    private int scno;
    private String scname;
    private int mcno;
    private String scurl;

    public SubcategoryEntity toEntity(){
        return SubcategoryEntity.builder()
                .scno(this.scno)
                .scname(this.scname)
                .scurl(this.scurl)
                .build();
    }
}
