import Link from 'next/link';
import React from 'react';
import { AiFillInstagram, AiFillFacebook} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2024 DKD Marketing All rights reserved.</p>
      <p className="icons">
        <Link href="https://www.facebook.com/dkdmarketingzc"><a target="_blank"><AiFillFacebook /></a></Link>
      </p>
    </div>
  )
}

export default Footer