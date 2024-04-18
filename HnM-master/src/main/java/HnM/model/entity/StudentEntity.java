package HnM.model.entity;

import HnM.model.dto.StudentDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DynamicInsert
public class StudentEntity extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sno;
    @Column(length = 30, unique = true, nullable = false)
    private String sid;
    @ColumnDefault("'1111'")
    @Column(length = 50)
    private String spassword;
    @Column(length = 255)
    private String simage;

    @Column(length = 10, nullable = false)
    private String sname;
    @Column(length = 10, nullable = false)
    private String sgender;
    @Column(length = 5)
    private String sgrade;
    @Column(length = 30)
    private String sbirth;
    @Column(length = 100)
    private String semail;
    @Column(length = 100)
    private String sclass;
    @Column(length = 70)
    private String smajor;
    @Column(length = 70)
    private String sschool;
    @Column(length = 14)
    private String sphone;
    @Column(length = 255)
    private String saddress;
    @Column(length = 14)
    private String sparentphone;
    @Column(length = 10)
    private String sparentname;
    @Column(length = 20)
    private String sparentrelation;

    public StudentDto toDto(){
        return StudentDto.builder()
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
