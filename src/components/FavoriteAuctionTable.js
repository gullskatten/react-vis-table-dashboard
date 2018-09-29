import React, { Component } from 'react'
import { AuctionProvider, AuctionSubscribe } from './AuctionHandler';
import ReactTable from "react-table";
import styled from 'styled-components';
import StyledMessage from '../styleguides/StyledMessage';
const FullWidthWrapper = styled.div`
    width: 84vw;
`;

export default class FavoriteAuctionTable extends Component {

    renderTable = (selectedAuctions, selectedAuctionType) => {
        if(!selectedAuctions.length) {
            return <FullWidthWrapper>
                    <StyledMessage warn>Nothing added to favorites yet!</StyledMessage>
                </FullWidthWrapper>;
        }
        const auctionFields = Object.keys(selectedAuctions[0]);

        const columns = auctionFields.filter(key => key !== 'modifier').map(key => {

            if(key === "itemType") {
                return {id: key, Header: key, accessor: d => d.displayName}
            }
            if(key === "armorType") {
                return {id: key, Header: key, accessor: d => d.displayName}
            }
            if(key === "quality") {
                return {id: key, Header: key, accessor: d => d.displayName}
            }
            return {id: key, Header: key, accessor: key}
        });

        columns.push({
            Header: 'buy',
            accessor: "itemId",
            Cell: d => <input type="checkbox" readOnly checked="false"/>

        })
        return <ReactTable
                    columns={columns}
                    data={selectedAuctions}
                    filterable
                    ></ReactTable>
    }

  render() {
    return (
        <AuctionProvider>
            <AuctionSubscribe>
                {({state: { favoriteAuctions }}) => {
                    return this.renderTable(favoriteAuctions, 'Favorite Auctions')
                }}
            </AuctionSubscribe>
        </AuctionProvider>
    );
  }
}
