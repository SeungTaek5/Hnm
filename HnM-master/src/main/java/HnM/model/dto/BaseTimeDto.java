package HnM.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaseTimeDto {
    public LocalDateTime cdate;
    public LocalDateTime udate;
}
