import { useMemo, useState } from "react";
import styled from "styled-components/macro";
import Checkbox from "./Common/Checkbox";
import Div from "./Common/Div";
import { ButtonPrimary } from "components/Common/Button";

const LS_KEY = "atomx-confirmed";

const ConfirmWrapper = styled.main<{ margin?: string; maxWidth?: string }>`
  position: absolute;

  max-width: ${({ maxWidth }) => maxWidth ?? "600px"};
  width: 100%;
  min-height: 100%;
  background: ${({ theme }) => theme.bg0};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.04),
    0 16px 24px rgba(0, 0, 0, 0.04), 0 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;

  margin: 0 auto;
  margin-top: ${({ margin }) => margin ?? "1rem"};
  margin-bottom: ${({ margin }) => margin ?? "0px"};
  z-index: 2;
  padding: 2rem;
`;

export const Confirm = () => {
  const [check, setCheck] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const showConfirm = useMemo(() => {
    return !window.localStorage.getItem(LS_KEY);
  }, [confirmed]);

  const handleConfirm = () => {
    if (check) {
      window.localStorage.setItem(LS_KEY, "true");
      setConfirmed(true);
    }
  };

  if (!showConfirm) {
    return <></>;
  }
  return (
    <ConfirmWrapper>
      <div style={{ fontSize: "24px", fontWeight: 800 }}>
        AtomX Security Rules
      </div>
      <ol style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <li>
          This platform is totally decentralized and can only be done with your
          signature.
        </li>
        <li>
          Do not share your transaction hashes or click on links shared by
          anyone.
        </li>
        <li>We do not write private messages to anyone.</li>
        <li>
          You must communicate with the merchant using their telegram acct
          before making a transaction. This makes sure that both parties are
          available online to conduct the transaction.
        </li>
        <li>Cancel the transaction if the time exceeds the limit.</li>
        <li>
          Trades executed in this platform will be totally at your own risk with
          no recourse. To ensure the safety of your assets, you must abide by
          the rules of this platform.
        </li>
      </ol>
      <Div padding="1rem 0">
        <Checkbox
          label="I have read and agree"
          value={check}
          onClick={() => {
            setCheck((v) => !v);
          }}
        />
      </Div>
      <Div>
        <ButtonPrimary
          disabled={!check}
          onClick={() => handleConfirm()}
          width="fit-content"
          padding=".4rem 1rem"
        >
          CONFIRM
        </ButtonPrimary>
      </Div>
    </ConfirmWrapper>
  );
};
