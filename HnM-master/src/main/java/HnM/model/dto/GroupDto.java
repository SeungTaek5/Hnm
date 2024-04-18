package HnM.model.dto;

import HnM.model.entity.GroupEntity;
import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class GroupDto {

    private int gno;
    private String gname;

    public GroupEntity toEntity(){
        return GroupEntity.builder()
                .gno(this.gno)
                .gname(this.gname)
                .build();
    }
}