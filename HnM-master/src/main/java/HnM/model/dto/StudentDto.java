package HnM.model.dto;

import HnM.model.entity.StudentEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class StudentDto {
    private int sno;

    private String sid;
    private String spassword;
    private String simage;
    private MultipartFile sfile;

    private String sname;
    private String sgender;
    private String sgrade;
    private String sbirth;
    private String semail;
    private String sclass;
    private String smajor;
    private String sschool;
    private String sphone;
    private String saddress;



    private String sparentphone;
    private String sparentname;
    private String sparentrelation;

    public StudentEntity toEntity(){
        return StudentEntity.builder()
                .sno(this.sno)
                .sid(this.sid)
                .spassword(this.spassword)
                .simage(this.simage)
                .sname(this.sname)
                .sgender(this.sgender)
                .sgrade(this.sgrade)
                .sbirth(this.sbirth)
                .semail(this.semail)
                .sclass(this.sclass)
                .smajor(this.smajor)
                .sschool(this.sschool)
                .sphone(this.sphone)
                .saddress(this.saddress)
                .sparentphone(this.sparentphone)
                .sparentname(this.sparentname)
                .sparentrelation(this.sparentrelation)
                .build();
    }
}
