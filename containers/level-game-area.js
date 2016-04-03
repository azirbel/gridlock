import { connect } from 'react-redux'
import GameArea from '../components/game-area'

const mapStateToProps = (state) => {
  return state.levels[state.level]
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameArea)
