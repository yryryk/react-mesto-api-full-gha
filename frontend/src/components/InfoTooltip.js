import Popup from './Popup';

function InfoTooltip(props) {
  return (
    <Popup  name='info-tool-tip' {...props} >
      <div className={`popup__auth-image ${props.success.selector}`} />
      <p className="popup__auth-message">{props.success.message}</p>
    </Popup>
  );
}

export default InfoTooltip;
