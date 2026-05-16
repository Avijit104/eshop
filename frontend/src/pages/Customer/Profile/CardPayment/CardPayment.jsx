import React, { useEffect } from "react";
import MainContainer from "../../../../components/Container/MainContainer";
import { useOutletContext } from "react-router";

function CardPayment() {
  // hooks
  const { setCurrent } = useOutletContext();

  // change current option for side nav
  useEffect(() => {
    setCurrent("card");
  }, []);

  // dom
  return (
    <MainContainer>
      <div>CardPayment</div>
    </MainContainer>
  );
}

export default CardPayment;
