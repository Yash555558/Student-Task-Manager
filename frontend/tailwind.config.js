export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",   // indigo
        secondary: "#22C55E", // green
        danger: "#EF4444",
        muted: "#6B7280",
        bg: "#F9FAFB"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        card: "0 6px 20px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem"
      }
    }
  },
  plugins: []
}