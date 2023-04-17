import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Skills from './components/Skills'
import SkillDetails from './components/SkillDetails'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Skills} />
    <Route exact path="/courses/:id" component={SkillDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
