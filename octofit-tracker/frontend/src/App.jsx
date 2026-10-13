import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main className="container py-5">
              <h1 className="h2">OctoFit Tracker</h1>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
