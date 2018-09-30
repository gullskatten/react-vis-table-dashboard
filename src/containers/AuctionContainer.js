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

    auction.isFavorite = !auction.isFavorite;

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

  findFavoriteAuctionsInSelectedAuctions = () => {
    const { selectedAuctions } = this.state;

    return selectedAuctions.filter(auction => !auction.isFavorite);
  };

  markAllAsFavorite = () => {
    const nextFavorite = this.state.favoriteAuctions.filter(favoriteAuction => {
      const { selectedAuctions } = this.state;
      return selectedAuctions.some(
        auction => favoriteAuction.auctionId === auction.auctionId
      );
    });

    this.setState({
      selectedAuctions: this.state.selectedAuctions.map(auction => {
        if (auction.isFavorite) return auction;

        return {
          ...auction,
          isFavorite: true
        };
      })}, () => {
          this.setState({
            favoriteAuctions: [...nextFavorite, ...this.state.selectedAuctions]
          })
      });
  };

  markAllAsUnfavorite = () => {
    this.setState({
      selectedAuctions: this.state.selectedAuctions.map(auction => {
        return {
          ...auction,
          isFavorite: false
        };
      })
    });
  };
}
