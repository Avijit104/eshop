import React, { useEffect } from "react";
import MainContainer from "../../../../components/Container/MainContainer";
import { useOutletContext } from "react-router";

function Upi() {
  // hooks
  const { setCurrent } = useOutletContext();

  // change current option for sidenav
  useEffect(() => {
    setCurrent("upi");
  }, []);

  // dom
  return (
    <MainContainer>
      <div>Upi</div>
    </MainContainer>
  );
}

export default Upi;
