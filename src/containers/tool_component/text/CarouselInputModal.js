import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeTextModal } from '../../../actions/toggleTextModal';
import CarouselInputModal from '../../../components/tool_component/text/CarouselInputModal';

const mapStateToProps = state => (
  { textModal: state.textModal }
);
const mapDispatchToProps = dispatch => (
  bindActionCreators({ closeTextModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CarouselInputModal);
