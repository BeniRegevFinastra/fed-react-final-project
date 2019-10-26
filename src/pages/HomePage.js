import React from "react";
import { Jumbotron, Button, Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import RecipesNavbar from "../components/RecipesNavbar";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { activeUser, handleLogout } = this.props;

    const imgWidth = 200;
    const imgHeight = 300;

    return (
      <div>
        <RecipesNavbar activeUser={activeUser} handleLogout={handleLogout} />
        <Jumbotron>
          <Container>
            <h1 className="display-3">Chef BEN's Recipes Application</h1>
            <h3 className="display-7">
              You Are Invited To Master your recipes &amp; Dinner:{" "}
            </h3>
            <h6>
              Browse Recipes, Select Recipes For Dinner, Create a Shopping List
              &amp; Find The Best Prices Using The Price-Compare API
            </h6>
            <p>
              You are now browsing as a Guest, You can{" "}
              <Button variant="primary" href="#/login">
                Login
              </Button>
            </p>
          </Container>
        </Jumbotron>
        <Container>
          <Carousel>
            <Carousel.Item>
              <img
                width="auto"
                height={imgHeight}
                className="d-block"
                src="images/Black-Forest-and-Cheese-Cake.jpg"
                alt="black forest and cheese cakes"
              />
              <Carousel.Caption>
                <h3>First: Happy Birthday</h3>
                <p>Black Forest &amp; Cheese Cakes</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                width="auto"
                height={imgHeight}
                className="d-block"
                src="images/Ears for Purim.jpg"
                alt="ears for purim"
              />
              <Carousel.Caption>
                <h3>Second: For Purim</h3>
                <p>Box full of ears for Purim.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                width="auto"
                height={imgHeight}
                className="d-block"
                src="images/hanukia-cake-for-hanuka.jpg"
                alt="hanukia cake for hanuka"
              />
              <Carousel.Caption>
                <h3>Third: For Hanuka</h3>
                <p>Hanukia Cake -- light the candles and then eat the cake.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                width="auto"
                height={imgHeight}
                className="d-block"
                src="images/nice-cake-1.png"
                alt="nice-cake-1"
              />
              <Carousel.Caption>
                <h3>Fourth: Nice Cake 1</h3>
                <p>Nice Cake for Birthday (1).</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                width="auto"
                height={imgHeight}
                className="d-block"
                src="images/nice-cake-2.jpg"
                alt="nice-cake-2"
              />
              <Carousel.Caption>
                <h3>Fifth: Nice Cake 2</h3>
                <p>Nice Cake for Birthday (2).</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                width="auto"
                height={imgHeight}
                className="d-block"
                src="images/nice-cake-3.jpg"
                alt="nice-cake-3"
              />
              <Carousel.Caption>
                <h3>Sixth: Nice Cake 3</h3>
                <p>Nice Cake for Birthday (3).</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                width="auto"
                height={imgHeight}
                className="d-block "
                src="images/having-fun.jpg"
                alt="having-fun"
              />
              <Carousel.Caption>
                <h3>Seventh: Having Fun</h3>
                <p>Having Fun A.K.A. The Cama Sutra Cake.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                width="auto"
                height={imgHeight}
                className="d-block "
                src="images/chocolate-cup-cake.JPG"
                alt="having-fun"
              />
              <Carousel.Caption>
                <h3>Eighth: Cupcake</h3>
                <p>Chocolate Cupcake For Someone Very Special.</p>
              </Carousel.Caption>
            </Carousel.Item>

          </Carousel>
        </Container>
      </div>
    );
  }
}

export default HomePage;
