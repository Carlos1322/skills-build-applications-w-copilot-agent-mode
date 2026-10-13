import CollectionView from './CollectionView.jsx'
import { fetch } from '../api.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'teamId', label: 'Team' },
]

export default function Users() {
  return (
    <CollectionView
      columns={columns}
      description="Meet the people building healthier habits together."
      endpoint="/api/users/"
      fetcher={fetch}
      title="Users"
    />
  )
}
