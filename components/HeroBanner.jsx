import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
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
    <div className="hero-banner-container">
      <div>
        <div className="small-text">
          <p>{heroBanner.smallText}</p>
        </div>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          ref={imageRef}
          src={urlFor(heroBanner.image)}
          alt="Products"
          className="hero-banner-image parallaxImage"
        />

        <div>
          <Link href={`/productpage`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
