const ErrorsMessages = ({ messages }: { messages: string[] }) => {
  return (
    <>
      {messages && messages.length > 0 && (
        <p className="error">
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
        </p>
      )}
    </>
  );
}

export default ErrorsMessages;