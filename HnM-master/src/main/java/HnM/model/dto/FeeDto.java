package HnM.model.dto;

import HnM.model.entity.StudentEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class FeeDto {
    // 필요한게 뭐야?
    /*
    만들고자 하는게 무엇이야??
    회계 프로그램을 만들꺼야... 뭐가 필요해?
    1. 학생들이 돈을 납부 했는지 안했는지에 대한 정보가 필요해
    어떻게 알아볼껀데?
    결제 과정은 빼고 결제가 되었다면 담담 선생님이 학생의 결제 창에 대한 상태를 결제로 바꾸어 주면 결제된 것으로 처리 하는 방식으로 진행 할꺼야
    그렇다면 필요한게 무엇이야?
    1.일단 해당 학생의 정보가 필요해 sno -> why? 연결해야 하니까?
    2.학생의 상태가 변경될수 있어야해. state  (수납, 미수납)
    3.학생의 수강료가 입금되면 그에 따른 금액이 차트 혹은 그래프로 나타나야해
    */

    private int feeno; //pk설정을 위한 입금 넘버
    private StudentEntity sno; // fk 설정을 위한 학생넘버
    private int tuitionfee; // 학생이 내야하는 수강료
    private int submitfee; //학생이 제출한 수강료
    private String state; // 현재 학생의 입금 상태 (수납, 수납중, 미수납)

}
