package HnM.model.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class PageDto2 {
    private int page;               // 현재 페이지
    private int count;              // 총 페이지수
    private List<Map<Object, Object>> data;      // 본문 내용들
}