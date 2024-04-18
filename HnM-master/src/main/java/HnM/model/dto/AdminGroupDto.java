package HnM.model.dto;

import HnM.model.entity.AdminEntity;
import HnM.model.entity.AuthorityEntity;
import jakarta.persistence.*;
import lombok.*;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class AdminGroupDto {
    private int ano;
    private int gno;
}
