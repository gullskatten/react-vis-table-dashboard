import React from 'react';
import AuctionContainer from '../containers/AuctionContainer';
import { Provider, Subscribe } from 'unstated';

const Auction = new AuctionContainer();

export const AuctionProvider = props => {
    return <Provider inject={props.inject || [Auction]}>{props.children}</Provider>;
}
export const AuctionSubscribe = props => {
    return <Subscribe to={props.to || [Auction]}>{props.children}</Subscribe>;
}

export default Auction;