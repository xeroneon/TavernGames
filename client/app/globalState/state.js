import React from 'react';
import { UserProvider } from "./user";
import { ModalProvider } from "./modal";
import { SnackbarProvider } from "./snackbar";

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight(
      (kids, parent) =>
        React.cloneElement(parent, {
          children: kids,
        }),
      children
    );
  }
  
  function ContextProvider({ children }) {
    return (
      <ProviderComposer
        contexts={[<UserProvider />, <ModalProvider />, <SnackbarProvider /> ]}
      >
        {children}
      </ProviderComposer>
    );
  }
  
  export { ContextProvider };