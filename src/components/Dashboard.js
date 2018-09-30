import React from "react";
import { TitleHuge } from "../styleguides/StyledTitle";
import { ContentWrapper, Container } from "./Containers";
import StyledMessage from "../styleguides/StyledMessage";
import styled from "styled-components";
import { sampleAuctions } from "../samples/auctions";
import { AuctionProvider, AuctionSubscribe } from "./AuctionHandler";
import AuctionHouse from './AuctionHouse';

const DashboardInfoWrapper = styled.div``;

const StyledButtonWrapper = styled.div`
  margin: 10px 0;
`;


export default class Dashboard extends React.Component {
  render() {
    return (
      <AuctionProvider>
        <AuctionSubscribe>
          {({ state: { auctions }, importAuctions }) => {
            return (
              <ContentWrapper>
                <Container>
                  <TitleHuge thin>{auctions ? auctions.auctionHouseName : 'Auction Dashboard'}</TitleHuge>
                  <DashboardInfoWrapper>
                    <StyledMessage secondary thin>
                      This page displays info about a virtual game auction
                      house{auctions ? ", " + auctions.auctionHouseName : ''}.
                    </StyledMessage>
                  </DashboardInfoWrapper>
                  <StyledButtonWrapper>
                    {!auctions.totalItems && importAuctions(sampleAuctions)}
                  </StyledButtonWrapper>
                  <AuctionHouse/>
                </Container>
              </ContentWrapper>
            );
          }}
        </AuctionSubscribe>
      </AuctionProvider>
    );
  }
}
