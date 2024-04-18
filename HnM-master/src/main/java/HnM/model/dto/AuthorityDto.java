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
public class AuthorityDto {

    private int scno;
    private int gno;

    public AuthorityEntity toEntity(){
        return AuthorityEntity.builder()
                .build();
    }

}
