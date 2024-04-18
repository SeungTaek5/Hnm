package HnM.model.dto;

import HnM.model.entity.AdminEntity;
import HnM.model.entity.AuthorityEntity;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class GroupAuthDto {
    private int gno_fk;
    private List<Integer> scnoList;
}
