import React from "react";
import { Helmet } from "react-helmet-async";

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "E-Mall",
  description: "Black Friday all day evvery day",
  keywords: "electronics, flash-sale, discount",
};

export default Meta;
