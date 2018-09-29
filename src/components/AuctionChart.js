import React, { Component } from "react";
import { Sunburst, Hint, LabelSeries } from "react-vis";
import theme from "../theme/default";
import {
  AUCTION_TITLE_DEFAULT,
  AUCTION_TYPE_EPIC_KEY,
  AUCTION_TYPE_EPIC_TITLE,
  AUCTION_TYPE_LEGENDARY_KEY,
  AUCTION_TYPE_LEGENDARY_TITLE,
  AUCTION_TYPE_RARE_KEY,
  AUCTION_TYPE_RARE_TITLE,
  AUCTION_TYPE_COMMON_KEY,
  AUCTION_TYPE_COMMON_TITLE,
  AUCTION_TYPE_SCRAP_KEY,
  AUCTION_TYPE_SCRAP_TITLE,
  AUCTION_TYPE_CONSUMABLES_KEY,
  AUCTION_TYPE_CONSUMABLES_TITLE,
  AUCTION_TYPE_MOUNT_KEY,
  AUCTION_TYPE_MOUNT_TITLE
} from "../containers/AuctionContainer";

const tipStyle = {
  display: "flex",
  color: "#fff",
  background: "#000",
  alignItems: "center",
  padding: "5px"
};
const boxStyle = { height: "10px", width: "10px" };

function buildValue(hoveredCell) {
  const { radius, angle, angle0 } = hoveredCell;
  const truedAngle = (angle + angle0) / 2;
  return {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle)
  };
}

const LABEL_STYLE = {
  fontSize: "18px",
  textAnchor: "middle"
};

function getKeyPath(node) {
  if (!node.parent) {
    return ["root"];
  }

  return [(node.data && node.data.name) || node.name].concat(
    getKeyPath(node.parent)
  );
}

function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath));
  }
  // add a fill to all the uncolored cells
  if (!data.color) {
    data.style = {
      fill: theme.primary
    };
  }
  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.name] ? 0.4 : 1
  };

  return data;
}

export default class AuctionChart extends Component {
  state = {
    sunburnData: {},
    hoveredCell: false,
    finalValue: AUCTION_TITLE_DEFAULT,
    clicked: false
  };

  componentDidMount() {
    this.setState({
      sunburnData: this.buildSunbursts(this.props.auctions)
    });
  }

  /**
   * AUCTION_TYPE_EPIC_KEY,
          AUCTION_TYPE_LEGENDARY_KEY,
          AUCTION_TYPE_RARE_KEY,
          AUCTION_TYPE_COMMON_KEY,
          AUCTION_TYPE_CONSUMABLES_KEY,
          AUCTION_TYPE_MOUNT_KEY
   */
  buildSunbursts = auctions => {
    return {
      title: AUCTION_TITLE_DEFAULT,
      name: AUCTION_TITLE_DEFAULT,
      color: theme.primary,
      auctions: [...auctions[AUCTION_TYPE_LEGENDARY_KEY], ...auctions[AUCTION_TYPE_EPIC_KEY], ...auctions[AUCTION_TYPE_RARE_KEY], 
      auctions[AUCTION_TYPE_COMMON_KEY], ...auctions[AUCTION_TYPE_SCRAP_KEY], ...auctions[AUCTION_TYPE_CONSUMABLES_KEY],
            ...auctions[AUCTION_TYPE_MOUNT_KEY]],
      size: auctions.totalItems,
      children: [
        this.createSunburst(
          auctions,
          AUCTION_TYPE_LEGENDARY_KEY,
          AUCTION_TYPE_LEGENDARY_TITLE,
          theme.primary
        ),
        this.createSunburst(
          auctions,
          AUCTION_TYPE_EPIC_KEY,
          AUCTION_TYPE_EPIC_TITLE,
          theme.secondary
        ),
        this.createSunburst(
          auctions,
          AUCTION_TYPE_RARE_KEY,
          AUCTION_TYPE_RARE_TITLE,
          theme.tertiary
        ),
        this.createSunburst(
          auctions,
          AUCTION_TYPE_COMMON_KEY,
          AUCTION_TYPE_COMMON_TITLE,
          theme.success
        ),
        this.createSunburst(
          auctions,
          AUCTION_TYPE_SCRAP_KEY,
          AUCTION_TYPE_SCRAP_TITLE,
          theme.warn
        ),
        this.createCustomSunburst(auctions)
      ]
    };
  };

  createSunburst = (auctions, key, title, color) => {
    return {
      title,
      name: title,
      color,
      size: auctions[key].length,
      auctions: auctions[key],
      children: []
    };
  };

  createCustomSunburst = auctions => {
    return {
      title: "Other Items",
      name: "Other Items",
      color: theme.success,
      auctions: [ ...auctions[AUCTION_TYPE_CONSUMABLES_KEY],
      ...auctions[AUCTION_TYPE_MOUNT_KEY]],
      size:
        auctions[AUCTION_TYPE_CONSUMABLES_KEY].length +
        auctions[AUCTION_TYPE_MOUNT_KEY].length,
      children: [
        this.createSunburst(
          auctions,
          AUCTION_TYPE_CONSUMABLES_KEY,
          AUCTION_TYPE_CONSUMABLES_TITLE,
          theme.primary
        ),
        this.createSunburst(
          auctions,
          AUCTION_TYPE_MOUNT_KEY,
          AUCTION_TYPE_MOUNT_TITLE,
          theme.secondary
        )
      ]
    };
  };

  render() {
    const { hoveredCell, sunburnData, clicked, finalValue } = this.state;
    const { onChartItemSelected, onChartItemDeselected } = this.props;

    return (
      <Sunburst
        data={sunburnData}
        onValueMouseOver={v => {
          this.setState({ hoveredCell: v.x && v.y ? v : false });

          if (clicked) {
            return;
          }
          const path = getKeyPath(v).reverse();
          const pathAsMap = path.reduce((res, row) => {
            res[row] = true;
            return res;
          }, {});
          this.setState({
            finalValue: path[path.length - 1],
            data: updateData(sunburnData, pathAsMap)
          });
        }}
        onValueMouseOut={v => {
          this.setState({ hoveredCell: false });
          if (!clicked) {
            this.setState({
              pathValue: false,
              finalValue: false,
              data: updateData(sunburnData, false)
            });
          }
        }}
        onValueClick={v => {
          if (!clicked) {
            onChartItemSelected(v);
          } else {
            onChartItemDeselected();
          }
          this.setState({ clicked: !clicked });
        }}
        style={{
          stroke: "#fff",
          strokeOpacity: 0.3,
          strokeWidth: "0.5"
        }}
        colorType="literal"
        height={650}
        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
        getSize={d => d.size}
        getColor={d => d.color}
        width={750}
        padAngle={() => 0.02}
        hideRootNode
        animated
      >
        {hoveredCell ? (
          <Hint value={buildValue(hoveredCell)}>
            <div style={tipStyle}>
              <div style={{ ...boxStyle, background: hoveredCell.color }} />
              {`${hoveredCell.name} (${hoveredCell.size})`}
            </div>
          </Hint>
        ) : null}
        {finalValue && (
          <LabelSeries
            data={[{ x: 0, y: 0, label: finalValue, style: LABEL_STYLE }]}
          />
        )}
      </Sunburst>
    );
  }
}
