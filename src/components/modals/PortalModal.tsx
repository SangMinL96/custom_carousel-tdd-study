import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

type PropsType = {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
};
function PortalModal({ children, close, open = false }: PropsType): any {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const el =
    mounted && (document.getElementById("portal-modal") as HTMLDivElement);
  if (!mounted) return null;
  return (
    open &&
    createPortal(
      <Container data-testid="create_portal_testid">
        <div
          role="button"
          aria-hidden="true"
          className="background"
          onClick={close}
        />
        <ModalContent>
          <CloseButton type="button" onClick={close}>
            X
          </CloseButton>
          {children}
        </ModalContent>
      </Container>,
      el as HTMLDivElement
    )
  );
}

export default PortalModal;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ModalContent = styled.div`
  position: relative;
  min-width: 350px;
  z-index: 1001;
  background-color: white;
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
`;
const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 1001;
  font-size: 2rem;
`;
