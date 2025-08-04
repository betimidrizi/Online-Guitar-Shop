// pages/[brand].js
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'
import { useState } from 'react'

const GET_MODELS = gql`
  query GetModels($brandId: ID!) {
    brand(id: $brandId) {
      id
      name
      models {
        id
        name
        type
      }
    }
  }
`

export default function Models() {
  const router = useRouter()
  const { brand } = router.query

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const { loading, error, data } = useQuery(GET_MODELS, {
    variables: { brandId: brand },
    skip: !brand
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const filteredModels = data.brand.models.filter(model =>
    model.name.toLowerCase().includes(search.toLowerCase()) &&
    (typeFilter ? model.type === typeFilter : true)
  )

  return (
    <div>
      <h1>{data.brand.name} Models</h1>

      <input
        type="text"
        placeholder="Search models..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Electric">Electric</option>
        <option value="Acoustic">Acoustic</option>
      </select>

      <ul>
        {filteredModels.map(model => (
          <li key={model.id}>
            <Link href={`/${brand}/${model.id}`}>
              {model.name} - {model.type}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
