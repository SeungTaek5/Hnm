package HnM.model.dto;

import HnM.model.entity.AdminEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class AdminDto {

    private int ano;

    private String aid;

    private String apassword;

    private String aname;

    private String aphone;

    private String aemail;

    private int gno;

    public AdminEntity toEntity(){
        return AdminEntity.builder()
                .ano(this.getAno())
                .aid(this.getAid())
                .apassword(new BCryptPasswordEncoder().encode(this.getApassword()))
                .aname(this.getAname())
                .aphone(this.aphone)
                .aemail(this.getAemail())
                .build();
    }
}
