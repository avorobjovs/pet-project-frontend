import { Spinner } from 'react-bootstrap';

const AppSpinner = ({ show }: { show: boolean }) => {
  return (
    <div className={"app-spinner " + (show ? 'active' : '')}>
      <div className='app-spinner-content'>
        <div><Spinner animation="border" variant="secondary" role="status"></Spinner></div>
        <div className='text-secondary'>loading...</div>
      </div>
    </div>
  );
}

export default AppSpinner;