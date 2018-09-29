import React, { Component } from 'react'
import { AuctionProvider, AuctionSubscribe } from './AuctionHandler';
import ReactTable from "react-table";

export default class AuctionTable extends Component {

    renderTable = (selectedAuctions, selectedAuctionType) => {
        if(!selectedAuctions.length) {
            return;
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
            Header: 'favorite',
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
                {({state: { selectedAuctions, selectedAuctionType}}) => {
                    return this.renderTable(selectedAuctions, selectedAuctionType)
                }}
            </AuctionSubscribe>
        </AuctionProvider>
    );
  }
}
