import './pricing-toggle.css';

export default function PricingToggle() {
  return (
    <div className="card">
      <div className="toggle-wrap">
        <div className="toggle">
          <div className="thumb"></div>
          <span>Monthly</span>
          <span className="active">Annual</span>
        </div>
        <div className="save-badge">Save 20%</div>
      </div>
      <div className="eyebrow">PRO</div>
      <div className="price-row">
        <span className="price">$19</span>
        <span className="per">/mo</span>
        <span className="strike">$24</span>
      </div>
      <div className="bill-note">billed annually — $228 per year</div>
      <div className="divider"></div>
      <ul className="features">
        <li><span className="check">✓</span>Unlimited AI image generations</li>
        <li><span className="check">✓</span>Design-system tokens &amp; export</li>
        <li><span className="check">✓</span>Team workspaces — up to 5 seats</li>
        <li><span className="check">✓</span>Priority support, same-day replies</li>
      </ul>
      <button className="cta">Start 14-day free trial</button>
      <div className="reassure">No card required · Cancel anytime</div>
    </div>
  );
}
