import { getPlatforms } from "@ionic/react";

const isMobile = getPlatforms().includes("mobile");

function sqlite() {}

function mock() {}

export default isMobile
  ? sqlite()
  : mock();