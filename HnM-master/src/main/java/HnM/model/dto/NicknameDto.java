package HnM.model.dto;
import HnM.model.entity.NicknameEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class NicknameDto {
    private int nno;                    //pk
    private int ano_fk;    //참조하는 선생님 번호
    private String nname;               //닉네임

    public NicknameEntity toEntity(){
        return NicknameEntity.builder()
                .nno(this.nno)
                .nname(this.nname)
                .build();
    }

}
