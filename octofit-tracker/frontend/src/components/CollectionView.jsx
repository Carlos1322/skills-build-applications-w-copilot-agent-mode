import useCollection from '../hooks/useCollection.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : '—'
  }

  if (typeof value === 'object') {
    return value.name ?? value.username ?? value._id ?? JSON.stringify(value)
  }

  return String(value)
}

export default function CollectionView({ columns, description, endpoint, fetcher, title }) {
  const { items, error, loading } = useCollection(endpoint, fetcher)

  return (
    <section aria-labelledby="collection-title" className="collection-page">
      <p className="eyebrow">OctoFit Tracker</p>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <h1 className="page-title" id="collection-title">{title}</h1>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        <span className="badge rounded-pill text-bg-light border">
          {loading ? 'Loading…' : `${items.length} ${items.length === 1 ? 'record' : 'records'}`}
        </span>
      </div>

      {loading && (
        <div className="alert alert-info" role="status">
          Loading {title.toLowerCase()}…
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="empty-state">
          <h2 className="h5">Nothing here yet</h2>
          <p className="mb-0">New {title.toLowerCase()} will appear here when they are available.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive collection-table-wrap">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map(({ label }) => <th key={label} scope="col">{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map(({ key, render, label }) => (
                    <td key={label}>{displayValue(render ? render(item[key], item) : item[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
