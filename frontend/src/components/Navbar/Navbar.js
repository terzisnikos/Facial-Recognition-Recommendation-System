import React, { Component } from "react";
//import "./styles.css";
import { Link, Element } from "react-scroll";
//import StickyBox from "react-sticky-box";

const categories = [
  { id: 1, name: "Services" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "Training" },
];

export default class HorizontalScroll extends Component {
  constructor(props) {
    super(props);
    categories.forEach(category => {
      this[category.id] = React.createRef();
    });
  }

  scrollToCategory = id => {
    this[id].current.scrollIntoView({ inline: "center" });
  };

  render() {
    return (
      <>
        {" "}
        <div>
          <ul
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              listStyleType: "none",
              paddingLeft: "20px",
              backgroundColor: "#e2e2e2",
              flexWrap: "nowrap",
              height: "70px",
              justifyItems: "center"
            }}
          >
            {categories.map(category => (
              <li
                key={category.id}
                style={{
                  display: "inline-block",
                  margin: "20px"
                }}
                ref={this[category.id]}
              >
                <Link
                  activeClass="activeCategoryLink"
                  className={category.id}
                  to={category.id.toString()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onSetActive={() => this.scrollToCategory(category.id)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: "30px" }}>
          {categories.map(category => (
            <Element
              name={category.id.toString()}
              className={category.id}
              key={"display" + category.id}
            >
              <div style={{ height: "50vh" }}>
                <h2>{category.name}</h2>
              </div>
            </Element>
          ))}
        </div>
      </>
    );
  }
}
