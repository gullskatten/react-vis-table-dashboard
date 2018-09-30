import React, { Component } from "react";
import { AuctionProvider, AuctionSubscribe } from "./AuctionHandler";
import { TitleLarge } from "../styleguides/StyledTitle";
import ReactTable from "react-table";
import styled, { css } from "styled-components";
import { Container, ContentWrapper } from "./Containers";

const StyledButton = styled.button`
  color: #fff;
  background: ${props => props.theme.secondary};
  padding: 0.5rem 0.8rem;
  border: 0;
  border-radius: 5px;
  cursor: pointer;

  ${props =>
    props.margined &&
    css`
      margin-left: 5px;
    `};
`;

const ButtonsWrapper = styled.div`
  margin: 10px 0;
`;

export default class AuctionTable extends Component {
  renderTable = (
    selectedAuctions,
    selectedAuctionType,
    toggleFavoriteAuction,
    markAllAsFavorite,
    markAllAsUnfavorite
  ) => {
    if (!selectedAuctions.length) {
      return;
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
      if (key === "isFavorite") {
        return {
          Header: "isFavorite",
          accessor: "isFavorite",
          Cell: d => (
            <input
              type="checkbox"
              onChange={() => toggleFavoriteAuction(d.original)}
              checked={d.original.isFavorite}
            />
          )
        };
      }
      return { id: key, Header: key, accessor: key };
    });

    return (
      <div>
        <TitleLarge secondary>{selectedAuctionType.name}</TitleLarge>
        <ButtonsWrapper>
          <StyledButton onClick={markAllAsFavorite}>Select all</StyledButton>
          <StyledButton margined onClick={markAllAsUnfavorite}>
            Remove all
          </StyledButton>
        </ButtonsWrapper>
        <ReactTable columns={columns} data={selectedAuctions} filterable />
      </div>
    );
  };

  render() {
    return (
      <Container>
        <ContentWrapper>
          <AuctionProvider>
            <AuctionSubscribe>
              {({
                state: { selectedAuctions, selectedAuctionType },
                toggleFavoriteAuction,
                markAllAsFavorite,
                markAllAsUnfavorite
              }) => {
                return this.renderTable(
                  selectedAuctions,
                  selectedAuctionType,
                  toggleFavoriteAuction,
                  markAllAsFavorite,
                  markAllAsUnfavorite
                );
              }}
            </AuctionSubscribe>
          </AuctionProvider>
        </ContentWrapper>
      </Container>
    );
  }
}
