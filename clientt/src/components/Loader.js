import { useState } from "react";
import ClipLoader from "react-spinners/RingLoader";

function Loader() {
  const [loading, setLoading] = useState(true);
  // const [color, setColor] = useState("#ffffff");

  // const override = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: color // Use the color state here
  // };

  return (
    <div style={{marginTop:'160px'}}>
      <div className="sweet-loading">
        <ClipLoader
          color='#000' // Use the color state here
          loading={loading}
          css='' // Use css prop instead of cssOverride
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
