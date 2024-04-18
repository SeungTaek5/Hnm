package HnM.pagination;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class PaginationUtil {
    public static Pageable getPageable(int page, int size, String search){
        return PageRequest.of(page, size);
    }

}
