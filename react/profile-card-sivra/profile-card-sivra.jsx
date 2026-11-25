import './profile-card-sivra.css';

export default function ProfileCardSivra() {
  return (
    <div className="stage">
      <div className="card">
        <div className="banner"><h1>SIVRA<br />BUSINESS<br />SOLUTION</h1></div>
        <div className="logo">S</div>
        <div className="bio">
          <div>
            <div className="name">sivra
              <svg width="18" height="18" viewBox="0 0 18 18" aria-label="Verified"><circle cx="9" cy="9" r="9" fill="#0059F2" /><path d="M5.2 9.3l2.5 2.5 5-5.3" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="handle">@sivra</div>
            <div className="line">Business solutions, built to scale.</div>
          </div>
          <button className="btn" type="button">Follow</button>
        </div>
      </div>
    </div>
  );
}
