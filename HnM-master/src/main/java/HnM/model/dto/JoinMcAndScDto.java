package HnM.model.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class JoinMcAndScDto {
    private int mcno;
    private String mcname;
    private List<Map<Object, Object>> subcategoryList;
}
