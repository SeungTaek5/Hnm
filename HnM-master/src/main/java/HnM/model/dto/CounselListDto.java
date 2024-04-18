package HnM.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class CounselListDto {
    private int cno;
    private String cdate;
    private String sid;
    private String sname;
    private String cdivision;
    private String ctitle;
    private String centerdate;
    private String aname;
    private int ano_fk;
    private int sno_fk;
    private String ccontent;
    private String udate;
}
