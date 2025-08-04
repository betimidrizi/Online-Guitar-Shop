// pages/[brand]/[model].js
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'

const GET_MODEL_DETAILS = gql`
  query GetModelDetails($modelId: ID!) {
    model(id: $modelId) {
      id
      name
      specs {
        key
        value
      }
      musicians {
        id
        name
      }
    }
  }
`

export default function GuitarDetails() {
  const router = useRouter()
  const { model } = router.query
  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { modelId: model },
    skip: !model
  })

  const [tab, setTab] = useState('specs')
  const [visible, setVisible] = useState(2)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { name, specs, musicians } = data.model

  return (
    <div>
      <h1>{name}</h1>

      <div>
        <button onClick={() => setTab('specs')}>Specs</button>
        <button onClick={() => setTab('musicians')}>Musicians</button>
      </div>

      {tab === 'specs' && (
        <ul>
          {specs.map(spec => (
            <li key={spec.key}>{spec.key}: {spec.value}</li>
          ))}
        </ul>
      )}

      {tab === 'musicians' && (
        <div>
          <ul>
            {musicians.slice(0, visible).map(m => (
              <li key={m.id}>{m.name}</li>
            ))}
          </ul>
          {visible < musicians.length && (
            <button onClick={() => setVisible(visible + 2)}>Load more</button>
          )}
        </div>
      )}
    </div>
  )
}
