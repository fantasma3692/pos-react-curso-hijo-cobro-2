import styled from "styled-components";
export function SwitchHamburguesa({ state, setstate }) {
  return (
    <Container onClick={setstate}>
      <label className={state ? "toggle active" : "toggle"} onClick={setstate}>
        <div className="bars" id="bar1" onClick={setstate}></div>
        <div className="bars" id="bar2" onClick={setstate}></div>
        <div className="bars" id="bar3" onClick={setstate}></div>
      </label>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  display: flex;
  articule {
    display: flex;
  }
z-index:100;
  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: 0.3s;
    transform: scale(0.55);
    &.active {
      .bars {
        margin-left: 13px;
      }
      #bar2 {
        transform: rotate(135deg);
        margin-left: 0;
        transform-origin: center;
        transition-duration: 0.3s;
      }
      #bar1 {
        transform: rotate(45deg);
        transition-duration: 0.3s;
        transform-origin: left center;
      }
      #bar3 {
        transform: rotate(-45deg);
        transition-duration: 0.3s;
        transform-origin: left center;
      }
    }
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.text};
    border-radius: 5px;
    transition-duration: 0.3s;
  }
`;
