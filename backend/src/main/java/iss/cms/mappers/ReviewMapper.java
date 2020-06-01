package iss.cms.mappers;

import iss.cms.domain.Review;
import iss.cms.domain.dto.ReviewDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ReviewMapper {

    @Mapping(target = "username", source = "pcMember.user.username")
    ReviewDTO toDto(Review review);

    @Mapping(target = "proposal", ignore = true)
    @Mapping(target = "pcMember", ignore = true)
    @Mapping(target = "id", ignore = true)
    Review fromDto(ReviewDTO reviewDTO);

}
