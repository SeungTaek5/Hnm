package HnM.model.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class PerHourSubCreateDto {
    private int tno;
    private List<PerHourSubDto> perHourSubDtoList = new ArrayList<>();

}
