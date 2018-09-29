import React from "react";
import { TitleHuge } from "../styleguides/StyledTitle";
import { ContentWrapper, Container } from "./Containers";
import StyledMessage from "../styleguides/StyledMessage";
import styled from "styled-components";
import { sampleAuctions } from "../samples/auctions";
import { AuctionProvider, AuctionSubscribe } from "./AuctionHandler";
import AuctionHouse from './AuctionHouse';

const DashboardInfoWrapper = styled.div``;

const StyledButton = styled.button`
  border-radius: 5px;
  border: 0;
  background: ${props => props.theme.secondary};
  cursor: pointer;
  padding: 1rem 1.5rem;
`;

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
                  <TitleHuge thin>Auction Dashboard</TitleHuge>
                  <DashboardInfoWrapper>
                    <StyledMessage secondary thin>
                      This page displays info about a virtual game auction
                      house.
                    </StyledMessage>
                  </DashboardInfoWrapper>
                  <StyledButtonWrapper>
                    {!auctions.totalItems && (
                      <StyledButton onClick={() => importAuctions(sampleAuctions)}>
                        <StyledMessage white>Load Auctions</StyledMessage>
                      </StyledButton>
                    )}
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
