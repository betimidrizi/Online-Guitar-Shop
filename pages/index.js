// pages/index.js
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'

const GET_BRANDS = gql`
  query GetBrands {
    brands {
      id
      name
    }
  }
`

export default function Brands() {
  const { loading, error, data } = useQuery(GET_BRANDS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Guitar Brands</h1>
      <ul>
        {data.brands.map(brand => (
          <li key={brand.id}>
            <Link href={`/${brand.id}`}>
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
