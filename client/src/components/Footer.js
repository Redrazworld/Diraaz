import React from "react";
import "./CSS/Footer.css";
import { Facebook, LinkedIn, Twitter } from "./Svgs";

function Footer() {
  return (
    <div>
      <div className="footer1">
        <div className="d-flex justify-content-center gap-2 flex-column">
          <div className="d-flex justify-content-center">
            <div className="bg-white p-1 rounded-2">
              <img height={20} src="/logo192.png" />
              <img height={20} src="/logo192.png" />
              <img height={20} src="/logo192.png" />
              <img height={20} src="/logo192.png" />
            </div>
          </div>
          <div className="bg-white p-1">
            <small>
              CIN-U74140UP2022PTC165265 | GSTIN-09AALCR9197B1ZU | IEC-AALCR91978
              | UDYAM-UP-48-0016101
            </small>
          </div>
        </div>
      </div>
      <div className="footer">
        <LinkedIn height="20" width="20" stroke="#530050" fill="#530050" />
        <Facebook height="20" width="20" stroke="#530050" fill="#530050" />
        <Twitter height="20" width="20" stroke="#530050" fill="#530050" />
      </div>
    </div>
  );
}

export default Footer;
