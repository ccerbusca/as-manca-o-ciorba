package iss.cms.mappers;

import iss.cms.domain.Bidding;
import iss.cms.domain.dto.BiddingDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface BiddingMapper {

    @Mapping(target = "username", source = "pcMember.user.username")
    BiddingDTO toDto(Bidding bidding);

    @Mapping(target = "proposal", ignore = true)
    @Mapping(target = "pcMember", ignore = true)
    @Mapping(target = "id", ignore = true)
    Bidding fromDto(BiddingDTO biddingDTO);

}
