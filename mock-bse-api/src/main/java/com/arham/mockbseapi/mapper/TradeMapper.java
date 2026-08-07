package com.arham.mockbseapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.arham.mockbseapi.dto.trade.AddTradeDTO;
import com.arham.mockbseapi.dto.trade.GetTradeDTO;
import com.arham.mockbseapi.dto.trade.UpdateTradeDTO;
import com.arham.mockbseapi.entity.Trade;

@Mapper(componentModel = "spring")
public interface TradeMapper {

    @Mapping(target = "client", ignore = true)
    Trade toEntity(AddTradeDTO dto);

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "client.clientCode", target = "clientCode")
    GetTradeDTO toDTO(Trade trade);

    @Mapping(target = "client", ignore = true)
    void updateTrade(UpdateTradeDTO dto,
                     @MappingTarget Trade trade);
}