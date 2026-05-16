import React, { useEffect } from "react";
import MainContainer from "../../../../components/Container/MainContainer";
import { useOutletContext } from "react-router";

function GiftCard() {
  // hooks
  const { setCurrent } = useOutletContext();

  // change current option for sidenav
  useEffect(() => {
    setCurrent("gift");
  }, []);

  // dom
  return (
    <MainContainer>
      <div>GiftCard</div>
    </MainContainer>
  );
}

export default GiftCard;
