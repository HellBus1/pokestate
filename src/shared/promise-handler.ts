import axios from "axios";

interface ClientErrorData {
  code: number;
  detail: string;
}

const resolvePromise = async <T>(promise: Promise<{
  data: T;
}>): Promise<readonly [T, null] | readonly [null, ClientErrorData]> => {
  try {
    const { data } = await promise;
    return [data, null] as const;
  } catch (error) {
    if (axios.isCancel(error)) {
      return [
        null,
        {
          code: 500,
          detail: 'The request was canceled',
        },
      ] as const;
    } else if (axios.isAxiosError(error) && error.response) {
      const { status, data, statusText } = error.response;

      return [
        null,
        {
          code: status,
          detail: data?.detail ? data.detail : statusText,
        },
      ] as const;
    } else if (axios.isAxiosError(error) && error.request) {
      return [
        null,
        {
          code: 500,
          detail: 'The request was made but no response was received',
        },
      ] as const;
    }

    return [
      null,
      {
        code: 500,
        detail: 'Something happened while setting up the request',
      },
    ] as const;
  }
}

export { resolvePromise, ClientErrorData };
