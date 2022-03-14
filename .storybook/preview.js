import 'assets/styles/global.css' // global app styles

try {
  initializeTimezones()
} catch (error) {
  console.log('Failed to initialize timezones', error)
}

try {
  // On the client side, we init analytics after we have current user data
  if (isPrerendering()) initAnalytics()
} catch (error) {
  console.error(error)
}

try {
  initGraphQL()
} catch (error) {
  console.error(error)
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
