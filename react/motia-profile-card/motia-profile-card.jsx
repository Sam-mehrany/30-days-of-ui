import './motia-profile-card.css';

export default function MotiaProfileCard() {
  return (
    <div className="card">
      <div className="banner">
        <div className="wordmark">motia</div>
        <div className="row">
          <svg viewBox="0 0 24 24" aria-label="X"><path d="M18.2 2.5h3.3l-7.2 8.3 8.5 10.7h-6.7l-5.2-6.5-5.9 6.5H1.7l7.7-8.9L1.3 2.5h6.8l4.7 6 5.4-6zm-1.2 17h1.8L7.1 4.4H5.2z" /></svg>
          <svg viewBox="0 0 24 24" aria-label="LinkedIn"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.55-1 1.9-1.95 3.8-1.95 4 0 4.85 2.5 4.85 5.8V21h-4v-5.1c0-1.25 0-2.85-1.75-2.85s-2 1.35-2 2.75V21h-4z" /></svg>
          <svg viewBox="0 0 24 24" aria-label="Butterfly"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" /></svg>
          <button className="follow" type="button">Follow</button>
        </div>
      </div>
      <div className="tile">m</div>
      <div className="bio">
        <div className="name">Motia</div>
        <div className="handle">@motia</div>
        <div className="line">Design in motion.</div>
        <div className="link">motia.dev</div>
        <div className="stats">12.4K <span>Followers</span> &nbsp;·&nbsp; 248 <span>Following</span></div>
      </div>
    </div>
  );
}
