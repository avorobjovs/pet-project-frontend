import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Pet Project</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="container my-5">
        {children}
      </div>
    </>
  )
}

export default AuthLayout