import * as React from "react"
import { Link } from "gatsby"

import LayoutContainer from "../components/layout-container"
import Seo from "../components/seo"

const SecondPage = () => (
  <LayoutContainer>
    <Seo title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </LayoutContainer>
)

export default SecondPage
