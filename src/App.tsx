import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Layout } from './ui/layout/Layout'
import Home from './app/home/Home'
import { Testing } from './app/testing/Testing'

export function App () {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Testing />} />
        </Routes>
      </Layout>
    </Router>
  )
}
