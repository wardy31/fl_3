import { useState } from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { QrReader } from "react-qr-reader";
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("No results");
  return (
    <>
      <Container>
        <QrReader
          constraints={{
            facingMode: "environment",
          }}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        <p>{data}</p>
      </Container>
    </>
  );
}

export default App;
