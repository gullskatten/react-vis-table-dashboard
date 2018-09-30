import React, { Component } from "react";
import { AuctionProvider, AuctionSubscribe } from "./AuctionHandler";
import { TitleLarge } from "../styleguides/StyledTitle";
import ReactTable from "react-table";
import styled from "styled-components";
import StyledMessage from "../styleguides/StyledMessage";

const FullWidthWrapper = styled.div`
  width: 84vw;
`;

const StyledButton = styled.button`
  color: #fff;
  background: ${props => props.theme.warn};
  padding: 0.5rem 0.8rem;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  margin: 10px 0;
`;

export default class FavoriteAuctionTable extends Component {
  renderTable = (selectedAuctions, selectedAuctionType, toggleFavoriteAuction, resetFavorites, isFavoriteAuction) => {
    if (!selectedAuctions.length) {
      return (
        <FullWidthWrapper>
          <StyledMessage warn>Nothing added to favorites yet!</StyledMessage>
        </FullWidthWrapper>
      );
    }
    const auctionFields = Object.keys(selectedAuctions[0]);
    const skippableFields = ["modifier", "isSellable", "isConsumable", "isWeapon", "isQuestItem", "isEnchantable", "isWearable"];

    const columns = auctionFields.filter(key => !skippableFields.includes(key)).map(key => {
     
      if (key === "itemType") {
        return { id: key, Header: key, accessor: d => d.itemType.displayName };
      }
      
      if (key === "armorType") {
        return { id: key, Header: key, accessor: d => d.armorType ? d.armorType.displayName : "N/A" };
      }
      
      if (key === "quality") {
        return { id: key, Header: key, accessor: d => d.quality.displayName };
      }
     
      if(key === "isFavorite") {
        return  {
              Header: 'favorite',
              accessor: "isFavorite",
              Cell: d => <input type="checkbox" 
              onChange={() => toggleFavoriteAuction(d.original)} checked={isFavoriteAuction(d.original)}/>
          }
      }
      return { id: key, Header: key, accessor: key };
    });
    return (
      <div>
        <TitleLarge secondary>{selectedAuctionType.name}</TitleLarge>
        <ButtonsWrapper>
          <StyledButton margined onClick={resetFavorites}>
            Remove all favorites
          </StyledButton>
        </ButtonsWrapper>
        <ReactTable columns={columns} data={selectedAuctions} filterable />
      </div>
    );
  };

  render() {
    return (
      <AuctionProvider>
        <AuctionSubscribe>
          {({ state: { favoriteAuctions }, toggleFavoriteAuction, resetFavorites, isFavoriteAuction }) => {
            return this.renderTable(favoriteAuctions, "Favorite Auctions", toggleFavoriteAuction, resetFavorites, isFavoriteAuction);
          }}
        </AuctionSubscribe>
      </AuctionProvider>
    );
  }
}
