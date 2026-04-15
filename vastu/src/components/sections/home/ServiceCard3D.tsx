'use client';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import Link from 'next/link';

interface ServiceCard3DProps {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  href: string;
  colorGradient: string;
}

export function ServiceCard3D({
  title,
  description,
  icon,
  benefits,
  href,
  colorGradient,
}: ServiceCard3DProps) {
  const { play, playSpatial } = useSound();

  return (
    <div
      className="parent group"
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        playSpatial(
          'hoverCard',
          (rect.left + rect.width / 2) / window.innerWidth,
          (rect.top + rect.height / 2) / window.innerHeight
        );
      }}
      onClick={() => play('cardExpand')}
    >
      <div className="card" style={{ background: colorGradient }}>
        <div className="glass"></div>
        <div className="content">
          <span className="service-icon">{icon}</span>
          <span className="title">{title}</span>
          <span className="text">{description}</span>
        </div>
        <div className="benefits-container">
          {benefits.map((b, i) => (
            <span key={i} className="benefit-tag">
              <span className="benefit-dot"></span>
              {b}
            </span>
          ))}
        </div>
        <div className="bottom">
          <Link href={href || "#" || '#'} className="learn-button">
            Learn more
            <svg className="arrow-svg" viewBox="0 0 24 24">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </Link>
        </div>
        {/* Floating rings (like AI tool cards) */}
        <div className="rings">
          <span className="ring ring1"></span>
          <span className="ring ring2"></span>
          <span className="ring ring3"></span>
        </div>
      </div>

      <style jsx>{`
        .parent {
          width: 100%;
          max-width: 340px;
          height: 460px;
          perspective: 1400px;
          margin: 0 auto;
        }
        .card {
          height: 100%;
          border-radius: 50px;
          background: ${colorGradient};
          transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
          box-shadow: 
            0 30px 40px -15px rgba(26, 42, 58, 0.25),
            0 0 0 1px rgba(232, 185, 96, 0.4) inset,
            0 0 30px rgba(232, 185, 96, 0.1);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .group:hover .card {
          transform: rotate3d(0.4, 0.8, 0.2, 18deg) translateY(-10px);
          box-shadow: 
            0 50px 60px -20px rgba(200, 138, 93, 0.5),
            0 0 0 2px rgba(232, 185, 96, 0.6) inset,
            0 0 50px rgba(232, 185, 96, 0.3);
        }
        .glass {
          position: absolute;
          inset: 10px;
          border-radius: 45px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.4) 100%
          );
          backdrop-filter: blur(8px);
          transform: translate3d(0, 0, 25px);
          border-left: 2px solid rgba(255, 255, 255, 0.8);
          border-bottom: 2px solid rgba(255, 255, 255, 0.6);
          box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.3);
        }
        .content {
          padding: 100px 20px 0 20px;
          transform: translate3d(0, 0, 30px);
          text-align: center;
        }
        .service-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,0.1));
        }
        .title {
          display: block;
          color: #1a2a3a;
          font-weight: 800;
          font-size: 24px;
          font-family: var(--font-cormorant), serif;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 6px rgba(255,255,255,0.6);
        }
        .text {
          display: block;
          color: rgba(26, 42, 58, 0.8);
          font-size: 14px;
          line-height: 1.5;
          font-weight: 500;
          margin-bottom: 15px;
        }
        .benefits-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          padding: 0 15px;
          transform: translate3d(0, 0, 30px);
        }
        .benefit-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(5px);
          padding: 5px 12px;
          border-radius: 40px;
          font-size: 12px;
          font-weight: 600;
          color: #1a2a3a;
          border: 1px solid rgba(232, 185, 96, 0.5);
          box-shadow: inset 0 1px 3px white;
        }
        .benefit-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c88a5d;
        }
        .bottom {
          margin-top: auto;
          padding: 20px;
          transform: translate3d(0, 0, 30px);
          text-align: center;
        }
        .learn-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
          padding: 10px 24px;
          border-radius: 40px;
          font-weight: 700;
          color: #1a2a3a;
          text-decoration: none;
          border: 1px solid rgba(232, 185, 96, 0.7);
          box-shadow: 0 6px 12px rgba(0,0,0,0.05), inset 0 1px 3px white;
          transition: all 0.3s;
        }
        .learn-button:hover {
          background: white;
          box-shadow: 0 10px 20px rgba(200, 138, 93, 0.2);
          transform: scale(1.02);
        }
        .arrow-svg {
          fill: none;
          stroke: currentColor;
          stroke-width: 3px;
          width: 14px;
          height: 14px;
        }
        .rings {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(232, 185, 96, 0.4);
          opacity: 0.3;
          transform-style: preserve-3d;
          transition: all 0.7s;
        }
        .ring1 {
          width: 130px;
          height: 130px;
          top: -20px;
          right: -20px;
          transform: translate3d(0, 0, 15px);
        }
        .ring2 {
          width: 90px;
          height: 90px;
          bottom: 40px;
          left: -15px;
          transform: translate3d(0, 0, 35px);
        }
        .ring3 {
          width: 170px;
          height: 170px;
          bottom: -30px;
          right: -30px;
          transform: translate3d(0, 0, 55px);
        }
        .group:hover .ring1 {
          transform: translate3d(0, 0, 35px);
          opacity: 0.6;
        }
        .group:hover .ring2 {
          transform: translate3d(0, 0, 55px);
          opacity: 0.6;
        }
        .group:hover .ring3 {
          transform: translate3d(0, 0, 75px);
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
export default ServiceCard3D;
