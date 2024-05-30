import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollPosition = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          {/* <p>{discount}</p> */}
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          {/* <p>{saleTime}</p> */}
        </div>
        <div className="right">
          {/* <p className="small-text">{smallText}</p> */}
          <div>
            <h3>{midText}</h3>
            <p>{desc}</p>
          </div>

          <div className="shop-btn">
            <Link href={`/product/${product}`}>
              <button type="button">{buttonText}</button>
            </Link>
          </div>
        </div>

        <img ref={imageRef} src={urlFor(image)} className="footer-banner-image parallaxImage" />
      </div>
    </div>
  );
};

export default FooterBanner;
