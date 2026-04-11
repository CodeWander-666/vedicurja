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

export function ServiceCard3D({ title, description, icon, benefits, href, colorGradient }: ServiceCard3DProps) {
  const { play, playSpatial } = useSound();

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width/2) / window.innerWidth;
    const y = (rect.top + rect.height/2) / window.innerHeight;
    playSpatial('hoverCard', x, y);
  };

  return (
    <div 
      className="parent group"
      onMouseEnter={handleMouseEnter}
      onClick={() => play('cardExpand')}
    >
      <div className="card">
        {/* 装饰性圆形徽章 */}
        <div className="logo">
          <span className="circle circle1"></span>
          <span className="circle circle2"></span>
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <span className="circle circle5">
            <span className="text-2xl">{icon}</span>
          </span>
        </div>
        
        {/* 玻璃效果层 */}
        <div className="glass"></div>
        
        {/* 主要内容 */}
        <div className="content">
          <span className="title">{title}</span>
          <span className="text">{description}</span>
        </div>
        
        {/* 底部操作区 */}
        <div className="bottom">
          <div className="benefits-container">
            {benefits.map((benefit, idx) => (
              <span key={idx} className="benefit-tag">
                <span className="benefit-dot"></span>
                {benefit}
              </span>
            ))}
          </div>
          
          <div className="bottom-actions">
            <div className="social-buttons-container">
              <button className="social-button" onClick={(e) => { e.stopPropagation(); play('clickSecondary'); }}>
                <svg viewBox="0 0 24 24" fill="none" className="svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </button>
              <button className="social-button" onClick={(e) => { e.stopPropagation(); play('clickSecondary'); }}>
                <svg viewBox="0 0 24 24" fill="none" className="svg">
                  <path d="M18 2L21 5L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9L3 6L6 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 6H9C7.93913 6 6.92172 6.42143 6.17157 7.17157C5.42143 7.92172 5 8.93913 5 10V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="social-button" onClick={(e) => { e.stopPropagation(); play('clickSecondary'); }}>
                <svg viewBox="0 0 24 24" fill="none" className="svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            <Link href={href} className="view-more">
              <button className="view-more-button">Learn more</button>
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .parent {
          width: 100%;
          max-width: 340px;
          height: 420px;
          perspective: 1200px;
          margin: 0 auto;
        }
        .card {
          height: 100%;
          border-radius: 50px;
          background: ${colorGradient};
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
          box-shadow: rgba(26, 42, 58, 0.15) 20px 30px 30px -15px, 
                      rgba(26, 42, 58, 0.1) 0px 15px 20px -5px;
          position: relative;
        }
        .group:hover .card {
          transform: rotate3d(1, 1, 0, 25deg);
          box-shadow: rgba(200, 138, 93, 0.25) 30px 50px 40px -20px, 
                      rgba(26, 42, 58, 0.15) 0px 25px 30px -5px;
        }
        .glass {
          transform-style: preserve-3d;
          position: absolute;
          inset: 8px;
          border-radius: 55px;
          border-top-right-radius: 100%;
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.7) 100%);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          transform: translate3d(0px, 0px, 25px);
          border-left: 1px solid rgba(255, 255, 255, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          transition: all 0.5s ease-in-out;
        }
        .content {
          padding: 120px 30px 0px 30px;
          transform: translate3d(0, 0, 26px);
        }
        .content .title {
          display: block;
          color: #1A2A3A;
          font-weight: 800;
          font-size: 22px;
          font-family: var(--font-cormorant), serif;
          margin-bottom: 8px;
        }
        .content .text {
          display: block;
          color: rgba(26, 42, 58, 0.7);
          font-size: 14px;
          line-height: 1.5;
          font-family: var(--font-inter), sans-serif;
        }
        .bottom {
          padding: 15px 20px;
          transform-style: preserve-3d;
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          transform: translate3d(0, 0, 26px);
        }
        .benefits-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }
        .benefit-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          padding: 4px 10px;
          border-radius: 40px;
          font-size: 11px;
          font-weight: 500;
          color: #1A2A3A;
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        .benefit-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C88A5D;
        }
        .bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .view-more {
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .view-more:hover {
          transform: translate3d(0, 0, 10px);
        }
        .view-more-button {
          background: none;
          border: none;
          color: #C88A5D;
          font-weight: 700;
          font-size: 13px;
          font-family: var(--font-inter), sans-serif;
          cursor: pointer;
        }
        .view-more .svg {
          fill: none;
          stroke: #C88A5D;
          stroke-width: 3px;
          width: 14px;
          height: 14px;
        }
        .social-buttons-container {
          display: flex;
          gap: 8px;
          transform-style: preserve-3d;
        }
        .social-button {
          width: 32px;
          height: 32px;
          padding: 6px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: rgba(26, 42, 58, 0.2) 0px 5px 8px -3px;
          cursor: pointer;
          color: #C88A5D;
          transition: all 0.2s ease;
        }
        .social-button:hover {
          background: #1A2A3A;
          color: #E8B960;
        }
        .social-button .svg {
          width: 16px;
          height: 16px;
          fill: currentColor;
          stroke: currentColor;
        }
        .group:hover .social-buttons-container .social-button {
          transform: translate3d(0, 0, 45px);
          box-shadow: rgba(200, 138, 93, 0.3) -5px 15px 15px -5px;
        }
        .logo {
          position: absolute;
          right: 0;
          top: 0;
          transform-style: preserve-3d;
        }
        .circle {
          display: block;
          position: absolute;
          aspect-ratio: 1;
          border-radius: 50%;
          top: 0;
          right: 0;
          box-shadow: rgba(0, 0, 0, 0.1) -8px 8px 15px 0px;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          background: rgba(232, 185, 96, 0.3);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .circle1 {
          width: 160px;
          transform: translate3d(0, 0, 20px);
          top: 8px;
          right: 8px;
        }
        .circle2 {
          width: 130px;
          transform: translate3d(0, 0, 40px);
          top: 10px;
          right: 10px;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          background: rgba(200, 138, 93, 0.2);
        }
        .circle3 {
          width: 100px;
          transform: translate3d(0, 0, 60px);
          top: 15px;
          right: 15px;
          background: rgba(232, 185, 96, 0.25);
        }
        .circle4 {
          width: 70px;
          transform: translate3d(0, 0, 80px);
          top: 20px;
          right: 20px;
          background: rgba(200, 138, 93, 0.15);
        }
        .circle5 {
          width: 45px;
          height: 45px;
          transform: translate3d(0, 0, 100px);
          top: 25px;
          right: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #C88A5D, #E8B960);
          color: white;
          font-weight: bold;
        }
        .group:hover .circle2 { transform: translate3d(0, 0, 60px); }
        .group:hover .circle3 { transform: translate3d(0, 0, 80px); }
        .group:hover .circle4 { transform: translate3d(0, 0, 100px); }
        .group:hover .circle5 { transform: translate3d(0, 0, 120px); }
      `}</style>
    </div>
  );
}
