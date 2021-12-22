import { useStaticQuery, graphql } from 'gatsby'
import { useMemo } from 'react'

interface ImageNode {
  childImageSharp: IChildImageSharp
  relativePath: string
}

interface IChildImageSharp {
  fluid: IFluid
}

interface IFluid {
  aspectRatio: number
  base64: string
  src: string
  srcSet: string
}

export const imageQuery = (src: string) => {  
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)

  const match: ImageNode = useMemo(() => data.allFile.nodes.find(({ relativePath }: { relativePath: string }) => src === relativePath), [data, src])
  return match?.childImageSharp?.fluid
}
