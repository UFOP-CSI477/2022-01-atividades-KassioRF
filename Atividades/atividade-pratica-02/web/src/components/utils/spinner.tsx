import Spinner from 'react-bootstrap/Spinner';

const _Spinner = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default _Spinner;