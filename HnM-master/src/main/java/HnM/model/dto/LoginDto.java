package HnM.model.dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class LoginDto {
    private String id;
    private String password;
}
