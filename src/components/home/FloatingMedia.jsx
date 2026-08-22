import React from 'react';

export default function FloatingMedia() {
  return (
    <>
      <div className="tile t1">
        <video className="art city" src="/media/floating-vid/floatingvid1.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
      </div>
      <div className="tile t2">
        <img src="/media/floating-images/image1.webp" className="art robot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Robot" />
      </div>
      <div className="tile t3">
        <img src="/media/floating-images/image2.webp" className="art mountain" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Mountain" />
      </div>
      <div className="tile t4">
        <img src="/media/floating-images/image3.webp" className="art ruins" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Ruins" />
      </div>
      <div className="tile t5">
        <img src="/media/floating-images/image4.webp" className="art soldier2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Soldier" />
      </div>
      <div className="tile t6">
        <img src="/media/floating-images/image5.webp" className="art castle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Castle" />
      </div>
      <div className="tile t7">
        <img src="/media/floating-images/image6.webp" className="art portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Portrait" />
      </div>
      <div className="tile t8">
        <video className="art castle" src="/media/floating-vid/floatingvid1.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(20deg)' }}></video>
      </div>
      <div className="tile t9">
        <img src="/media/floating-images/image7.webp" className="art car" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Car" />
      </div>
      <div className="tile t10">
        <img src="/media/floating-images/image1.webp" className="art ruins" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(160deg)' }} alt="Ruins Alt" />
      </div>
    </>
  );
}
