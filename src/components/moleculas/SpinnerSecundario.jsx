import styled from "styled-components";
export function SpinnerSecundario({texto}) {
  return (<Container>
<span>{texto}</span>
  </Container>);
}
const Container =styled.div`
  height:100vh;
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;


`