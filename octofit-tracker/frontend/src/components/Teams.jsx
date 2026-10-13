import CollectionView from './CollectionView.jsx'
import { fetch } from '../api.js'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About' },
  { key: 'memberIds', label: 'Members', render: (members) => Array.isArray(members) ? members.length : members },
]

export default function Teams() {
  return (
    <CollectionView
      columns={columns}
      description="Find your crew and keep each other moving."
      endpoint="/api/teams/"
      fetcher={fetch}
      title="Teams"
    />
  )
}
