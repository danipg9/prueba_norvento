module.exports = {
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma archivos TypeScript
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Transforma axios en node_modules
    ],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy', // Para manejar archivos CSS
    },
    testEnvironment: 'jsdom', // Entorno para pruebas de React
  };