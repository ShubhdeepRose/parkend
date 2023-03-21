import React from "react";
import styled from "styled-components";
const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Upper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Upara = styled.div`
  font-size: 24px;
  font-family: Georgia, Times, Times New Roman, serif;
  font-style: italic;
  margin: 0 0 16px;
`;
const Uper = styled.div`
  font-weight: 800;
  font-size: 42px;
`;
const Lower = styled.div`
  display: flexbox;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px;
  font-family: Gotham, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-size-adjust: 100%;
  margin: 68.4667px 0;
  position: relative;
`;
const Midlr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;
const Row = styled.div`
  display: block;
  padding: 20px;
  margin: 0 -15px;
  font-family: Gotham, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-size-adjust: 100%;
  position: relative;
`;

const ImgC = styled.div`
  width: 585px;
  object-fit: contain;
  display: block;
  right: ${(props) => (props.val === "right" ? "585px" : " ")};
  left: ${(props) => (props.val === "left" ? "585px" : " ")};
  position: relative;
  padding: 0 15px;
  float: left;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50px;
  display: inline-block;
  vertical-align: baseline;
  object-fit: contain;
  margin: 0px;
`;

const Content = styled.div`
  width: 585px;
  display: block;
  right: ${(props) => props.val === "right" && "585px"};
  left: ${(props) => props.val === "left" && "585px"};
  position: relative;
  padding: 0 15px;
  float: left;
`;

const Heading = styled.h2`
  display: block;
  margin-top: 100px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  font-size: 42px;
  font-weight: 800px;
  line-height: 42px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  text-align: left;
`;
const Span = styled.span`
  color: #${(props) => props.colour1};
  display: ${(props) => props.display};
  padding-left: ${(props) => props.pad};
  font-family: Gotham, Helvetica, Arial, sans-serif;
  line-height: 42px;
  font-weight: 800px;
  font-size: 42px;
`;
const Para = styled.p`
  font-size: 14px;
  margin-top: 20px;
  display: block;
  font-weight: 500;
  padding-left: ${(props) => props.pad};
`;
const Mid = () => {
  return (
    <Container>
      <Upper>
        <Uper>PARKING JUST GOT A LOT SIMPLER</Uper>
        <Upara>Book the Best Spaces &amp; Save Up to 50%</Upara>
      </Upper>
      <Lower>
        <Midlr>
          <Row>
            <Content val="left">
              <Heading>
                <Span colour1="4f95c9" display="inline " pad="0px">
                  DISCOVER
                </Span>
                <Span colour1="ffffff" display="block " pad="42px">
                  AMAZING
                </Span>
                <Span colour1="ffffff" display="inline " pad="5px">
                  SPACES
                </Span>
              </Heading>
              <Para>Find parking anywhere, for now or for later</Para>
              <Para>Compare prices & pick the place that’s best for you</Para>
            </Content>
            <ImgC val="right">
              <Img
                src="https://i.ibb.co/8c0jsNv/email-location-tracking-1.jpg"
                alt="email-location-tracking-1"
                border="0"
              />
            </ImgC>
          </Row>
          <Row>
            <ImgC val="left">
              <Img
                src="https://i.ibb.co/VStJ1HP/how-it-works-drive-arrive-park-white-2x.png"
                alt="email-location-tracking-1"
                border="0"
              />
            </ImgC>
            <Content val="right">
              <Heading>
                <Span colour1="" display="inline " pad="42px">
                  DRIVE
                </Span>
                <Span colour1="4f95c9" display="block " pad="84px">
                  ARRIVE
                </Span>
                <Span colour1="ffffff" display="inline " pad="47px">
                  & PARK
                </Span>
              </Heading>
              <Para pad="47px">Enter easily with your ParkFast parking pass</Para>
              <Para pad="47px">Your space is waiting – pull in and go do your thing</Para>
            </Content>
          </Row>
        </Midlr>
      </Lower>
    </Container>
  );
};

export default Mid;