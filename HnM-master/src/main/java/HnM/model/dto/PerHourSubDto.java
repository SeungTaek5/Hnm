package HnM.model.dto;

import HnM.model.entity.PerHourSubEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class PerHourSubDto {

    private int phsno;
    private int phno; // 시수 fk
    private int nno; //  닉네임 가져오기위한 fk

    private int perhour; // 시수
    private String fontColor;
    private String backgroundColor;

    private String nickname;


    public PerHourSubEntity toEntity(){
        return PerHourSubEntity.builder()
                .phsno(this.phsno)
                .perhour(this.perhour)
                .fontcolor(this.fontColor)
                .backgroundcolor(this.backgroundColor)
                .build();
    }

}
