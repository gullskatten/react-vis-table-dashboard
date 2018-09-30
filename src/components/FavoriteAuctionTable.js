import React, { Component } from "react";
import { AuctionProvider, AuctionSubscribe } from "./AuctionHandler";
import { TitleLarge } from "../styleguides/StyledTitle";
import ReactTable from "react-table";
import styled from "styled-components";
import StyledMessage from "../styleguides/StyledMessage";
const FullWidthWrapper = styled.div`
  width: 84vw;
`;

export default class FavoriteAuctionTable extends Component {
  renderTable = (selectedAuctions, selectedAuctionType, toggleFavoriteAuction) => {
    if (!selectedAuctions.length) {
      return (
        <FullWidthWrapper>
          <StyledMessage warn>Nothing added to favorites yet!</StyledMessage>
        </FullWidthWrapper>
      );
    }
    const auctionFields = Object.keys(selectedAuctions[0]);

    const columns = auctionFields.filter(key => key !== "modifier").map(key => {
      if (key === "itemType") {
        return { id: key, Header: key, accessor: d => d.displayName };
      }
      if (key === "armorType") {
        return { id: key, Header: key, accessor: d => d.displayName };
      }
      if (key === "quality") {
        return { id: key, Header: key, accessor: d => d.displayName };
      }
      if(key === "isFavorite") {
        return  {
              Header: 'isFavorite',
              accessor: "isFavorite",
              Cell: d => <input type="checkbox" 
              onChange={() => toggleFavoriteAuction(d.original)} checked={d.original.isFavorite}/>
          }
      }
      return { id: key, Header: key, accessor: key };
    });
    return (
      <div>
        <TitleLarge secondary>{selectedAuctionType.name}</TitleLarge>
        <ReactTable columns={columns} data={selectedAuctions} filterable />
      </div>
    );
  };

  render() {
    return (
      <AuctionProvider>
        <AuctionSubscribe>
          {({ state: { favoriteAuctions }, toggleFavoriteAuction }) => {
            return this.renderTable(favoriteAuctions, "Favorite Auctions", toggleFavoriteAuction);
          }}
        </AuctionSubscribe>
      </AuctionProvider>
    );
  }
}
