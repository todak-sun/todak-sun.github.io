import * as React from "react"

import LayoutContainer from "../components/layout-container"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <LayoutContainer>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </LayoutContainer>
)

export default NotFoundPage
