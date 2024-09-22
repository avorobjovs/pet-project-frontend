import Alert from "react-bootstrap/Alert";

const ErrorsAlert = ({ messages }: { messages: string[] }) => {
  return (
    <>
      {messages && messages.length > 0 && messages[0] && (
        <Alert variant='danger'>
          {messages[0]}
          {messages.length > 1 && (
            <ul>
              {messages.map((message, index) => { 
                if (index > 0) {
                  return (
                    <li key={index}>{message}</li>
                  )
                }
              })}
            </ul>
          )}
        </Alert>
      )}
    </>
  );
}

export default ErrorsAlert;