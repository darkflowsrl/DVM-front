import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Layout } from './ui/layout/Layout'
import Home from './app/home/Home'

export function App () {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </Layout>
  )
}
