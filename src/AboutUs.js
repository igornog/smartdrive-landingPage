/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createMedia } from "@artsy/fresnel";
import { Link } from "react-router-dom";
import "./Partners.css";
import heroImg from "./images/turbo-hero.svg";
import scoreImg from "./images/score.svg";
import scoreColorImg from "./images/scorecolor.svg";
import agreementsImg from "./images/agreements.svg";
import offersImg from "./images/offers.svg";
import securityImg from "./images/security.svg";
import carImg from "./images/car.png";
import cadastroImg from "./images/cadastro.svg";
import descontoImg from "./images/desconto.png";
import scoreSmImg from "./images/score-sm.svg";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Row,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container
    text
    style={{
      maxWidth: mobile ? "" : "1000px!important",
    }}
  >
    <Container
      style={{
        display: mobile ? "unset" : "flex",
        alignItems: "flex-end",
        marginTop: "15%",
      }}
    >
      <Container
        style={{
          textAlign: "Center",
          padding: mobile ? "0" : "0 20%",
          margin: '0'
        }}
      >
        <h1 style={{
          margin: mobile ? "1rem 0 3rem" : "3rem",
        }}>Sobre a SmartDrive</h1>
        <article>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>
      </Container>
    </Container>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="left"
            style={{ minHeight: "100vh", padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container style={{ zIndex: "999" }}>
                <Link to="/">
                  {" "}
                  <Menu.Item as="a">Home</Menu.Item>
                </Link>
                <Link to="/parceiros">
                  {" "}
                  <Menu.Item as="a">Parceiros</Menu.Item>
                </Link>

                <Link to="/sobre-nos">
                  {" "}
                  <Menu.Item as="a" active>
                    Sobre nós
                  </Menu.Item>
                </Link>

                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Entrar
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    Cadastre-se
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a">Entrar</Menu.Item>
            <Menu.Item as="a">Cadastre-se</Menu.Item>
            <Menu.Item as="a">Parceiros</Menu.Item>
            <Menu.Item as="a">Sobre-nós</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: '100vh', padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = (mobile) => <ResponsiveContainer></ResponsiveContainer>;

export default HomepageLayout;
