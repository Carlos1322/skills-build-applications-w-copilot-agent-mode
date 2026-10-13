import CollectionView from './CollectionView.jsx'
import { fetch } from '../api.js'

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'userId', label: 'User' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'calories', label: 'Calories' },
  { key: 'completedAt', label: 'Completed', render: (value) => value ? new Date(value).toLocaleDateString() : value },
]

export default function Activities() {
  return (
    <CollectionView
      columns={columns}
      description="A record of workouts and movement across your community."
      endpoint="/api/activities/"
      fetcher={fetch}
      title="Activities"
    />
  )
}
