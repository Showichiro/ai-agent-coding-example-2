import { render, Text } from "ink";
import React from "react";

let promise: Promise<void> | undefined;
let state: string | undefined;
let value: string | undefined;

const promiseFn = () => {
  if (!promise) {
    promise = new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    state = "pending";

    (async () => {
      await promise;
      state = "done";
      value = "Hello World";
    })();
  }

  if (state === "pending") {
    throw promise;
  }

  if (state === "done") {
    return value;
  }
};

function Example() {
  const message = promiseFn();
  return <Text>{message}</Text>;
}

function Fallback() {
  return <Text>Loading...</Text>;
}

render(
  <React.Suspense fallback={<Fallback />}>
    <Example />
  </React.Suspense>,
);
