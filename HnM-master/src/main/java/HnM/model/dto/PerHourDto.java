package HnM.model.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class PerHourDto {

    private int phno;
    private String term; // 학기 FK
    private String termname; // 이름(ex . 2024 정규반 1)
}
