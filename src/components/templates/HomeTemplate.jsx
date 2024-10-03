import styled from "styled-components";
import { Welcome } from "../../index";
export function HomeTemplate() {
  return (
    <Container>
      <Welcome />
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
`;
