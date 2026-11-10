import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app">
      <h1>My Base44 Project</h1>
      <p className="lede">
        This is a starter app. Edit <code>src/App.jsx</code> and the preview updates
        instantly.
      </p>

      <section className="card">
        <span className="count" aria-live="polite">
          {count}
        </span>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Increase
        </button>
      </section>
    </main>
  )
}
