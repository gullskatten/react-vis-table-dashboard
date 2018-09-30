import { Container } from "unstated";

export const AUCTION_TITLE_DEFAULT = "All Auction Items";

export const AUCTION_TYPE_LEGENDARY_KEY = "legendary";
export const AUCTION_TYPE_LEGENDARY_TITLE = "Legendary Items";

export const AUCTION_TYPE_EPIC_KEY = "epic";
export const AUCTION_TYPE_EPIC_TITLE = "Epic Items";

export const AUCTION_TYPE_RARE_KEY = "rare";
export const AUCTION_TYPE_RARE_TITLE = "Rare Items";

export const AUCTION_TYPE_COMMON_KEY = "common";
export const AUCTION_TYPE_COMMON_TITLE = "Common Items";

export const AUCTION_TYPE_SCRAP_KEY = "scrap";
export const AUCTION_TYPE_SCRAP_TITLE = "Scrappable Items";

export const AUCTION_TYPE_CONSUMABLES_KEY = "consumables";
export const AUCTION_TYPE_CONSUMABLES_TITLE = "Consumable Items";

export const AUCTION_TYPE_MOUNT_KEY = "mounts";
export const AUCTION_TYPE_MOUNT_TITLE = "Mounts";

export const keys = [
  AUCTION_TYPE_LEGENDARY_KEY,
  AUCTION_TYPE_EPIC_KEY,
  AUCTION_TYPE_RARE_KEY,
  AUCTION_TYPE_COMMON_KEY,
  AUCTION_TYPE_SCRAP_KEY,
  AUCTION_TYPE_CONSUMABLES_KEY,
  AUCTION_TYPE_MOUNT_KEY
];

export default class AuctionContainer extends Container {
  state = {
    auctions: {},
    favoriteAuctions: [],
    soldAuctions: [],
    selectedAuctionType: { type: "INITIAL", name: AUCTION_TITLE_DEFAULT }
  };

  importAuctions = auctions => {
    let allAuctions = [];

    keys.forEach(key => {
      if (auctions[key] && auctions[key].length) {
        auctions[key].forEach(
          auctionItem =>
            (auctionItem.auctionId = Math.floor(Math.random() * 13370))
        );
        auctions[key].forEach(auctionItem => (auctionItem.isFavorite = false));

        allAuctions.push(...auctions[key]);
      }
    });

    this.setState({
      auctions,
      selectedAuctions: allAuctions
    });
  };

  onAuctionTypeSelected = (selectedAuctions, auctionType, selectedFrom) => {
    this.setState({
      selectedAuctions,
      selectedAuctionType: { type: selectedFrom, name: auctionType }
    });
  };

  onAuctionsDeselected = () => {
    const { auctions } = this.state;

    let allAuctions = [];

    keys.forEach(key => {
      if (auctions[key] && auctions[key].length) {
        allAuctions.push(...auctions[key]);
      }
    });

    this.setState({
      selectedAuctions: allAuctions,
      selectedAuctionType: { type: "INITIAL", name: AUCTION_TITLE_DEFAULT }
    });
  };

  toggleFavoriteAuction = auction => {
    const { favoriteAuctions } = this.state;

    if (favoriteAuctions.some(auc => auc.auctionId === auction.auctionId)) {
      this.setState({
        favoriteAuctions: favoriteAuctions.filter(
          auc => auc.auctionId !== auction.auctionId
        )
      });
    } else {
      this.setState({
        favoriteAuctions: [...favoriteAuctions, auction]
      });
    }
  };

  isFavoriteAuction = auction => {
    return this.state.favoriteAuctions.some(favoriteAuction => favoriteAuction.auctionId === auction.auctionId);
  };

  markAllAsFavorite = () => {
    const { favoriteAuctions, selectedAuctions } = this.state; 
    
    const previouslyFavoritedAuctions = favoriteAuctions
    .filter(favoriteAuction => selectedAuctions.some(
      selectedAuction => selectedAuction.auctionId === favoriteAuction.auctionId)
      );

    if(previouslyFavoritedAuctions && previouslyFavoritedAuctions.length) {

      const selectedAuctionsThatHaveNotBeenFavorited = selectedAuctions
      .filter(selectedAuction => 
        !previouslyFavoritedAuctions.includes(selectedAuction));
      this.setState({
        favoriteAuctions: [...favoriteAuctions, ...selectedAuctionsThatHaveNotBeenFavorited]
      });    
    }  else {
      this.setState({
        favoriteAuctions: [...favoriteAuctions, ...selectedAuctions]
      });  
    }
  };

  markAllAsUnfavorite = () => {
    const { favoriteAuctions, selectedAuctions } = this.state; 
    
    console.log("Unfavoriting all selected auctions.")
    const previouslyFavoritedAuctions = favoriteAuctions
    .filter(favoriteAuction => selectedAuctions.some(
      selectedAuction => selectedAuction.auctionId === favoriteAuction.auctionId)
      );

    if(previouslyFavoritedAuctions && previouslyFavoritedAuctions.length) {
      console.log({msg: "We've found some previosuly favorited auctions.", previouslyFavoritedAuctions})
      console.log({msg: "We'll filter those from the current favorite auctions..", oldFavoriteAuctions: favoriteAuctions, 
      filteredFavoriteAuctions: favoriteAuctions.filter(favoriteAuction => !previouslyFavoritedAuctions.includes(favoriteAuction))})
      this.setState({
        favoriteAuctions: favoriteAuctions.filter(favoriteAuction => !previouslyFavoritedAuctions.includes(favoriteAuction))
      });    
    } 
  };

  resetFavorites = () => {
    this.setState({
      favoriteAuctions: []
    });
  }
}
