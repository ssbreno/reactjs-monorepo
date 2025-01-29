export const baseTsConfig = {
  compilerOptions: {
    target: "ES2020",
    useDefineForClassFields: true,
    lib: ["ES2020", "DOM", "DOM.Iterable"],
    module: "ESNext",
    skipLibCheck: true,
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
    jsx: "react-jsx",
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"]
    }
  }
};

export const baseLibConfig = {
  ...baseTsConfig,
  compilerOptions: {
    ...baseTsConfig.compilerOptions,
    declaration: true,
    emitDeclarationOnly: true,
    moduleResolution: "node",
  }
};
