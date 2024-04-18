package HnM.model.dto;

import HnM.model.entity.AdminEntity;
import HnM.model.entity.CounselEntity;
import HnM.model.entity.StudentEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class CounselDto {

    private int cno;

    private String ctitle;

    private String ccontent;

    private LocalDate centerdate; // 등록일자!! 상담일자x

    private String cdivision;

    private StudentDto studentDto;

    private AdminDto adminDto;

    public CounselEntity toEntity(){
        return CounselEntity.builder()
                .ctitle(this.ctitle)
                .ccontent(this.ccontent)
                .centerdate(this.centerdate)
                .cdivision(this.cdivision)
                .build();
    }
}
