import React from "react";
import styled from "styled-components";
import { AuctionProvider, AuctionSubscribe } from "./AuctionHandler";
import AuctionChart from "./AuctionChart";
import AuctionTable from "./AuctionTable";
import FavoriteAuctionTable from './FavoriteAuctionTable';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const AuctionChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;

`;

export default class AuctionHouse extends React.Component {
  state = {
   tabIndex: 0
  }

  render() {
    return (
      <AuctionProvider>
        <AuctionSubscribe>
          {auctionHouseState => {
            if (
              !auctionHouseState.state.auctions ||
              !auctionHouseState.state.auctions.totalItems
            ) {
              return null;
            }
            return (
              <AuctionChartWrapper>
                <AuctionChart
                  auctions={auctionHouseState.state.auctions}
                  onChartItemSelected={cell =>
                    auctionHouseState.onAuctionTypeSelected(
                      cell.auctions,
                      cell.title,
                      "CHART"
                    )
                  }
                  onChartItemDeselected={() =>
                    auctionHouseState.onAuctionsDeselected()
                  }
                />
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
        <TabList>
          <Tab>Available Auctions</Tab>
         <Tab disabled={!auctionHouseState.state.favoriteAuctions.length}>Favorite Auctions ({auctionHouseState.state.favoriteAuctions.length})</Tab> 
        </TabList>
        <TabPanel> <AuctionTable /></TabPanel>
        <TabPanel> <FavoriteAuctionTable /></TabPanel> 
      </Tabs>
               
              </AuctionChartWrapper>
            );
          }}
        </AuctionSubscribe>
      </AuctionProvider>
    );
  }
}
