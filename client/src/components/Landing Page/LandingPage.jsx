import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

import imagee from "../../media/img/ubisoft-plus_hero_desktop.jpg";

export default function LandingPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${imagee})`,
      }}
      className="all"
    >
      <button className="start">
        <Link className="link" title="start" to={`/home`}>
          Start
        </Link>
      </button>
    </div>
  );
}
