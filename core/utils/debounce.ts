export type DebounceOptions = {
  leading?: boolean;
};

export type DebouncedFunction<T extends (...args: any[]) => Promise<any>> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

const debounce = <T extends (...args: any[]) => Promise<any>>(
  action: T,
  delay: number = 200,
  options: DebounceOptions = {}
): DebouncedFunction<T> => {
  let actionTimeout: NodeJS.Timeout | undefined;
  let leadingInvoked: boolean = false;

  return (...args: Parameters<T>) =>
    new Promise<ReturnType<T>>(async (resolve, reject) => {
      const invokeAction = async () => {
        try {
          const result = await action(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (actionTimeout) {
        clearTimeout(actionTimeout);
      }

      if (options?.leading && !leadingInvoked) {
        leadingInvoked = true;
        await invokeAction();
        return;
      }

      actionTimeout = setTimeout(async () => {
        await invokeAction();
        leadingInvoked = false;
      }, delay);
    });
};

export default debounce;
