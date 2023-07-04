import React from "react";
import App from "../App";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const CustomPage = () => {
  const { category } = useParams();

  return <App category={category} />;
};

export default CustomPage;
