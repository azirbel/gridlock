import { connect } from 'react-redux'
import GameArea from '../components/game-area'

const mapStateToProps = (state) => {
  return state.getIn(['levels', state.get('level').toString()]).toJS()
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameArea)
