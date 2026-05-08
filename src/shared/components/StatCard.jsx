export function StatCard({ label, value, trend, icon: Icon }) {
  return (
    <article className="card stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {trend ? <p className="stat-trend">{trend}</p> : null}
      </div>
      {Icon ? (
        <div className="stat-icon">
          <Icon size={22} />
        </div>
      ) : null}
    </article>
  );
}
