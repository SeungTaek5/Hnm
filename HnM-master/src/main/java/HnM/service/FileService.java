package HnM.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {
    //Controller: 중계자 역할(HTTP 매핑, HTTP 요청/응답, 데이터 유효성검사) 등등
    //Service: Controller <-- Service(비지니스로직) --> Dao, Controller <--> Service(비지니스로직)

    //어디에(PATH) 누구를(파일객체)
    String uploadPath= "C:\\Users\\504\\Desktop\\HnM\\build\\resources\\main\\static\\image\\";

    //1. 업로드 메소드
    public String fileUpload(MultipartFile multipartFile){

        String uuid= UUID.randomUUID().toString();  System.out.println("uuid = " + uuid);
        String filename = uuid+"_"+multipartFile.getOriginalFilename().replaceAll("_","-");

        //1. 첨부파일 업로드 하기[업로드란 : 클라이언트의 바이트(대용량/파일)을 서버로 복사
        //1. 첨부파일을 저장할 경로
        //File 클래스: 파일 관련된 메소드 제공
        //new File(파일경로);
        File file = new File(uploadPath+ filename);
        System.out.println("file = " + file);
        //2.[무엇을] 첨부파일 객체
        // .transferTo
        try{
            multipartFile.transferTo(file);
        }catch (Exception e){
            System.out.println("e = " + e);
            return null;
        }return filename;
    }

}
