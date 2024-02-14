import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://ebfecb75904615fae5105a23595605a4@o4506743005642752.ingest.sentry.io/4506743008657408",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});
