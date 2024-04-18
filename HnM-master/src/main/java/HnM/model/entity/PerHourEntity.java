package HnM.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "perhour")
@AllArgsConstructor@NoArgsConstructor
@Getter@Setter@SuperBuilder
@ToString
public class PerHourEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int phno;

    @ManyToOne
    @JoinColumn(name="tno_fk")
    private TermEntity termEntity; // 학기 FK


    @Column(length = 20)
    private String termname; // 이름(ex . 2024 정규반 1)

}
