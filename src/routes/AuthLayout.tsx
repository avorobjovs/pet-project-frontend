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
      <div>Vite is running in {import.meta.env.MODE}</div>
      <div>Vite BASE_URL: {import.meta.env.BASE_URL}</div>
      <div className="container my-5">
        {children}
      </div>
    </>
  )
}

export default AuthLayout