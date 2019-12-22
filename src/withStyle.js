import React from "react";
function withStyle(Comp, styles) {
  return props => {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss());
    }
    return <Comp {...props} />;
  };
}

export default withStyle;
