import styled from "styled-components";
const Container = styled.div`
  display: flex;
  color: #fff;
  color: #fff;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #fff;
`;
const Logo = styled.h1`
  color: #fff;
`;

const Desc = styled.p`
  margin: 20px 0px;
  color: #fff;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  color: #fff;
`;
const Title = styled.h3`
  margin-bottom: 30px;
  color: #fff;
`;
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  color: #fff;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  color: #fff;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    text-decoration: underline;
  }
  color: #fff;
`;
const Payment = styled.img`
  width: 300px;
  height: 70px;
  margin: 0 10px;
  border-radius: 20px;
  color: #fff;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Parkfast</Logo>
        <Desc>
          Park fast, hassle-free parking at your fingertips! Let’s get started
          with Smart Parking System
        </Desc>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Features</ListItem>
          <ListItem>Parking Slot Reservation</ListItem>
          <ListItem>RFID Tokens offering</ListItem>
          <ListItem>Dedicated Support</ListItem>
          <ListItem>RealTime Information</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Discounts & Cashbacks offering</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>Sector-8 Gurugram, Haryana 122001</ContactItem>
        <ContactItem>+91 8920850272</ContactItem>
        <ContactItem>staff@parkfast.tech</ContactItem>
        <Payment src="https://i.ibb.co/856VczB/Copy-of-linkedin-banner.png" />
      </Right>
    </Container>
  );
};

export default Footer;
