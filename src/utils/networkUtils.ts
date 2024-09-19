interface IFetchResult {
  succeeded: boolean;
  data: any;
  messages: string[];
}

export async function executeFetch(request: Request): Promise<IFetchResult> {
  const result: IFetchResult = {
    succeeded: false,
    data: null,
    messages: []
  };

  try {
    const response = await fetch(request);

    const contentType = response.headers.get("Content-Type");
    const hasResponseBody = contentType && contentType.includes("application/") && contentType.includes("json");

    if (!hasResponseBody) {
      result.messages.push(`Network error: ${response.status} (${response.statusText})`);
    }
    else {
      const responseBody = await response.json();
      if (response.ok && responseBody.succeeded) {
        result.succeeded = true;
        result.data = responseBody.data;
      }
      else {
        if (responseBody.message) {
          result.messages.push(responseBody.message);
        }

        if (responseBody.title) {
          result.messages.push(responseBody.title);
        }

        if (responseBody.errors) {
          if (Array.isArray(responseBody.errors)) {
            responseBody.errors.forEach((error: string) => {
              result.messages.push(error);
            });
          }

          else if (Object.prototype.toString.call(responseBody.errors) === '[object Object]') {
            Object.keys(responseBody.errors).forEach(key => {
              const errorStrings: string[] = responseBody.errors[key];
              errorStrings.forEach(errorString => {
                result.messages.push(`${key}: ${errorString}`);
              });
            });
          }
        }
      }
    }
  } catch (error) {
    result.messages.push(`Unexpected error: ${error}`);
  }

  return result;
}